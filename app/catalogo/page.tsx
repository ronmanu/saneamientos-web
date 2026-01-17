'use client';

import { Suspense, useState, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { products } from '../data/products';
import styles from './page.module.css';

/** Type for sorting options */
type SortOption = 'name' | 'price-asc' | 'price-desc' | 'rarity';

// Get unique values for filters
const brands = [...new Set(products.map(p => p.brand))].sort();
const categories = [...new Set(products.map(p => p.category))].sort();

function CatalogContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const query = searchParams.get('q')?.toLowerCase() || '';

    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [sortBy, setSortBy] = useState<SortOption>('name');

    const filteredProducts = useMemo(() => {
        let result = products.filter(product =>
            product.name.toLowerCase().includes(query) ||
            product.brand.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query)
        );

        if (selectedBrand) {
            result = result.filter(p => p.brand === selectedBrand);
        }

        if (selectedCategory) {
            result = result.filter(p => p.category === selectedCategory);
        }

        // Sort
        result = [...result].sort((a, b) => {
            switch (sortBy) {
                case 'price-asc':
                    return a.price - b.price;
                case 'price-desc':
                    return b.price - a.price;
                case 'rarity':
                    return b.rarity - a.rarity;
                default:
                    return a.name.localeCompare(b.name);
            }
        });

        return result;
    }, [query, selectedBrand, selectedCategory, sortBy]);

    const clearFilters = () => {
        setSelectedBrand('');
        setSelectedCategory('');
        setSortBy('name');
        router.push('/catalogo');
    };

    const hasActiveFilters = selectedBrand || selectedCategory || query;

    return (
        <>
            <div className={styles.header}>
                <h1 className={styles.title}>
                    {query ? `Resultados para "${query}"` : 'Catálogo Completo'}
                </h1>
                <p className={styles.resultCount}>
                    {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''}
                </p>
            </div>

            {/* Filters Bar */}
            <div className={styles.filtersBar}>
                <div className={styles.filterGroup}>
                    <label htmlFor="brand-filter">Marca</label>
                    <select
                        id="brand-filter"
                        value={selectedBrand}
                        onChange={(e) => setSelectedBrand(e.target.value)}
                        className={styles.filterSelect}
                    >
                        <option value="">Todas las marcas</option>
                        {brands.map(brand => (
                            <option key={brand} value={brand}>{brand}</option>
                        ))}
                    </select>
                </div>

                <div className={styles.filterGroup}>
                    <label htmlFor="category-filter">Categoría</label>
                    <select
                        id="category-filter"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className={styles.filterSelect}
                    >
                        <option value="">Todas las categorías</option>
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                        ))}
                    </select>
                </div>

                <div className={styles.filterGroup}>
                    <label htmlFor="sort-filter">Ordenar por</label>
                    <select
                        id="sort-filter"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as SortOption)}
                        className={styles.filterSelect}
                    >
                        <option value="name">Nombre A-Z</option>
                        <option value="price-asc">Precio: menor a mayor</option>
                        <option value="price-desc">Precio: mayor a menor</option>
                        <option value="rarity">Rareza (difícil primero)</option>
                    </select>
                </div>

                {hasActiveFilters && (
                    <button onClick={clearFilters} className={styles.clearBtn}>
                        Limpiar filtros
                    </button>
                )}
            </div>

            {filteredProducts.length > 0 ? (
                <div className={styles.grid}>
                    {filteredProducts.map(product => (
                        <a key={product.id} href={`/producto/${product.id}`} className={styles.card}>
                            <div className={styles.imageWrapper}>
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    width={260}
                                    height={200}
                                    className={styles.productImage}
                                />
                                {product.rarity >= 4 && (
                                    <span className={styles.rareBadge}>Difícil de encontrar</span>
                                )}
                            </div>
                            <div className={styles.content}>
                                <span className={styles.brand}>{product.brand}</span>
                                <h3 className={styles.name}>{product.name}</h3>
                                <div className={styles.cardFooter}>
                                    <p className={styles.price}>{product.price}€</p>
                                    <span className={styles.viewBtn}>Ver →</span>
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
