'use client';

/**
 * =============================================================================
 * CATÁLOGO PRINCIPAL - Con soporte para filtros por URL
 * =============================================================================
 * 
 * Soporta parámetros de URL para SEO y redirecciones:
 * - ?marca=roca → Filtra por marca
 * - ?categoria=inodoros → Filtra por categoría
 * - ?q=texto → Búsqueda por texto
 * 
 * @route /catalogo
 */

import { Suspense, useState, useMemo, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { productosUnificados as products } from '../data/productosUnificados';
import styles from './Catalog.module.css';

/** Type for sorting options */
type SortOption = 'name' | 'rarity';

// Get unique values for filters
const brands = [...new Set(products.map(p => p.brand))].sort();
const categories = [...new Set(products.map(p => p.category))].sort();

/**
 * Normaliza una cadena para comparación (sin acentos, minúsculas)
 */
function normalizar(str: string): string {
    return str.toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/-/g, ' ')
        .trim();
}

/**
 * Mapea slugs de URL a valores de datos
 */
const MARCA_MAP: Record<string, string> = {
    'roca': 'ROCA',
    'gala': 'GALA',
    'bellavista': 'BELLAVISTA',
    'jacob-delafon': 'Jacob Delafon',
    'jacob delafon': 'Jacob Delafon',
    'sangra': 'Sangrá',
    'valadares': 'Valadares',
    'sanitana': 'Sanitana',
    'duravit': 'Duravit',
};

const CATEGORIA_MAP: Record<string, string> = {
    'inodoros': 'inodoros',
    'bidets': 'bidets',
    'lavabos': 'lavabos',
    'mamparas': 'mamparas',
    'accesorios': 'accesorios',
    'cisternas': 'cisternas',
    'tapas': 'tapas',
    'plato-ducha': 'plato-ducha',
};

function CatalogContent() {
    const searchParams = useSearchParams();
    const router = useRouter();

    // Leer parámetros de URL
    const urlQuery = searchParams.get('q')?.toLowerCase() || '';
    const urlMarca = searchParams.get('marca') || '';
    const urlCategoria = searchParams.get('categoria') || '';

    // Estado de filtros - inicializado desde URL
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [sortBy, setSortBy] = useState<SortOption>('name');
    const [initialized, setInitialized] = useState(false);

    // Inicializar filtros desde URL al montar
    useEffect(() => {
        if (!initialized) {
            // Mapear marca de URL a valor de datos
            if (urlMarca) {
                const marcaNorm = normalizar(urlMarca);
                const marcaMatch = MARCA_MAP[marcaNorm];
                if (marcaMatch) {
                    setSelectedBrand(marcaMatch);
                } else {
                    // Buscar por coincidencia parcial
                    const found = brands.find(b =>
                        normalizar(b).includes(marcaNorm) || marcaNorm.includes(normalizar(b))
                    );
                    if (found) setSelectedBrand(found);
                }
            }

            // Mapear categoría de URL a valor de datos
            if (urlCategoria) {
                const catNorm = normalizar(urlCategoria);
                const catMatch = CATEGORIA_MAP[catNorm];
                if (catMatch) {
                    setSelectedCategory(catMatch);
                } else {
                    const found = categories.find(c => normalizar(c) === catNorm);
                    if (found) setSelectedCategory(found);
                }
            }

            setInitialized(true);
        }
    }, [urlMarca, urlCategoria, initialized]);

    // Filtrar productos
    const filteredProducts = useMemo(() => {
        let result = products;

        // Filtro por búsqueda de texto
        if (urlQuery) {
            const queryTerms = urlQuery.toLowerCase().trim().split(/\s+/);
            result = result.filter(product => {
                const searchableText = `${product.name} ${product.brand} ${product.category}`.toLowerCase();
                // Todas las palabras de la búsqueda deben estar presentes en el producto
                return queryTerms.every(term => searchableText.includes(term));
            });
        }

        // Filtro por marca (del selector o URL)
        if (selectedBrand) {
            result = result.filter(p => p.brand === selectedBrand);
        }

        // Filtro por categoría (del selector o URL)
        if (selectedCategory) {
            result = result.filter(p => p.category === selectedCategory);
        }

        // Ordenar
        result = [...result].sort((a, b) => {
            switch (sortBy) {
                case 'rarity':
                    return b.rarity - a.rarity;
                default:
                    return a.name.localeCompare(b.name);
            }
        });

        return result;
    }, [urlQuery, selectedBrand, selectedCategory, sortBy]);

    const clearFilters = () => {
        setSelectedBrand('');
        setSelectedCategory('');
        setSortBy('name');
        router.push('/catalogo');
    };

    const hasActiveFilters = selectedBrand || selectedCategory || urlQuery;

    // Generar título dinámico
    const getTitle = () => {
        if (urlQuery) return `Resultados para "${urlQuery}"`;
        if (selectedBrand && selectedCategory) {
            return `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} ${selectedBrand}`;
        }
        if (selectedBrand) return `Catálogo ${selectedBrand}`;
        if (selectedCategory) return `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Descatalogados`;
        return 'Catálogo Completo';
    };

    return (
        <>
            <div className={styles.header}>
                <h1 className={styles.title}>{getTitle()}</h1>
                <p className={styles.resultCount}>
                    {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''}
                    {hasActiveFilters && ' encontrados'}
                </p>
            </div>

            {/* Navegación Visual por Categorías */}
            {!selectedCategory && !selectedBrand && !urlQuery && (
                <div style={{ marginBottom: '3rem' }}>
                    <h2 className={styles.subtitle} style={{ marginBottom: '1rem' }}>Explorar por Categoría</h2>
                    <div className={styles.categoriesList}>
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={styles.categoryPill}
                                style={{ cursor: 'pointer', border: 'none', fontSize: '1rem', padding: '0.8rem 1.5rem' }}
                            >
                                {cat.charAt(0).toUpperCase() + cat.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Filtros Activos / Navegación Secundaria */}
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginBottom: '2rem', alignItems: 'center', background: 'var(--color-surface)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                {/* Selector de Marca Integrado */}
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: 600, color: 'var(--color-text-muted)' }}>Marca:</span>
                    <div className={styles.categoriesList} style={{ margin: 0, gap: '0.5rem' }}>
                        <button
                            onClick={() => setSelectedBrand('')}
                            className={styles.categoryPill}
                            style={{
                                background: selectedBrand === '' ? 'var(--color-primary)' : 'transparent',
                                color: selectedBrand === '' ? 'white' : 'inherit',
                                borderColor: selectedBrand === '' ? 'var(--color-primary)' : 'var(--border-color)',
                                cursor: 'pointer'
                            }}
                        >
                            Todas
                        </button>
                        {brands.map(brand => (
                            <button
                                key={brand}
                                onClick={() => setSelectedBrand(brand)}
                                className={styles.categoryPill}
                                style={{
                                    background: selectedBrand === brand ? 'var(--color-primary)' : 'transparent',
                                    color: selectedBrand === brand ? 'white' : 'inherit',
                                    borderColor: selectedBrand === brand ? 'var(--color-primary)' : 'var(--border-color)',
                                    cursor: 'pointer'
                                }}
                            >
                                {brand}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Reset si hay filtros */}
                {(selectedCategory || selectedBrand || urlQuery) && (
                    <button
                        onClick={clearFilters}
                        style={{
                            marginLeft: 'auto',
                            color: 'var(--color-primary)',
                            fontWeight: 600,
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            textDecoration: 'underline'
                        }}
                    >
                        Limpiar Filtros ✕
                    </button>
                )}
            </div>

            {/* Selector de Categorías (si ya se filtró por algo, para permitir cambiar rápido) */}
            {(selectedCategory || selectedBrand) && (
                <div style={{ marginBottom: '2rem' }}>
                    <div className={styles.categoriesList} style={{ gap: '0.5rem' }}>
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(selectedCategory === cat ? '' : cat)}
                                className={styles.categoryPill}
                                style={{
                                    background: selectedCategory === cat ? 'var(--color-surface-alt)' : 'transparent',
                                    borderColor: selectedCategory === cat ? 'var(--color-text-muted)' : '',
                                    opacity: selectedCategory && selectedCategory !== cat ? 0.6 : 1,
                                    cursor: 'pointer'
                                }}
                            >
                                {cat.charAt(0).toUpperCase() + cat.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {filteredProducts.length > 0 ? (
                <div className={styles.grid}>
                    {filteredProducts.map(product => (
                        <a key={product.id} href={product.url} className={styles.card}>
                            <div className={styles.imageWrapper}>
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    width={260}
                                    height={200}
                                    className={styles.productImage}
                                    unoptimized
                                />
                                {product.rarity >= 4 && (
                                    <span className={styles.rareBadge}>Difícil de encontrar</span>
                                )}
                            </div>
                            <div className={styles.content}>
                                <span className={styles.brand}>{product.brand}</span>
                                <h3 className={styles.name}>{product.name}</h3>
                                {product.periodo && (
                                    <span className={styles.periodo}>{product.periodo}</span>
                                )}
                                <div className={styles.cardFooter}>
                                    <span className={styles.viewBtn}>Ver detalles →</span>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            ) : (
                <div className={styles.emptyState}>
                    <p className={styles.emptyText}>
                        No se encontraron productos que coincidan con tu búsqueda.
                    </p>
                    <button onClick={clearFilters} className={styles.emptyBtn}>
                        Ver todo el catálogo
                    </button>
                </div>
            )}
        </>
    );
}

export default function CatalogoPage() {
    return (
        <main className={styles.pageContainer}>
            <Suspense fallback={<div className={styles.loading}>Cargando catálogo...</div>}>
                <CatalogContent />
            </Suspense>
        </main>
    );
}
