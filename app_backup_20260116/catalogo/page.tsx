'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { products } from '../data/products';
import styles from './page.module.css';

function CatalogContent() {
    const searchParams = useSearchParams();
    const query = searchParams.get('q')?.toLowerCase() || '';

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
    );

    return (
        <>
            <h1 style={{ marginBottom: '2rem', fontSize: '2.5rem', color: 'var(--color-primary)' }}>
                {query ? `Resultados para "${query}"` : 'Catálogo Completo'}
            </h1>

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
                <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                    <p style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)' }}>
                        No se encontraron productos que coincidan con tu búsqueda.
                    </p>
                    <a href="/catalogo" className="btn-primary" style={{ display: 'inline-block', marginTop: '2rem' }}>
                        Ver todo el catálogo
                    </a>
                </div>
            )}
        </>
    );
}

export default function CatalogoPage() {
    return (
        <main className="container" style={{ padding: '8rem 2rem 4rem' }}>
            <Suspense fallback={<div>Cargando catálogo...</div>}>
                <CatalogContent />
            </Suspense>
        </main>
    );
}
