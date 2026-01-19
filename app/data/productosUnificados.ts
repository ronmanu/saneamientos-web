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
 */

import productosData from './productos.json';

// =============================================================================
// TIPOS E INTERFACES
// =============================================================================

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

export interface ProductoUnificado {
    id: string;
    name: string;
    brand: string;
    category: string;
    image: string;
    description: string;
    inStock: boolean;
    rarity: 1 | 2 | 3 | 4 | 5;
    url: string;
    periodo?: string;
    specs?: ProductSpecs;
}

// =============================================================================
// CONSTANTES
// =============================================================================

const AÑO_ACTUAL = new Date().getFullYear();

// =============================================================================
// FUNCIONES AUXILIARES
// =============================================================================

function slugify(str: string): string {
    return str
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, '_')
        .replace(/[()]/g, '');
}

function calcularRareza(periodo?: string): 1 | 2 | 3 | 4 | 5 {
    if (!periodo) return 3;
    const match = periodo.match(/(\d{4})(?:\s*-\s*(\d{4}))?/);
    if (!match) return 3;
    const añoFin = parseInt(match[2] || match[1]);
    const antigüedad = AÑO_ACTUAL - añoFin;
    if (antigüedad > 45) return 5;
    if (antigüedad > 35) return 4;
    if (antigüedad > 25) return 3;
    if (antigüedad > 15) return 2;
    return 1;
}

function getImagePath(marca: string, modelo: string): string {
    return `/productos/${slugify(marca)}_${slugify(modelo)}.png`;
}

// =============================================================================
// TRANSFORMACIÓN DE DATOS
// =============================================================================

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

function transformarProductos(): ProductoUnificado[] {
    const productos: ProductoUnificado[] = [];

    try {
        const marcas = productosData.marcas as unknown as Record<string, MarcaJSON>;

        Object.values(marcas).forEach((marcaData) => {
            if (!marcaData.modelos || !Array.isArray(marcaData.modelos)) {
                return;
            }

            marcaData.modelos.forEach((modelo) => {
                if (!modelo.id || !modelo.marca || !modelo.modelo) {
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

export const productosUnificados: ProductoUnificado[] = transformarProductos();
export const products = productosUnificados;

export function getProductoById(id: string): ProductoUnificado | undefined {
    return productosUnificados.find(p => p.id === id);
}

export function getProductosByMarca(marca: string): ProductoUnificado[] {
    const marcaNorm = marca.toLowerCase();
    return productosUnificados.filter(p =>
        p.brand.toLowerCase() === marcaNorm
    );
}

export function getProductosByCategoria(categoria: string): ProductoUnificado[] {
    return productosUnificados.filter(p =>
        p.category === categoria
    );
}

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

/**
 * Obtiene variantes de color del mismo modelo base
 * @param producto Producto actual
 * @returns Array de productos hermanos (mismo modelo, distinto color)
 */
export function getVariantesDeColor(producto: ProductoUnificado): ProductoUnificado[] {
    const coloresRegex = /\s+(blanco|pergam[oó]n|vis[oó]n|rosa|azul|verde|gris|habana|bolero|champ[aá]n|manhatan|jazm[ií]n|caramelo|rojo|negro|mate).*$/i;

    const cleanName = (name: string) => name.split('(')[0].replace(coloresRegex, '').trim().toLowerCase();
    const baseName = cleanName(producto.name);

    return productosUnificados.filter(p =>
        p.brand === producto.brand &&
        p.category === producto.category &&
        cleanName(p.name) === baseName
    ).sort((a, b) => a.name.localeCompare(b.name));
}
