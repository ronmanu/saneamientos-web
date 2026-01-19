/**
 * =============================================================================
 * SERVICIO DE DATOS DE PRODUCTOS
 * =============================================================================
 * 
 * Proporciona acceso a los datos de productos desde el JSON generado.
 * Usado por las páginas dinámicas del catálogo.
 */

import productosData from './productos.json';

// Tipo de especificaciones técnicas - flexible para todos los tipos de productos
export interface ProductSpecs {
    // Medidas generales
    alturaTotal?: string | null;
    alturaAsiento?: string | null;
    altura?: string | null;
    ancho?: string | null;
    fondo?: string | null;

    // Inodoros específicos
    salida?: string | null;
    distanciaDesague?: string | null;
    entradaAgua?: string | null;
    capacidadCisterna?: string | null;
    formaTaza?: string | null;
    fijacion?: string | null;
    distanciaEntreTornillos?: string | null;

    // Tapas WC
    largoTotal?: string | null;
    anchoMaximo?: string | null;
    distanciaEntreEjes?: string | null;
    forma?: string | null;
    material?: string | null;
    caidaAmortiguada?: boolean | null;
    bisagrasRegulables?: boolean | null;

    // Lavabos
    tipoMontaje?: string | null;
    numOrificiosGriferia?: number | null;
    separacionOrificios?: string | null;
    conRebosadero?: boolean | null;
    diametroDesague?: string | null;

    // Cisternas
    capacidad?: string | null;
    tipoMecanismo?: string | null;

    // Colores y disponibilidad
    colorDisponible?: string[] | null;

    // Campos adicionales del JSON de especificaciones
    grupoCompatibilidad?: string | null;
    alertaCompatibilidad?: string | null;
    disponibilidad?: string | null;
    plazoRecambio?: string | null;
    costeEstimado?: string | null;
    distribuidoresRecomendados?: string[] | null;
    notaTecnica?: string | null;
    codigoReferencia?: string | null;

    // Campo genérico para otros
    dimensiones?: string | null;
}


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

// Base de datos tipada - permite marcas dinámicas
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db = productosData as any as ProductosDatabase;

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
