import { products, Product } from '../../data/products';
import { getRarityBadge } from '../../lib/rarity';
import styles from '../page.module.css';

export function generateStaticParams() {
    const categories = ['inodoros', 'bidets', 'lavabos', 'mamparas', 'accesorios'];
    return categories.map((categoria) => ({
        categoria,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ categoria: string }> }) {
    const { categoria } = await params;
    const title = categoria.charAt(0).toUpperCase() + categoria.slice(1);
    return {
        title: `${title} Descatalogados | Saneamientos`,
        description: `Catálogo completo de ${title}. Encuentra piezas originales de Roca, Gala y más.`,
    };
}

// Map URL plural to data singular
const categoryMap: Record<string, string> = {
    'inodoros': 'inodoro',
    'bidets': 'bidet',
    'lavabos': 'lavabo',
    'mamparas': 'mampara',
    'accesorios': 'accesorios'
};

export default async function CategoryPage({ params }: { params: Promise<{ categoria: string }> }) {
    const { categoria } = await params;
    const dataCategory = categoryMap[categoria.toLowerCase()] || categoria;

    const filteredProducts = products.filter(
        p => p.category.toLowerCase() === dataCategory.toLowerCase()
    );

    return (
        <main className={styles.pageContainer}>
            <h1 className={styles.categoryTitle}>
                {categoria.charAt(0).toUpperCase() + categoria.slice(1)} Descatalogados
            </h1>

            {filteredProducts.length > 0 ? (
                <div className={styles.grid}>
                    {filteredProducts.map(product => {
                        const rarity = getRarityBadge(product.rarity);

                        return (
                            <div key={product.id} className={styles.card}>
                                {rarity && (
                                    <div
                                        className={styles.rarityBadge}
                                        style={{ color: rarity.color, borderColor: rarity.color }}
                                    >
                                        {rarity.text}
                                    </div>
                                )}
                                <div className={styles.imageWrapper}>
                                    <img src={product.image} alt={product.name} className={styles.productImage} />
                                </div>
                                <div className={styles.content}>
                                    <span className={styles.brand}>{product.brand}</span>
                                    <h3 className={styles.name}>{product.name}</h3>
                                    <p className={styles.price}>{product.price}€</p>
                                    <a href={`/producto/${product.id}`} className={styles.button}>
                                        Ver Detalles
                                    </a>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <p>No se encontraron productos en esta categoría.</p>
            )}
        </main>
    );
}
