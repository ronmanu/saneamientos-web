/**
 * =============================================================================
 * PRODUCTOS UNIFICADOS - Wrapper de datos para catálogo
 * =============================================================================
 * 
 * Este módulo transforma los datos de `productos.json` al formato
 * requerido por las páginas del catálogo principal.
 * 
 * @module data/productosUnificados
 * @author Sanitarios Descatalogados
 * @version 2.0.0
 * 
 * ARQUITECTURA:
 * - FUENTE ÚNICA DE VERDAD: productos.json
 * - Este archivo es un WRAPPER de transformación, no almacena datos
 * - Para acceso a datos completos, usar: app/data/productos.ts
 * 
 * @example
 * ```typescript
 * import { productosUnificados } from '@/app/data/productosUnificados';
 * 
 * productosUnificados.forEach(p => console.log(p.name));
 * ```
 */

import productosData from './productos.json';

// =============================================================================
// TIPOS E INTERFACES
// =============================================================================

/**
 * Especificaciones técnicas de un producto
 * Los campos más críticos para compatibilidad son:
 * - distanciaEntreTornillos: determina qué tapas son compatibles
 * - grupoCompatibilidad: agrupación por distancia estándar (15.5cm, 16.0cm, etc)
 */
export interface ProductSpecs {
    ancho?: string;
    fondo?: string;
    distanciaEntreTornillos?: string;
    formaTaza?: string;
    grupoCompatibilidad?: string;
    colorDisponible?: string[];
    material?: string;
    tipoMecanismo?: string;
    [key: string]: string | string[] | boolean | null | undefined;
}

/**
 * Producto unificado para el catálogo
 * Formato simplificado para listados, búsqueda y filtrado
 */
export interface ProductoUnificado {
    /** ID único del producto (ej: "roca-gondola-0") */
    id: string;

    /** Nombre formateado para mostrar (ej: "Gondola (ROCA)") */
    name: string;

    /** Marca del producto */
    brand: string;

    /** Categoría del producto (inodoros, bidets, lavabos, etc) */
    category: string;

    /** Ruta a la imagen del producto */
    image: string;

    /** Descripción corta del producto */
    description: string;

    /** Indica si hay stock disponible */
    inStock: boolean;

    /** Nivel de rareza: 1 (común) a 5 (extremadamente raro) */
    rarity: 1 | 2 | 3 | 4 | 5;

    /** URL canónica del producto en el catálogo */
    url: string;

    /** Periodo de fabricación (ej: "1980-1999") */
    periodo?: string;

    /** Especificaciones técnicas */
    specs?: ProductSpecs;
}

// =============================================================================
// CONSTANTES
// =============================================================================

/** Año de referencia para calcular antigüedad */
const AÑO_ACTUAL = new Date().getFullYear();

// =============================================================================
// FUNCIONES AUXILIARES
// =============================================================================

/**
 * Normaliza una cadena para usar como slug en URLs o nombres de archivo
 * 
 * @param str - Cadena a normalizar
 * @returns Cadena en minúsculas, sin acentos ni caracteres especiales
 * 
 * @example
 * slugify("Verónica") // "veronica"
 * slugify("Jacob Delafon") // "jacob_delafon"
 */
function slugify(str: string): string {
    return str
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Eliminar acentos
        .replace(/\s+/g, '_')            // Espacios a guiones bajos
        .replace(/[()]/g, '');           // Eliminar paréntesis
}

/**
 * Calcula el nivel de rareza basado en el periodo de fabricación
 * 
 * @param periodo - Periodo de fabricación (ej: "1980-1999")
 * @returns Nivel de rareza 1-5 (5 = más raro)
 * 
 * Lógica:
 * - Fabricados antes de 1980: Extremadamente raros (5)
 * - 1980-1989: Muy raros (4)
 * - 1990-1999: Raros (3)
 * - 2000-2009: Comunes (2)
 * - 2010+: Muy comunes (1)
 */
function calcularRareza(periodo?: string): 1 | 2 | 3 | 4 | 5 {
    if (!periodo) return 3; // Por defecto, rareza media

    // Extraer año de fin del periodo (ej: "1980-1999" → 1999)
    const match = periodo.match(/(\d{4})(?:\s*-\s*(\d{4}))?/);
    if (!match) return 3;

    const añoFin = parseInt(match[2] || match[1]);
    const antigüedad = AÑO_ACTUAL - añoFin;

    if (antigüedad > 45) return 5; // Antes de 1980
    if (antigüedad > 35) return 4; // 1980-1989
    if (antigüedad > 25) return 3; // 1990-1999
    if (antigüedad > 15) return 2; // 2000-2009
    return 1;                      // 2010+
}

/**
 * Genera la ruta de imagen para un producto
 * 
 * @param marca - Nombre de la marca
 * @param modelo - Nombre del modelo
 * @returns Ruta relativa a la imagen del producto
 * 
 * @example
 * getImagePath("ROCA", "Gondola") // "/productos/roca_gondola.png"
 */
function getImagePath(marca: string, modelo: string): string {
    return `/productos/${slugify(marca)}_${slugify(modelo)}.png`;
}

// =============================================================================
// TRANSFORMACIÓN DE DATOS
// =============================================================================

/**
 * Tipo interno para los datos del JSON
 */
interface ModeloJSON {
    id: string;
    marca: string;
    modelo: string;
    categoria: string;
    caracteristicas?: string;
    periodo?: string;
    url: string;
    specs?: Record<string, unknown>;
}

interface MarcaJSON {
    nombre: string;
    slug: string;
    modelos?: ModeloJSON[];
}

/**
 * Transforma los datos de productos.json al formato unificado
 * 
 * Esta función se ejecuta UNA VEZ al importar el módulo (singleton pattern).
 * Los datos transformados se almacenan en memoria para evitar recálculos.
 * 
 * @returns Array de productos en formato unificado
 * @throws {Error} Si productos.json está malformado
 */
function transformarProductos(): ProductoUnificado[] {
    const productos: ProductoUnificado[] = [];

    try {
        const marcas = productosData.marcas as Record<string, MarcaJSON>;

        Object.values(marcas).forEach((marcaData) => {
            if (!marcaData.modelos || !Array.isArray(marcaData.modelos)) {
                return; // Skip marcas sin modelos
            }

            marcaData.modelos.forEach((modelo) => {
                // Validar campos requeridos
                if (!modelo.id || !modelo.marca || !modelo.modelo) {
                    console.warn(`[productosUnificados] Modelo incompleto:`, modelo);
                    return;
                }

                productos.push({
                    id: modelo.id,
                    name: `${modelo.modelo} (${modelo.marca})`,
                    brand: modelo.marca,
                    category: modelo.categoria || 'otros',
                    image: getImagePath(modelo.marca, modelo.modelo),
                    description: modelo.caracteristicas || `${modelo.modelo} ${modelo.marca} descatalogado`,
                    inStock: true,
                    rarity: calcularRareza(modelo.periodo),
                    url: modelo.url,
                    periodo: modelo.periodo,
                    specs: modelo.specs as ProductSpecs | undefined,
                });
            });
        });

    } catch (error) {
        console.error('[productosUnificados] Error transformando datos:', error);
        throw new Error('Error al procesar productos.json');
    }

    return productos;
}

// =============================================================================
// EXPORTS
// =============================================================================

/**
 * Lista de todos los productos en formato unificado
 * 
 * @see ProductoUnificado
 */
export const productosUnificados: ProductoUnificado[] = transformarProductos();

/**
 * Alias para compatibilidad con código legacy
 * @deprecated Usar `productosUnificados` directamente
 */
export const products = productosUnificados;

/**
 * Obtiene un producto por su ID
 * 
 * @param id - ID único del producto
 * @returns Producto encontrado o undefined
 */
export function getProductoById(id: string): ProductoUnificado | undefined {
    return productosUnificados.find(p => p.id === id);
}

/**
 * Filtra productos por marca
 * 
 * @param marca - Nombre de la marca (case-insensitive)
 * @returns Array de productos de esa marca
 */
export function getProductosByMarca(marca: string): ProductoUnificado[] {
    const marcaNorm = marca.toLowerCase();
    return productosUnificados.filter(p =>
        p.brand.toLowerCase() === marcaNorm
    );
}

/**
 * Filtra productos por categoría
 * 
 * @param categoria - Nombre de la categoría
 * @returns Array de productos de esa categoría
 */
export function getProductosByCategoria(categoria: string): ProductoUnificado[] {
    return productosUnificados.filter(p =>
        p.category === categoria
    );
}

/**
 * Obtiene productos relacionados (misma marca o categoría)
 * 
 * @param producto - Producto base
 * @param limite - Máximo de productos a retornar (default: 4)
 * @returns Array de productos relacionados
 */
export function getProductosRelacionados(
    producto: ProductoUnificado,
    limite: number = 4
): ProductoUnificado[] {
    return productosUnificados
        .filter(p =>
            p.id !== producto.id &&
            (p.brand === producto.brand || p.category === producto.category)
        )
        .slice(0, limite);
}
