import { products } from '../../data/products';
import styles from '../../catalogo/page.module.css';

export function generateStaticParams() {
    const brands = ['roca', 'gala', 'bellavista', 'jacob-delafon', 'sangra'];
    return brands.map((brand) => ({
        brand,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ brand: string }> }) {
    const { brand } = await params;
    const decodedBrand = brand.replace('-', ' ');
    return {
        title: `Sanitarios ${decodedBrand.toUpperCase()} Descatalogados | Catálogo Oficial`,
        description: `Encuentra todos los modelos descatalogados de la marca ${decodedBrand}. Repuestos originales y garantizados.`,
    };
}

export default async function BrandPage({ params }: { params: Promise<{ brand: string }> }) {
    const { brand } = await params;

    // Formatting logic for display
    const formatBrand = (str: string) => {
        if (str === 'jacob-delafon') return 'Jacob Delafon';
        if (str === 'sangra') return 'Sangrá';
        return str.replace('-', ' ').toUpperCase();
    };

    const displayBrand = formatBrand(brand);
    // Logic for filtering (data has 'Jacob Delafon' and 'Sangrá')
    const getFilterBrand = (str: string) => {
        if (str === 'jacob-delafon') return 'Jacob Delafon';
        if (str === 'sangra') return 'Sangrá';
        return str; // Default
    }
    const filterBrand = getFilterBrand(brand);

    const filteredProducts = products.filter(
        p => p.brand.toLowerCase() === filterBrand.replace('-', ' ').toLowerCase()
    );

    return (
        <main className="container" style={{ padding: '8rem 2rem 4rem' }}>
            <h1 style={{ marginBottom: '1rem', fontSize: '3rem', color: 'var(--color-primary)', textTransform: 'uppercase' }}>
                {displayBrand}
            </h1>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '3rem', fontSize: '1.2rem' }}>
                Catálogo exclusivo de piezas descatalogadas de la marca {displayBrand}.
            </p>

            {filteredProducts.length > 0 ? (
                <div className={styles.grid}>
                    {filteredProducts.map(product => (
                        <div key={product.id} className={styles.card}>
                            <div className={styles.imageWrapper}>
                                <img src={product.image} alt={product.name} className={styles.productImage} />
                            </div>
                            <div className={styles.content}>
                                <span className={styles.brand}>{product.brand}</span>
                                <h3 className={styles.name}>{product.name}</h3>
                                <p className={styles.price}>{product.price}€</p>
                                <a href={`/producto/${product.id}`} className={styles.button} style={{ display: 'block', textAlign: 'center' }}>
                                    Ver Detalles
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="glass-panel" style={{ padding: '4rem', textAlign: 'center' }}>
                    <p>No se encontraron productos disponibles para esta marca actualmente.</p>
                    <a href="/contacto" className="btn-primary" style={{ display: 'inline-block', marginTop: '2rem' }}>
                        Consultar disponibilidad próximamente
                    </a>
                </div>
            )}
        </main>
    );
}
