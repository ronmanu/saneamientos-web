import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { productosUnificados, getProductosByMarca } from '@/app/data/productosUnificados';
import styles from '../../Catalog.module.css';

interface CategoryPageProps {
    params: Promise<{ marca: string; categoria: string }>;
}

// Helpers
function normalizeMarca(slug: string): string {
    const map: Record<string, string> = {
        'roca': 'ROCA',
        'gala': 'GALA',
        'bellavista': 'BELLAVISTA',
        'jacob-delafon': 'Jacob Delafon',
        'sangra': 'Sangrá',
        'valadares': 'Valadares',
        'sanitana': 'Sanitana',
        'duravit': 'Duravit',
    };
    return map[slug.toLowerCase()] || slug.toUpperCase();
}

function formatearNombre(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export async function generateStaticParams() {
    const paths = [];
    const marcas = [...new Set(productosUnificados.map(p => p.brand))];

    for (const marca of marcas) {
        const productosMarca = productosUnificados.filter(p => p.brand === marca);
        const categorias = [...new Set(productosMarca.map(p => p.category))];

        for (const cat of categorias) {
            paths.push({
                marca: marca.toLowerCase().replace(/ /g, '-').normalize('NFD').replace(/[\u0300-\u036f]/g, ''),
                categoria: cat
            });
        }
    }
    return paths;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
    const { marca, categoria } = await params;
    const nombreMarca = normalizeMarca(marca);
    const nombreCat = formatearNombre(categoria);

    return {
        title: `${nombreCat} ${nombreMarca} Antiguos | Repuestos y Tapas Descatalogadas`,
        description: `Catálogo de ${nombreCat.toLowerCase()} ${nombreMarca} descatalogados. Encuentra tu modelo antiguo: Victoria, Giralda, Dama... Piezas originales en stock.`,
        keywords: [`${nombreCat.toLowerCase()} ${nombreMarca}`, `tapa ${nombreCat.toLowerCase()} ${nombreMarca}`, `repuestos ${nombreMarca}`],
        openGraph: {
            title: `${nombreCat} ${nombreMarca} - Stock Disponible`,
            description: `Recambios originales de ${nombreCat.toLowerCase()} ${nombreMarca}.`,
            type: 'website',
        }
    };
}

export default async function CategoriaPage({ params }: CategoryPageProps) {
    const { marca, categoria } = await params;
    const nombreMarca = normalizeMarca(marca);

    const productos = productosUnificados.filter(p =>
        p.brand.toLowerCase() === nombreMarca.toLowerCase() &&
        p.category === categoria
    );

    if (productos.length === 0) {
        notFound();
    }

    return (
        <main className={styles.pageContainer}>
            {/* Header SEO */}
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>{formatearNombre(categoria)} {nombreMarca} Antiguos</h1>
                </div>
                <span className={styles.resultCount}>{productos.length} Modelos</span>
            </div>

            <p className={styles.brandDescription}>
                ¿Buscas un <strong>{formatearNombre(categoria).toLowerCase()} {nombreMarca}</strong> antiguo para tu baño?
                Aquí encontrarás todos los modelos descatalogados de {nombreMarca}.
                Identifica tu modelo por la foto y encuentra repuestos compatibles 100% originales.
            </p>

            {/* Breadcrumb simple */}
            <div className={styles.categoriesList}>
                <Link href={`/catalogo/${marca}`} className={styles.categoryPill}>
                    ← Volver a todo {nombreMarca}
                </Link>
            </div>

            {/* Grid de Productos */}
            <div className={styles.grid}>
                {productos.map((producto) => (
                    <Link
                        href={`/catalogo/${producto.brand.toLowerCase().replace(/ /g, '-')}/${producto.category}/${producto.id.split('-')[1] || producto.name.split(' ')[0].toLowerCase()}`}
                        key={producto.id}
                        className={styles.card}
                    >
                        {/* Wrapper de imagen */}
                        <div className={styles.imageWrapper}>
                            <Image
                                src={producto.image}
                                alt={producto.name}
                                width={300}
                                height={300}
                                className={styles.productImage}
                                loading="lazy"
                            />
                            {producto.inStock && (
                                <span className={styles.rareBadge}>En Stock</span>
                            )}
                        </div>

                        {/* Info del producto */}
                        <div className={styles.content}>
                            <span className={styles.brand}>{producto.brand}</span>
                            <h2 className={styles.name}>{producto.name}</h2>
                            <p style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.5rem' }}>
                                {producto.description.substring(0, 60)}...
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </main>
    );
}
