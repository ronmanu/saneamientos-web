import { products, Product } from '../../data/products';
import { getRarityInfo } from '../../lib/rarity';
import styles from './page.module.css';

export function generateStaticParams() {
    return products.map((product) => ({
        id: product.id,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = products.find(p => p.id === id);
    return {
        title: product ? `${product.name} (${product.brand}) | Saneamientos Descatalogados` : 'Producto no encontrado',
        description: product ? product.description : 'Pieza sanitaria descatalogada.',
    };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = products.find(p => p.id === id);

    if (!product) {
        return <div className="container">Producto no encontrado</div>;
    }

    const rarityInfo = getRarityInfo(product.rarity);

    return (
        <main className={styles.pageContainer}>
            <div className={styles.wrapper}>
                <div className={styles.imageSection}>
                    <img src={product.image} alt={product.name} className={styles.mainImage} />
                </div>

                <div className={styles.infoSection}>
                    <span className={styles.brand}>{product.brand}</span>
                    <h1 className={styles.title}>{product.name}</h1>
                    <p className={styles.price}>{product.price}€</p>

                    {/* Rarity Stars */}
                    <div className={styles.raritySection}>
                        <span className={styles.rarityLabel}>Dificultad de encontrar:</span>
                        <div className={`${styles.rarityStars} ${styles[`rarityLevel${product.rarity}`]}`}>
                            {'★'.repeat(product.rarity)}{'☆'.repeat(5 - product.rarity)}
                        </div>
                        <span className={`${styles.rarityText} ${styles[`rarityLevel${product.rarity}`]}`}>
                            {rarityInfo.label}
                        </span>
                    </div>

                    <div className={styles.status}>
                        {product.inStock
                            ? <span className={styles.stock}>En Stock (Envío Inmediato)</span>
                            : <span className={styles.noStock}>Consultar Disponibilidad</span>
                        }
                    </div>

                    <p className={styles.description}>{product.description}</p>

                    <a href="/consultar-stock" className={styles.ctaButton}>
                        Consultar Stock / Comprar
                    </a>

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
        </main>
    );
}
