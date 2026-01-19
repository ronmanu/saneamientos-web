/**
 * Productos unificados
 * 
 * Este archivo exporta todos los productos desde productos.json
 * en el formato que necesitan las páginas del catálogo.
 * 
 * ÚNICA FUENTE DE VERDAD: productos.json
 */

import productosData from './productos.json';

export interface ProductoUnificado {
    id: string;
    name: string;
    brand: string;
    category: string;
    image: string;
    description: string;
    inStock: boolean;
    rarity: 1 | 2 | 3 | 4 | 5;
    url: string;  // URL correcta a /catalogo/...
    specs?: {
        ancho?: string;
        fondo?: string;
        distanciaEntreTornillos?: string;
        formaTaza?: string;
        grupoCompatibilidad?: string;
        [key: string]: string | string[] | null | undefined;
    };
}

// Transformar productos.json al formato unificado
function transformarProductos(): ProductoUnificado[] {
    const productos: ProductoUnificado[] = [];

    Object.values(productosData.marcas).forEach((marcaData: {
        modelos?: Array<{
            id: string;
            marca: string;
            modelo: string;
            categoria: string;
            caracteristicas: string;
            url: string;
            specs?: Record<string, unknown>;
        }>
    }) => {
        if (marcaData.modelos) {
            marcaData.modelos.forEach(modelo => {
                // Calcular rareza basada en situación
                let rarity: 1 | 2 | 3 | 4 | 5 = 3;

                productos.push({
                    id: modelo.id,
                    name: `${modelo.modelo} (${modelo.marca})`,
                    brand: modelo.marca,
                    category: modelo.categoria,
                    image: `/productos/${modelo.marca.toLowerCase().replace(/\s+/g, '_')}_${modelo.modelo.toLowerCase().replace(/\s+/g, '_').replace(/[()]/g, '')}.png`,
                    description: modelo.caracteristicas || `${modelo.modelo} ${modelo.marca} descatalogado`,
                    inStock: true,
                    rarity: rarity,
                    url: modelo.url,
                    specs: modelo.specs as ProductoUnificado['specs']
                });
            });
        }
    });

    return productos;
}

export const productosUnificados = transformarProductos();

// Para compatibilidad con código existente
export const products = productosUnificados;
