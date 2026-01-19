import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { productosUnificados, getProductosByMarca } from '@/app/data/productosUnificados';
import styles from '../../page.module.css';

interface MarcaPageProps {
    params: Promise<{ marca: string }>;
}

// Función auxiliar para normalizar slug de marca
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
    const marcas = [...new Set(productosUnificados.map(p => p.brand))];
    return marcas.map(marca => ({
        marca: marca.toLowerCase().replace(/ /g, '-').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    }));
}

export async function generateMetadata({ params }: MarcaPageProps): Promise<Metadata> {
    const { marca } = await params;
    const nombreMarca = normalizeMarca(marca);

    return {
        title: `Repuestos ${nombreMarca} Antiguos y Descatalogados | Consultar Stock`,
        description: `¿Buscas sanitarios ${nombreMarca} descatalogados? Encuentra inodoros, lavabos y piezas originales ${nombreMarca}. Stock real de modelos antiguos (Victoria, Giralda, Dama...).`,
        keywords: [`repuestos ${nombreMarca}`, `inodoro ${nombreMarca} antiguo`, `tapa wc ${nombreMarca}`, `sanitarios descatalogados ${nombreMarca}`],
        openGraph: {
            title: `Catálogo ${nombreMarca} - Sanitarios Descatalogados`,
            description: `Recambios originales para sanitarios ${nombreMarca} antiguos.`,
            type: 'website',
        }
    };
}

export default async function MarcaPage({ params }: MarcaPageProps) {
    const { marca } = await params;
    const nombreMarca = normalizeMarca(marca);
    const productos = getProductosByMarca(nombreMarca);

    if (productos.length === 0) {
        notFound();
    }

    // Agrupar productos por categoría para mostrar resumen
    const categorias = [...new Set(productos.map(p => p.category))].sort();

    return (
        <main className={styles.pageContainer}>
            {/* Header SEO */}
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Repuestos {nombreMarca} Descatalogados</h1>
                </div>
                <span className={styles.resultCount}>{productos.length} Productos</span>
            </div>

            <p className={styles.brandDescription}>
                Catálogo especializado en piezas y sanitarios antiguos de la marca <strong>{nombreMarca}</strong>.
                Recuperamos modelos icónicos para que no tengas que reformar tu baño. Encuentra tapas, cisternas y mecanismos originales.
            </p>

            <div className={styles.categoriesList}>
                {categorias.map(cat => (
                    <Link
                        key={cat}
                        href={`/catalogo/${marca}/${cat}`}
                        className={styles.categoryPill}
                    >
                        {formatearNombre(cat)}
                    </Link>
                ))}
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
                            {producto.rarity > 3 && (
                                <span className={styles.rareBadge}>Muy Raro</span>
                            )}
                        </div>

                        {/* Info del producto */}
                        <div className={styles.content}>
                            <span className={styles.brand}>{producto.brand}</span>
                            <h2 className={styles.name}>{producto.name}</h2>
                            <span className={styles.resultCount}>{formatearNombre(producto.category)}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </main>
    );
}
