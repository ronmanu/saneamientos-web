/**
 * =============================================================================
 * PÁGINA DE MARCA - Listado de productos por fabricante
 * =============================================================================
 * 
 * Muestra todos los productos de una marca específica.
 * Usa productosUnificados como única fuente de datos.
 * 
 * @route /marca/[brand]
 */

import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getProductosByMarca, productosUnificados } from '@/app/data/productosUnificados';
import styles from '../../catalogo/Catalog.module.css';

// Marcas disponibles para generar páginas estáticas
const MARCAS = ['roca', 'gala', 'bellavista', 'jacob-delafon', 'sangra', 'valadares', 'sanitana', 'duravit'];

/**
 * Genera parámetros estáticos para todas las marcas
 */
export function generateStaticParams() {
    return MARCAS.map((brand) => ({
        brand,
    }));
}

/**
 * Formatea el slug de marca a nombre legible
 */
function formatBrand(slug: string): string {
    const nombres: Record<string, string> = {
        'roca': 'ROCA',
        'gala': 'GALA',
        'bellavista': 'BELLAVISTA',
        'jacob-delafon': 'Jacob Delafon',
        'jacob_delafon': 'Jacob Delafon',
        'sangra': 'Sangrá',
        'valadares': 'Valadares',
        'sanitana': 'Sanitana',
        'duravit': 'Duravit',
    };
    return nombres[slug.toLowerCase()] || slug.toUpperCase();
}

/**
 * Metadatos dinámicos para SEO
 */
export async function generateMetadata({ params }: { params: Promise<{ brand: string }> }) {
    const { brand } = await params;
    const displayBrand = formatBrand(brand);

    return {
        title: `Sanitarios ${displayBrand} Descatalogados | Catálogo Oficial`,
        description: `Encuentra todos los modelos descatalogados de la marca ${displayBrand}. Repuestos originales y garantizados. Inodoros, bidets, lavabos y más.`,
        openGraph: {
            title: `${displayBrand} Descatalogados`,
            description: `Catálogo completo de ${displayBrand} descatalogados`,
        },
    };
}

/**
 * Página de marca
 */
export default async function BrandPage({ params }: { params: Promise<{ brand: string }> }) {
    const { brand } = await params;
    const displayBrand = formatBrand(brand);

    // Filtrar productos por marca (normalizado)
    const brandNorm = displayBrand.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const filteredProducts = productosUnificados.filter(p => {
        const pBrand = p.brand.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        return pBrand === brandNorm || pBrand.includes(brandNorm) || brandNorm.includes(pBrand);
    });

    return (
        <main className={styles.pageContainer}>
            <div className={styles.categoryHeader}>
                <h1 className={styles.categoryTitle}>
                    {displayBrand}
                </h1>
                <p className={styles.categorySubtitle}>
                    Catálogo exclusivo de piezas descatalogadas de la marca {displayBrand}.
                    {filteredProducts.length > 0 && ` ${filteredProducts.length} productos disponibles.`}
                </p>
            </div>

            {filteredProducts.length > 0 ? (
                <div className={styles.grid}>
                    {filteredProducts.map(product => (
                        <a
                            key={product.id}
                            href={product.url}
                            className={styles.card}
                        >
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
                    ))}
                </div>
            ) : (
                <div className={styles.emptyState}>
                    <p>No se encontraron productos disponibles para {displayBrand} actualmente.</p>
                    <a href="/contacto" className={styles.backLink}>
                        Consultar disponibilidad
                    </a>
                </div>
            )}
        </main>
    );
}
