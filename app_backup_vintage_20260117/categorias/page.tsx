import styles from './page.module.css';

const categories = [
    { name: 'Lavabos', slug: 'lavabos', image: '/images/categories/lavabos.png', description: 'Lavabos de pedestal, encastre y sobre encimera' },
    { name: 'Inodoros', slug: 'inodoros', image: '/images/categories/inodoros.png', description: 'Inodoros completos, cisternas y mecanismos' },
    { name: 'Bidets', slug: 'bidets', image: '/images/categories/bidets.png', description: 'Bidets de suelo y suspendidos' },
    { name: 'Platos de Ducha', slug: 'plato-ducha', image: '/categories/platos-ducha.jpg', description: 'Platos extraplanos y antideslizantes' },
    { name: 'Mamparas', slug: 'mamparas', image: '/images/categories/mamparas.png', description: 'Mamparas correderas, abatibles y fijas' },
    { name: 'Accesorios', slug: 'accesorios', image: '/images/categories/accesorios.png', description: 'Grifería, toalleros y complementos' },
];

export default function CategoriasPage() {
    return (
        <main className={styles.pageContainer}>
            <div className={styles.header}>
                <h1 className={styles.title}>Categorías</h1>
                <p className={styles.subtitle}>
                    Explora nuestra selección de aparatos sanitarios descatalogados organizados por tipo de producto
                </p>
            </div>

            <div className={styles.grid}>
                {categories.map(category => (
                    <a
                        key={category.slug}
                        href={`/catalogo/${category.slug}`}
                        className={styles.categoryCard}
                    >
                        <div
                            className={styles.categoryImage}
                            style={{ backgroundImage: `url('${category.image}')` }}
                        >
                            <div className={styles.categoryOverlay}></div>
                        </div>
                        <div className={styles.categoryContent}>
                            <h2 className={styles.categoryName}>{category.name}</h2>
                            <p className={styles.categoryDescription}>{category.description}</p>
                            <span className={styles.categoryLink}>Ver productos →</span>
                        </div>
                    </a>
                ))}
            </div>
        </main>
    );
}
