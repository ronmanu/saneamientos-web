'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { gsap } from 'gsap';
import { products, filterOptions } from '@/data/products';
import type { Product } from '@/types';
import { ArrowLeft, Filter, X } from 'lucide-react';

const categoryNames: Record<string, string> = {
    'inodoro': 'Inodoros',
    'lavabo': 'Lavabos',
    'bidet': 'Bidés',
    'tapa': 'Tapas y Asientos',
    'asiento': 'Tapas y Asientos',
    'cisterna': 'Cisternas',
    'plato-ducha': 'Platos de Ducha',
    'mampara': 'Mamparas',
    'accesorio': 'Accesorios',
    'todos': 'Todos los Productos'
};

export default function CategoryPage() {
    const params = useParams();
    const category = params.category as string;

    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [brandFilter, setBrandFilter] = useState<string | null>(null);
    const [decadeFilter, setDecadeFilter] = useState<string | null>(null);
    const [showFilters, setShowFilters] = useState(false);
    const [visibleCount, setVisibleCount] = useState(24);

    const gridRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let filtered = products;

        // Filter by category (unless "todos")
        if (category !== 'todos') {
            filtered = filtered.filter(p => p.type === category || (category === 'tapa' && p.type === 'asiento'));
        }

        // Apply brand filter
        if (brandFilter) {
            filtered = filtered.filter(p => p.brand === brandFilter);
        }

        // Apply decade filter
        if (decadeFilter) {
            filtered = filtered.filter(p => p.decade === decadeFilter);
        }

        setFilteredProducts(filtered);
        setVisibleCount(24); // Reset pagination when filters change
    }, [category, brandFilter, decadeFilter]);

    useEffect(() => {
        const header = headerRef.current;
        if (!header) return;

        gsap.fromTo(header,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
        );
    }, []);

    useEffect(() => {
        const grid = gridRef.current;
        if (!grid) return;

        const cards = grid.querySelectorAll('.product-card');
        gsap.fromTo(cards,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.4, stagger: 0.03, ease: 'power3.out' }
        );
    }, [filteredProducts, visibleCount]);

    const loadMore = () => {
        setVisibleCount(prev => prev + 24);
    };

    const clearFilters = () => {
        setBrandFilter(null);
        setDecadeFilter(null);
    };

    const visibleProducts = filteredProducts.slice(0, visibleCount);
    const hasMore = visibleCount < filteredProducts.length;
    const categoryTitle = categoryNames[category] || 'Productos';

    return (
        <div className="min-h-screen bg-[#F4F2EE]">
            {/* Header */}
            <div ref={headerRef} className="py-8 px-[6vw] border-b border-[#0B0B0C]/10">
                <div className="flex items-center justify-between">
                    <div>
                        <Link
                            href="/catalogo"
                            className="label-mono text-xs text-[#6E6A63] hover:text-[#0B0B0C] transition-colors mb-2 inline-flex items-center gap-2"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            CATEGORÍAS
                        </Link>
                        <h1 className="heading-display text-[clamp(28px,3.5vw,48px)] text-[#0B0B0C]">
                            {categoryTitle}
                        </h1>
                        <p className="text-[#6E6A63] text-sm mt-1">
                            {filteredProducts.length} productos encontrados
                        </p>
                    </div>

                    {/* Filter Toggle */}
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center gap-2 px-4 py-2 border border-[#0B0B0C]/20 hover:border-[#0B0B0C] transition-colors"
                    >
                        <Filter className="w-4 h-4" />
                        <span className="label-mono text-xs">FILTROS</span>
                        {(brandFilter || decadeFilter) && (
                            <span className="w-2 h-2 bg-[#D96C4A] rounded-full" />
                        )}
                    </button>
                </div>

                {/* Filters Panel */}
                {showFilters && (
                    <div className="mt-6 pt-6 border-t border-[#0B0B0C]/10">
                        <div className="flex flex-wrap gap-6">
                            {/* Brand Filter */}
                            <div>
                                <label className="label-mono text-xs text-[#6E6A63] block mb-2">MARCA</label>
                                <select
                                    value={brandFilter || ''}
                                    onChange={(e) => setBrandFilter(e.target.value || null)}
                                    className="bg-white border border-[#0B0B0C]/20 px-4 py-2 text-sm min-w-[150px]"
                                >
                                    <option value="">Todas</option>
                                    {filterOptions.brands.map(b => (
                                        <option key={b.value} value={b.value}>{b.label}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Decade Filter */}
                            <div>
                                <label className="label-mono text-xs text-[#6E6A63] block mb-2">DÉCADA</label>
                                <select
                                    value={decadeFilter || ''}
                                    onChange={(e) => setDecadeFilter(e.target.value || null)}
                                    className="bg-white border border-[#0B0B0C]/20 px-4 py-2 text-sm min-w-[150px]"
                                >
                                    <option value="">Todas</option>
                                    {filterOptions.decades.map(d => (
                                        <option key={d.value} value={d.value}>{d.label}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Clear Filters */}
                            {(brandFilter || decadeFilter) && (
                                <button
                                    onClick={clearFilters}
                                    className="self-end flex items-center gap-2 text-[#D96C4A] hover:text-[#c25e3e] text-sm"
                                >
                                    <X className="w-4 h-4" />
                                    Limpiar filtros
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Products Grid */}
            <div ref={gridRef} className="px-[6vw] py-12">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {visibleProducts.map((product) => (
                        <Link
                            key={product.id}
                            href={`/producto/${product.id}`}
                            className="product-card group bg-white overflow-hidden transition-all duration-300 hover:shadow-lg"
                        >
                            {/* Image */}
                            <div className="aspect-square bg-[#e8e6e2] overflow-hidden">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-contain p-4"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = '/product_inodoro_01.jpg';
                                    }}
                                />
                            </div>

                            {/* Info */}
                            <div className="p-4">
                                <span className="label-mono text-[10px] text-[#6E6A63]">
                                    {product.brand} · {product.decade}
                                </span>
                                <h3 className="text-sm font-medium text-[#0B0B0C] mt-1 group-hover:text-[#D96C4A] transition-colors line-clamp-2">
                                    {product.name}
                                </h3>
                                {product.specs?.width && product.specs?.length && (
                                    <p className="text-xs text-[#6E6A63] mt-1">
                                        {product.specs.width} × {product.specs.length} cm
                                    </p>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Load More */}
                {hasMore && (
                    <div className="text-center mt-12">
                        <button
                            onClick={loadMore}
                            className="btn-editorial-primary"
                        >
                            Cargar más ({filteredProducts.length - visibleCount} restantes)
                        </button>
                    </div>
                )}

                {/* Empty State */}
                {filteredProducts.length === 0 && (
                    <div className="text-center py-16">
                        <p className="text-[#6E6A63] text-lg mb-4">No se encontraron productos</p>
                        <button onClick={clearFilters} className="btn-editorial-primary">
                            Limpiar filtros
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
