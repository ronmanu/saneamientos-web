/**
 * =============================================================================
 * SERVICIO DE DATOS DE PRODUCTOS
 * =============================================================================
 * 
 * Proporciona acceso a los datos de productos desde el JSON generado.
 * Usado por las páginas dinámicas del catálogo.
 */

import productosData from './productos.json';

// Tipos de especificaciones técnicas por categoría
export interface SpecsInodoro {
    alturaTotal: string | null;           // cm - Altura desde suelo hasta parte superior cisterna
    alturaAsiento: string | null;         // cm - Altura desde suelo hasta borde taza
    ancho: string | null;                 // cm - Ancho máximo
    fondo: string | null;                 // cm - Profundidad desde pared hasta frente
    salida: 'horizontal' | 'vertical' | 'dual' | null;
    distanciaDesague: string | null;      // cm - Centro del desagüe a la pared
    entradaAgua: 'lateral izquierda' | 'lateral derecha' | 'inferior' | null;
    capacidadCisterna: string | null;     // litros - ej: "6L" o "3-6L"
    formaTaza: 'ovalada' | 'redonda' | 'cuadrada' | null;
    fijacion: string | null;              // "2 tornillos" | "4 tornillos"
    distanciaEntreTornillos: string | null; // cm - Para tapas compatibles
    colorDisponible: string[] | null;     // Array de colores disponibles
}

export interface SpecsLavabo {
    ancho: string | null;                 // cm
    fondo: string | null;                 // cm
    altura: string | null;                // cm - Altura total con pedestal
    tipoMontaje: 'mural' | 'pedestal' | 'semipedestal' | 'encastre' | 'sobre encimera' | null;
    numOrificiosGriferia: number | null;  // 1 | 3
    separacionOrificios: string | null;   // cm
    conRebosadero: boolean | null;
    diametroDesague: string | null;       // mm - 32 | 40
    colorDisponible: string[] | null;
}

export interface SpecsBidet {
    altura: string | null;                // cm
    ancho: string | null;                 // cm
    fondo: string | null;                 // cm
    numOrificiosGriferia: number | null;  // 1 | 2
    salida: 'horizontal' | 'vertical' | null;
    distanciaDesague: string | null;      // cm
    colorDisponible: string[] | null;
}

export interface SpecsTapa {
    largoTotal: string | null;            // cm
    anchoMaximo: string | null;           // cm
    distanciaEntreEjes: string | null;    // cm - CRÍTICO para compatibilidad
    forma: 'ovalada' | 'cuadrada' | 'en D' | 'redonda' | null;
    material: 'duroplast' | 'MDF lacado' | 'polipropileno' | 'madera maciza' | null;
    caidaAmortiguada: boolean | null;     // Soft close
    bisagrasRegulables: boolean | null;
    colorDisponible: string[] | null;
}

export interface SpecsCisterna {
    capacidad: string | null;             // litros
    tipoMecanismo: 'D1P' | 'D2P' | 'tirón' | 'pulsador simple' | 'doble pulsador' | null;
    entradaAgua: 'lateral' | 'inferior' | null;
    alto: string | null;                  // cm
    ancho: string | null;                 // cm
    fondo: string | null;                 // cm
    colorDisponible: string[] | null;
}

export interface SpecsOtros {
    dimensiones: string | null;           // Texto libre para medidas
    colorDisponible: string[] | null;
}

export type ProductSpecs = SpecsInodoro | SpecsLavabo | SpecsBidet | SpecsTapa | SpecsCisterna | SpecsOtros;

// Tipos
export interface Producto {
    id: string;
    marca: string;
    marcaSlug: string;
    modelo: string;
    modeloSlug: string;
    tipoPrincipal: string;
    categoria: string;
    codigo: string;
    periodo: string;
    situacion: string;
    caracteristicas: string;
    compatibilidades: string;
    recambios: string;
    imagenFuente: string;
    notas: string;
    url: string;
    specs?: ProductSpecs;  // Especificaciones técnicas opcionales
}

export interface Marca {
    nombre: string;
    slug: string;
    modelos: Producto[];
}

export interface ProductosDatabase {
    marcas: Record<string, Marca>;
    totalProductos: number;
    fechaActualizacion: string;
}

// Base de datos tipada
const db = productosData as ProductosDatabase;

/**
 * Obtiene todas las marcas disponibles
 */
export function getMarcas(): Marca[] {
    return Object.values(db.marcas);
}

/**
 * Obtiene una marca por su slug
 */
export function getMarcaBySlug(slug: string): Marca | null {
    return db.marcas[slug] || null;
}

/**
 * Obtiene todos los productos de una marca
 */
export function getProductosByMarca(marcaSlug: string): Producto[] {
    const marca = db.marcas[marcaSlug];
    return marca ? marca.modelos : [];
}

/**
 * Obtiene productos filtrados por marca y categoría
 */
export function getProductosByMarcaYCategoria(marcaSlug: string, categoria: string): Producto[] {
    const productos = getProductosByMarca(marcaSlug);
    return productos.filter(p => p.categoria === categoria);
}

/**
 * Obtiene un producto específico por su ruta completa
 */
export function getProductoByRuta(marcaSlug: string, categoria: string, modeloSlug: string): Producto | null {
    const productos = getProductosByMarcaYCategoria(marcaSlug, categoria);
    return productos.find(p => p.modeloSlug === modeloSlug) || null;
}

/**
 * Busca productos por término de búsqueda
 */
export function buscarProductos(query: string): Producto[] {
    const termino = query.toLowerCase();
    const resultados: Producto[] = [];

    Object.values(db.marcas).forEach(marca => {
        marca.modelos.forEach(producto => {
            const textoCompleto = `${producto.marca} ${producto.modelo} ${producto.tipoPrincipal} ${producto.caracteristicas}`.toLowerCase();
            if (textoCompleto.includes(termino)) {
                resultados.push(producto);
            }
        });
    });

    return resultados;
}

/**
 * Obtiene productos por categoría (todas las marcas)
 */
export function getProductosByCategoria(categoria: string): Producto[] {
    const resultados: Producto[] = [];

    Object.values(db.marcas).forEach(marca => {
        marca.modelos.forEach(producto => {
            if (producto.categoria === categoria) {
                resultados.push(producto);
            }
        });
    });

    return resultados;
}

/**
 * Obtiene todas las categorías disponibles
 */
export function getCategorias(): string[] {
    const categorias = new Set<string>();

    Object.values(db.marcas).forEach(marca => {
        marca.modelos.forEach(producto => {
            if (producto.categoria) {
                categorias.add(producto.categoria);
            }
        });
    });

    return Array.from(categorias);
}

/**
 * Obtiene todos los productos
 */
export function getAllProductos(): Producto[] {
    const todos: Producto[] = [];

    Object.values(db.marcas).forEach(marca => {
        todos.push(...marca.modelos);
    });

    return todos;
}

/**
 * Obtiene el total de productos
 */
export function getTotalProductos(): number {
    return db.totalProductos;
}

/**
 * Genera parámetros estáticos para generateStaticParams de Next.js
 */
export function getStaticProductParams(): Array<{ marca: string; categoria: string; modelo: string }> {
    const params: Array<{ marca: string; categoria: string; modelo: string }> = [];

    Object.values(db.marcas).forEach(marca => {
        marca.modelos.forEach(producto => {
            params.push({
                marca: producto.marcaSlug,
                categoria: producto.categoria,
                modelo: producto.modeloSlug,
            });
        });
    });

    return params;
}

/**
 * Obtiene productos relacionados (misma marca o categoría)
 */
export function getProductosRelacionados(producto: Producto, limite: number = 4): Producto[] {
    const relacionados: Producto[] = [];

    // Primero, misma marca y categoría
    const mismaMarcaCategoria = getProductosByMarcaYCategoria(producto.marcaSlug, producto.categoria)
        .filter(p => p.id !== producto.id);
    relacionados.push(...mismaMarcaCategoria.slice(0, limite));

    // Si no hay suficientes, añadir de la misma categoría pero otra marca
    if (relacionados.length < limite) {
        const mismaCategoria = getProductosByCategoria(producto.categoria)
            .filter(p => p.id !== producto.id && !relacionados.find(r => r.id === p.id));
        relacionados.push(...mismaCategoria.slice(0, limite - relacionados.length));
    }

    return relacionados.slice(0, limite);
}
