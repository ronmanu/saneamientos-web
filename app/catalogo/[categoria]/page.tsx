/**
 * =============================================================================
 * PÁGINA DE CATEGORÍA - Listado por tipo de producto
 * =============================================================================
 * 
 * Muestra todos los productos de una categoría específica (inodoros, bidets, etc.)
 * Enlaza a las páginas de producto con especificaciones técnicas completas.
 * 
 * @route /catalogo/[categoria]
 */

import Image from 'next/image';
import { productosUnificados, ProductoUnificado } from '../../data/productosUnificados';
import styles from '../page.module.css';

// Categorías válidas para generar páginas estáticas
const CATEGORIAS_VALIDAS = ['inodoros', 'bidets', 'lavabos', 'mamparas', 'accesorios', 'plato-ducha'];

/**
 * Genera parámetros estáticos para todas las categorías
 */
export function generateStaticParams() {
    return CATEGORIAS_VALIDAS.map((categoria) => ({
        categoria,
    }));
}

/**
 * Metadatos dinámicos para SEO
 */
export async function generateMetadata({ params }: { params: Promise<{ categoria: string }> }) {
    const { categoria } = await params;
    const title = formatearCategoria(categoria);

    return {
        title: `${title} Descatalogados | Sanitarios Originales`,
        description: `Catálogo completo de ${title.toLowerCase()} descatalogados. Encuentra piezas originales de Roca, Gala, Bellavista, Jacob Delafon y más marcas.`,
        openGraph: {
            title: `${title} Descatalogados`,
            description: `Encuentra ${title.toLowerCase()} descatalogados de todas las marcas`,
        },
    };
}

/**
 * Formatea el slug de categoría a título legible
 */
function formatearCategoria(slug: string): string {
    const titulos: Record<string, string> = {
        'inodoros': 'Inodoros',
        'bidets': 'Bidets',
        'lavabos': 'Lavabos',
        'mamparas': 'Mamparas',
        'accesorios': 'Accesorios',
        'plato-ducha': 'Platos de Ducha',
    };
    return titulos[slug.toLowerCase()] || slug.charAt(0).toUpperCase() + slug.slice(1);
}

/**
 * Obtiene el badge de rareza para mostrar en la tarjeta
 */
function getRarityDisplay(rarity: number): { text: string; color: string } | null {
    if (rarity >= 4) {
        return { text: 'Muy difícil de encontrar', color: '#e74c3c' };
    }
    if (rarity === 3) {
        return { text: 'Difícil de encontrar', color: '#f39c12' };
    }
    return null;
}

/**
 * Página de listado por categoría
 */
export default async function CategoryPage({ params }: { params: Promise<{ categoria: string }> }) {
    const { categoria } = await params;

    // Filtrar productos por categoría
    const filteredProducts = productosUnificados.filter(
        p => p.category.toLowerCase() === categoria.toLowerCase()
    );

    const tituloCategoria = formatearCategoria(categoria);

    return (
        <main className={styles.pageContainer}>
            <div className={styles.categoryHeader}>
                <h1 className={styles.categoryTitle}>
                    {tituloCategoria} Descatalogados
                </h1>
                <p className={styles.categorySubtitle}>
                    {filteredProducts.length} productos disponibles
                </p>
            </div>

            {filteredProducts.length > 0 ? (
                <div className={styles.grid}>
                    {filteredProducts.map(product => {
                        const rarity = getRarityDisplay(product.rarity);

                        return (
                            <a
                                key={product.id}
                                href={product.url}
                                className={styles.card}
                            >
                                {rarity && (
                                    <div
                                        className={styles.rarityBadge}
                                        style={{ color: rarity.color, borderColor: rarity.color }}
                                    >
                                        {rarity.text}
                                    </div>
                                )}
                                <div className={styles.imageWrapper}>
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        width={260}
                                        height={200}
                                        className={styles.productImage}
                                        unoptimized
                                    />
                                </div>
                                <div className={styles.content}>
                                    <span className={styles.brand}>{product.brand}</span>
                                    <h3 className={styles.name}>{product.name}</h3>
                                    {product.periodo && (
                                        <span className={styles.periodo}>{product.periodo}</span>
                                    )}
                                    <span className={styles.viewBtn}>Ver Detalles →</span>
                                </div>
                            </a>
                        );
                    })}
                </div>
            ) : (
                <div className={styles.emptyState}>
                    <p>No se encontraron productos en la categoría {tituloCategoria}.</p>
                    <a href="/catalogo" className={styles.backLink}>
                        ← Volver al catálogo completo
                    </a>
                </div>
            )}
        </main>
    );
}
