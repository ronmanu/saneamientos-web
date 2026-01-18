/**
 * =============================================================================
 * PRODUCT DETAIL PAGE
 * =============================================================================
 * 
 * Dynamic page displaying individual product details.
 * Uses Static Site Generation (SSG) with generateStaticParams for all products.
 * 
 * @route /producto/[id]
 */

import Image from 'next/image';
import Link from 'next/link';
import { products } from '../../data/products';
import { getRarityInfo } from '../../lib/rarity';
import styles from './page.module.css';

/**
 * Generate static params for all products.
 * This pre-renders all product pages at build time for optimal performance.
 */
export function generateStaticParams() {
    return products.map((product) => ({
        id: product.id,
    }));
}

/**
 * Generate dynamic metadata for SEO.
 * Each product page gets its own title and description.
 */
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = products.find(p => p.id === id);
    return {
        title: product ? `${product.name} (${product.brand}) | Aparatos Sanitarios Descatalogados` : 'Producto no encontrado',
        description: product ? product.description : 'Pieza sanitaria descatalogada.',
    };
}

/**
 * Get related products by same brand or category
 */
function getRelatedProducts(currentProduct: typeof products[0], limit: number = 4) {
    return products
        .filter(p =>
            p.id !== currentProduct.id &&
            (p.brand === currentProduct.brand || p.category === currentProduct.category)
        )
        .slice(0, limit);
}

/**
 * Product Detail Page Component
 * 
 * Displays comprehensive product information including:
 * - Product image with next/image optimization
 * - Brand, name, and price
 * - Rarity indicator with stars
 * - Stock status
 * - Description and technical details
 * - CTA button for stock inquiry
 */
export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = products.find(p => p.id === id);

    // Handle product not found
    if (!product) {
        return <div className="container">Producto no encontrado</div>;
    }

    const rarityInfo = getRarityInfo(product.rarity);
    const relatedProducts = getRelatedProducts(product, 4);

    return (
        <main className={styles.pageContainer}>
            <div className={styles.wrapper}>
                {/* Product Image Section */}
                <div className={styles.imageSection}>
                    <Image
                        src={product.image}
                        alt={product.name}
                        width={500}
                        height={500}
                        className={styles.mainImage}
                        priority
                    />
                </div>

                {/* Product Information Section */}
                <div className={styles.infoSection}>
                    <span className={styles.brand}>{product.brand}</span>
                    <h1 className={styles.title}>{product.name}</h1>

                    {/* Rarity Stars - Visual indicator of how hard to find */}
                    <div className={styles.raritySection}>
                        <span className={styles.rarityLabel}>Dificultad de encontrar:</span>
                        <div className={`${styles.rarityStars} ${styles[`rarityLevel${product.rarity}`]}`}>
                            {'★'.repeat(product.rarity)}{'☆'.repeat(5 - product.rarity)}
                        </div>
                        <span className={`${styles.rarityText} ${styles[`rarityLevel${product.rarity}`]}`}>
                            {rarityInfo.label}
                        </span>
                    </div>

                    {/* Stock Status */}
                    <div className={styles.status}>
                        {product.inStock
                            ? <span className={styles.stock}>En Stock (Envío Inmediato)</span>
                            : <span className={styles.noStock}>Consultar Disponibilidad</span>
                        }
                    </div>

                    <p className={styles.description}>{product.description}</p>

                    {/* Call to Action */}
                    <a href="/consultar-stock" className={styles.ctaButton}>
                        Consultar Stock / Comprar
                    </a>

                    {/* Technical Details */}
                    <div className={styles.details}>
                        <h3>Detalles Técnicos</h3>
                        <ul>
                            <li><strong>Categoría:</strong> {product.category}</li>
                            <li><strong>Referencia:</strong> {product.id}</li>
                            <li><strong>Estado:</strong> Nuevo (Descatalogado)</li>
                            <li><strong>Rareza:</strong> {product.rarity}/5</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Related Products Section */}
            {relatedProducts.length > 0 && (
                <section className={styles.relacionados}>
                    <h2>Productos Relacionados</h2>
                    <div className={styles.relacionadosGrid}>
                        {relatedProducts.map(rel => (
                            <Link key={rel.id} href={`/producto/${rel.id}`} className={styles.relacionadoCard}>
                                <div className={styles.relacionadoImageContainer}>
                                    <Image
                                        src={rel.image}
                                        alt={rel.name}
                                        width={150}
                                        height={150}
                                        className={styles.relacionadoImage}
                                    />
                                </div>
                                <div className={styles.relacionadoInfo}>
                                    <span className={styles.relacionadoMarca}>{rel.brand}</span>
                                    <h3>{rel.name}</h3>
                                    <span className={styles.relacionadoCategoria}>{rel.category}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}
        </main>
    );
}

