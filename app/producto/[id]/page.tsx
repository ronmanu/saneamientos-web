/**
 * =============================================================================
 * PÁGINA DE PRODUCTO LEGACY
 * =============================================================================
 * 
 * Esta página mantiene retrocompatibilidad con URLs antiguas (/producto/[id])
 * pero ahora usa la misma fuente de datos que el catálogo.
 * 
 * Para productos del catálogo principal, redirige a /catalogo/[marca]/[categoria]/[modelo]
 * Para productos especiales (colores), muestra la página directamente.
 * 
 * @route /producto/[id]
 * @deprecated Preferir /catalogo/[marca]/[categoria]/[modelo]
 */

import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { productosUnificados, ProductoUnificado, getProductosRelacionados } from '../../data/productosUnificados';
import styles from './page.module.css';

// Productos especiales que no están en el catálogo principal (colores, etc)
// Estos se mantienen aquí para retrocompatibilidad
const productosEspeciales: ProductoUnificado[] = [
    {
        id: 'color-1',
        name: 'Inodoro Color Pergamino',
        brand: 'Roca',
        category: 'inodoro',
        image: '/productos/inodoro_pergamino.png',
        description: 'Inodoro completo en color pergamino/hueso. Ideal para baños de estilo clásico.',
        inStock: true,
        rarity: 4,
        url: '/producto/color-1',
    },
    {
        id: 'color-2',
        name: 'Inodoro Color Visón',
        brand: 'Roca',
        category: 'inodoro',
        image: '/productos/inodoro_vison.png',
        description: 'Inodoro en color visón/marrón claro. Muy difícil de encontrar.',
        inStock: true,
        rarity: 5,
        url: '/producto/color-2',
    },
    {
        id: 'color-7',
        name: 'Lavabo Color Pergamino',
        brand: 'Roca',
        category: 'lavabo',
        image: '/productos/lavabo_pergamino.png',
        description: 'Lavabo con pedestal en color pergamino.',
        inStock: true,
        rarity: 4,
        url: '/producto/color-7',
    },
    {
        id: 'color-10',
        name: 'Bidé Color Visón',
        brand: 'Roca',
        category: 'bidet',
        image: '/productos/bide_vison.png',
        description: 'Bidé en color visón. Pieza muy rara.',
        inStock: true,
        rarity: 5,
        url: '/producto/color-10',
    },
];

// Combinar todos los productos
const todosLosProductos = [...productosUnificados, ...productosEspeciales];

/**
 * Genera parámetros estáticos para todos los productos
 */
export function generateStaticParams() {
    return todosLosProductos.map((product) => ({
        id: product.id,
    }));
}

/**
 * Metadatos dinámicos para SEO
 */
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = todosLosProductos.find(p => p.id === id);

    return {
        title: product
            ? `${product.name} | Aparatos Sanitarios Descatalogados`
            : 'Producto no encontrado',
        description: product?.description || 'Pieza sanitaria descatalogada.',
    };
}

/**
 * Obtiene el texto de rareza
 */
function getRarityInfo(rarity: number): { text: string; color: string } {
    const levels = [
        { text: 'Común', color: '#22c55e' },
        { text: 'Poco común', color: '#84cc16' },
        { text: 'Difícil de encontrar', color: '#eab308' },
        { text: 'Muy difícil de encontrar', color: '#f97316' },
        { text: 'Extremadamente raro', color: '#ef4444' },
    ];
    return levels[Math.min(rarity - 1, 4)];
}

/**
 * Página de producto
 */
export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    // Buscar en productosUnificados primero
    const productoUnificado = productosUnificados.find(p => p.id === id);

    // Si existe en el catálogo principal y tiene URL de catálogo, redirigir
    if (productoUnificado && productoUnificado.url.startsWith('/catalogo/')) {
        redirect(productoUnificado.url);
    }

    // Buscar en productos especiales
    const product = todosLosProductos.find(p => p.id === id);

    if (!product) {
        return (
            <main className={styles.container}>
                <h1>Producto no encontrado</h1>
                <p>El producto que buscas no existe o ha sido eliminado.</p>
                <Link href="/catalogo">Volver al catálogo</Link>
            </main>
        );
    }

    const rarityInfo = getRarityInfo(product.rarity);
    const relatedProducts = getProductosRelacionados(product, 4);

    return (
        <main className={styles.container}>
            <div className={styles.productGrid}>
                {/* Imagen del producto */}
                <div className={styles.imageSection}>
                    <Image
                        src={product.image}
                        alt={product.name}
                        width={500}
                        height={400}
                        className={styles.productImage}
                        priority
                        unoptimized
                    />
                </div>

                {/* Información del producto */}
                <div className={styles.infoSection}>
                    <span className={styles.brand}>{product.brand}</span>
                    <h1 className={styles.productName}>{product.name}</h1>

                    {/* Rareza */}
                    <div className={styles.raritySection}>
                        <span className={styles.rarityLabel}>Dificultad de encontrar:</span>
                        <div className={styles.rarityStars}>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                    key={star}
                                    className={star <= product.rarity ? styles.starFilled : styles.starEmpty}
                                >
                                    ★
                                </span>
                            ))}
                        </div>
                        <span className={styles.rarityText} style={{ color: rarityInfo.color }}>
                            {rarityInfo.text}
                        </span>
                    </div>

                    {/* Stock */}
                    <div className={styles.stockBadge} data-instock={product.inStock}>
                        {product.inStock ? 'En Stock (Envío Inmediato)' : 'Consultar disponibilidad'}
                    </div>

                    {/* Descripción */}
                    <p className={styles.description}>{product.description}</p>

                    {/* Detalles */}
                    <div className={styles.details}>
                        <h3>Detalles Técnicos</h3>
                        <dl>
                            <dt>Categoría:</dt>
                            <dd>{product.category}</dd>
                            <dt>Referencia:</dt>
                            <dd>{product.id}</dd>
                            <dt>Estado:</dt>
                            <dd>Nuevo (Descatalogado)</dd>
                            <dt>Rareza:</dt>
                            <dd>{product.rarity}/5</dd>
                        </dl>
                    </div>

                    {/* CTA */}
                    <a
                        href={`https://wa.me/34666777888?text=Hola, me interesa el ${encodeURIComponent(product.name)} (Ref: ${product.id})`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.ctaButton}
                    >
                        Consultar Stock / Comprar
                    </a>
                </div>
            </div>

            {/* Productos relacionados */}
            {relatedProducts.length > 0 && (
                <section className={styles.relacionados}>
                    <h2>Productos Relacionados</h2>
                    <div className={styles.relacionadosGrid}>
                        {relatedProducts.map(rel => (
                            <Link key={rel.id} href={rel.url} className={styles.relacionadoCard}>
                                <div className={styles.relacionadoImageWrapper}>
                                    <Image
                                        src={rel.image}
                                        alt={rel.name}
                                        width={200}
                                        height={150}
                                        className={styles.relacionadoImage}
                                        unoptimized
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
