'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { products, filterOptions } from '@/data/products';
import type { Product } from '@/types';
import { Filter, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Catalog() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const [activeFilters, setActiveFilters] = useState<{
    type: string | null;
    decade: string | null;
    brand: string | null;
  }>({
    type: null,
    decade: null,
    brand: null
  });

  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  useEffect(() => {
    const filtered = products.filter(product => {
      const matchType = !activeFilters.type || product.type === activeFilters.type;
      const matchDecade = !activeFilters.decade || product.decade === activeFilters.decade;
      const matchBrand = !activeFilters.brand || product.brand === activeFilters.brand;
      return matchType && matchDecade && matchBrand;
    });
    setFilteredProducts(filtered);
  }, [activeFilters]);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const filters = filtersRef.current;
    const grid = gridRef.current;

    if (!section || !title || !filters || !grid) return;

    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(title,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: title,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Filters animation
      gsap.fromTo(filters,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: filters,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Cards stagger animation
      const cards = grid.querySelectorAll('.product-card');
      gsap.fromTo(cards,
        { y: 60, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: grid,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      );

    }, section);

    return () => ctx.revert();
  }, [filteredProducts]);

  const toggleFilter = (category: 'type' | 'decade' | 'brand', value: string) => {
    setActiveFilters(prev => ({
      ...prev,
      [category]: prev[category] === value ? null : value
    }));
  };

  const clearFilters = () => {
    setActiveFilters({ type: null, decade: null, brand: null });
  };

  const hasActiveFilters = activeFilters.type || activeFilters.decade || activeFilters.brand;

  return (
    <section
      ref={sectionRef}
      id="catalogo"
      className="relative z-40 bg-primary-light py-20 md:py-32"
    >
      <div className="px-[8vw]">
        {/* Title */}
        <div ref={titleRef} className="mb-10">
          <h2 className="heading-display text-[clamp(34px,4.2vw,72px)] text-[#0B0B0C] mb-4">
            Catálogo
          </h2>
          <p className="text-secondary-muted text-lg max-w-xl">
            Lavabos, inodoros, cisternas, bidets y tapas.
          </p>
        </div>

        {/* Filters */}
        <div ref={filtersRef} className="mb-12">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <div className="flex items-center gap-2 text-secondary-muted">
              <Filter className="w-4 h-4" />
              <span className="label-mono text-xs">FILTRAR POR:</span>
            </div>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 text-accent text-sm hover:underline"
              >
                <X className="w-3 h-3" />
                Limpiar filtros
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-6">
            {/* Type filter */}
            <div className="flex flex-wrap gap-2">
              <span className="label-mono text-xs text-secondary-muted mr-2">TIPO</span>
              {filterOptions.types.map(option => (
                <button
                  key={option.value}
                  onClick={() => toggleFilter('type', option.value)}
                  className={`px-3 py-1.5 text-xs transition-all duration-200 ${activeFilters.type === option.value
                      ? 'bg-[#0B0B0C] text-white'
                      : 'bg-transparent text-[#0B0B0C] hover:bg-[#0B0B0C]/10'
                    }`}
                  style={{ fontFamily: 'IBM Plex Mono, monospace', letterSpacing: '0.1em' }}
                >
                  {option.label}
                </button>
              ))}
            </div>

            {/* Decade filter */}
            <div className="flex flex-wrap gap-2">
              <span className="label-mono text-xs text-secondary-muted mr-2">DÉCADA</span>
              {filterOptions.decades.map(option => (
                <button
                  key={option.value}
                  onClick={() => toggleFilter('decade', option.value)}
                  className={`px-3 py-1.5 text-xs transition-all duration-200 ${activeFilters.decade === option.value
                      ? 'bg-[#0B0B0C] text-white'
                      : 'bg-transparent text-[#0B0B0C] hover:bg-[#0B0B0C]/10'
                    }`}
                  style={{ fontFamily: 'IBM Plex Mono, monospace', letterSpacing: '0.1em' }}
                >
                  {option.label}
                </button>
              ))}
            </div>

            {/* Brand filter */}
            <div className="flex flex-wrap gap-2">
              <span className="label-mono text-xs text-secondary-muted mr-2">MARCA</span>
              {filterOptions.brands.map(option => (
                <button
                  key={option.value}
                  onClick={() => toggleFilter('brand', option.value)}
                  className={`px-3 py-1.5 text-xs transition-all duration-200 ${activeFilters.brand === option.value
                      ? 'bg-[#0B0B0C] text-white'
                      : 'bg-transparent text-[#0B0B0C] hover:bg-[#0B0B0C]/10'
                    }`}
                  style={{ fontFamily: 'IBM Plex Mono, monospace', letterSpacing: '0.1em' }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[3vw] gap-y-12"
        >
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="product-card group cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden mb-4 bg-[#e8e6e2]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>

              {/* Product Info */}
              <div className="space-y-2">
                <h3 className="text-[#0B0B0C] font-medium text-lg group-hover:text-accent transition-colors">
                  {product.name}
                </h3>
                <div className="flex items-center gap-3">
                  <span className="label-mono text-xs text-secondary-muted">
                    {product.decade === '60s' ? 'Años 60' :
                      product.decade === '70s' ? 'Años 70' :
                        product.decade === '80s' ? 'Años 80' :
                          product.decade === '90s' ? 'Años 90' :
                            product.decade === '2000s' ? 'Años 2000' : 'Años 2010'}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-secondary-muted" />
                  <span className="label-mono text-xs text-secondary-muted">
                    {product.brand}
                  </span>
                </div>
                <p className="text-secondary-muted text-sm line-clamp-2">
                  {product.description}
                </p>

                {product.specs && (
                  <div className="pt-3 border-t border-[#0B0B0C]/10 mt-3 space-y-1.5">
                    {product.specs.holeDistance && (
                      <div className="flex justify-between items-center text-xs">
                        <span className="label-mono text-secondary-muted uppercase tracking-wider">Distancia</span>
                        <span className="font-medium text-[#0B0B0C]">{product.specs.holeDistance} cm</span>
                      </div>
                    )}
                    {product.specs.width && product.specs.length && (
                      <div className="flex justify-between items-center text-xs">
                        <span className="label-mono text-secondary-muted uppercase tracking-wider">Medidas</span>
                        <span className="font-medium text-[#0B0B0C]">{product.specs.width} x {product.specs.length} cm</span>
                      </div>
                    )}
                    {product.specs.compatibilityGroup && (
                      <div className="flex justify-between items-center text-xs">
                        <span className="label-mono text-secondary-muted uppercase tracking-wider">Grupo</span>
                        <span className="font-medium text-[#0B0B0C]">{product.specs.compatibilityGroup}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Hover underline */}
                <div className="h-[1px] bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-secondary-muted text-lg">
              No hay productos que coincidan con los filtros seleccionados.
            </p>
            <button
              onClick={clearFilters}
              className="mt-4 text-accent hover:underline"
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
