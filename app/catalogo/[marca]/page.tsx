import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { productosUnificados, getProductosByMarca, getProductosByCategoria } from '@/app/data/productosUnificados';
import styles from '../Catalog.module.css';

interface PageProps {
    params: Promise<{ marca: string }>; // 'marca' atrapa todo lo que sea /catalogo/[slug]
}

// Categorías soportadas (deben coincidir con las del JSON)
const VALID_CATEGORIES = ['inodoros', 'bidets', 'lavabos', 'mecanismos', 'tapas', 'complementos'];

function isCategory(slug: string): boolean {
    return VALID_CATEGORIES.includes(slug.toLowerCase());
}

// Slugs de marcas conocidas
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
    const marcasSlugs = marcas.map(marca => ({
        marca: marca.toLowerCase().replace(/ /g, '-').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    }));

    const categoriasSlugs = VALID_CATEGORIES.map(cat => ({
        marca: cat // El parámetro de la ruta es 'marca'
    }));

    return [...marcasSlugs, ...categoriasSlugs];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { marca: slug } = await params;

    // CASO CATEGORÍA
    if (isCategory(slug)) {
        const catName = formatearNombre(slug);
        return {
            title: `${catName} Descatalogados | Todas las Marcas | Consultar Stock`,
            description: `Catálogo completo de ${catName.toLowerCase()} descatalogados. Roca, Gala, Bellavista y más. Piezas originales y recambios difíciles de encontrar.`,
            openGraph: {
                title: `${catName} Antiguos y Descatalogados`,
                description: `Encuentra ${catName.toLowerCase()} de todas las marcas y épocas.`,
            },
        };
    }

    // CASO MARCA
    const nombreMarca = normalizeMarca(slug);
    return {
        title: `Repuestos ${nombreMarca} Antiguos y Descatalogados | Consultar Stock`,
        description: `¿Buscas sanitarios ${nombreMarca} descatalogados? Encuentra inodoros, lavabos y piezas originales ${nombreMarca}. Stock real de modelos antiguos.`,
        openGraph: {
            title: `Catálogo ${nombreMarca} - Sanitarios Descatalogados`,
            description: `Recambios originales para sanitarios ${nombreMarca} antiguos.`,
        }
    };
}

export default async function DynamicCatalogPage({ params }: PageProps) {
    const { marca: slug } = await params;

    // =========================================================================
    // LÓGICA CONDICIONAL: ¿Es Categoría o Marca?
    // =========================================================================

    // 1. SI ES CATEGORÍA (ej: /catalogo/inodoros)
    if (isCategory(slug)) {
        const productos = getProductosByCategoria(slug);
        const catName = formatearNombre(slug);

        // Agrupar por marcas para un sub-filtro rápido visual
        const marcasDisponibles = [...new Set(productos.map(p => p.brand))].sort();

        return (
            <main className={styles.pageContainer}>
                <div className={styles.header}>
                    <div>
                        <h1 className={styles.title}>{catName} Descatalogados</h1>
                        <p className={styles.subtitle}>Selección multimarca de piezas originales</p>
                    </div>
                    <span className={styles.resultCount}>{productos.length} Productos</span>
                </div>

                <div className={styles.categoriesList}>
                    {marcasDisponibles.map(m => (
                        <Link
                            key={m}
                            href={`/catalogo/${m.toLowerCase().replace(/ /g, '-')}?categoria=${slug}`}
                            className={styles.categoryPill}
                        >
                            {m}
                        </Link>
                    ))}
                </div>

                <ProductGrid productos={productos} />
            </main>
        );
    }

    // 2. SI ES MARCA (ej: /catalogo/roca)
    const nombreMarca = normalizeMarca(slug);
    const productos = getProductosByMarca(nombreMarca);

    if (productos.length === 0) {
        notFound();
    }

    const categorias = [...new Set(productos.map(p => p.category))].sort();

    return (
        <main className={styles.pageContainer}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Repuestos {nombreMarca} Descatalogados</h1>
                </div>
                <span className={styles.resultCount}>{productos.length} Productos</span>
            </div>

            <p className={styles.brandDescription}>
                Catálogo especializado en piezas y sanitarios antiguos de la marca <strong>{nombreMarca}</strong>.
                Recuperamos modelos icónicos para que no tengas que reformar tu baño.
            </p>

            <div className={styles.categoriesList}>
                {categorias.map(cat => (
                    <Link
                        key={cat}
                        href={`/catalogo/${slug}/${cat}`}
                        className={styles.categoryPill}
                    >
                        {formatearNombre(cat)}
                    </Link>
                ))}
            </div>

            <ProductGrid productos={productos} />
        </main>
    );
}

// Componente Helper para Grid
function ProductGrid({ productos }: { productos: any[] }) {
    return (
        <div className={styles.grid}>
            {productos.map((producto) => (
                <Link
                    href={`/catalogo/${producto.brand.toLowerCase().replace(/ /g, '-')}/${producto.category}/${producto.url.split('/').pop()?.replace('.html', '') || producto.id}`}
                    key={producto.id}
                    className={styles.card}
                >
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
                    <div className={styles.content}>
                        <span className={styles.brand}>{producto.brand}</span>
                        <h2 className={styles.name}>{producto.name}</h2>
                        <span className={styles.resultCount}>
                            {producto.category ? producto.category.charAt(0).toUpperCase() + producto.category.slice(1) : ''}
                        </span>
                    </div>
                </Link>
            ))}
        </div>
    );
}
