'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const categories = [
    {
        id: 'inodoro',
        name: 'Inodoros',
        description: 'Inodoros clásicos de todas las décadas',
        image: '/images/categories/inodoros.png',
        fallback: '/product_inodoro_01.jpg',
        count: 150
    },
    {
        id: 'lavabo',
        name: 'Lavabos',
        description: 'Lavabos con pedestal y encimera',
        image: '/images/categories/lavabos.png',
        fallback: '/product_lavabo_01.jpg',
        count: 80
    },
    {
        id: 'bidet',
        name: 'Bidés',
        description: 'Bidés a juego con series completas',
        image: '/images/categories/bidets.png',
        fallback: '/product_bidet_01.jpg',
        count: 60
    },
    {
        id: 'tapa',
        name: 'Tapas y Asientos',
        description: 'Tapas compatibles con modelos descatalogados',
        image: '/images/categories/tapas.png',
        fallback: '/product_tapa_01.jpg',
        count: 100
    },
    {
        id: 'cisterna',
        name: 'Cisternas',
        description: 'Cisternas y mecanismos de repuesto',
        image: '/images/categories/cisternas.png',
        fallback: '/product_cisterna_01.jpg',
        count: 40
    },
    {
        id: 'plato-ducha',
        name: 'Platos de Ducha',
        description: 'Platos porcelánicos vintage',
        image: '/images/categories/platos.png',
        fallback: '/detail_texture.jpg',
        count: 30
    },
];

export default function CatalogLanding() {
    const gridRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const grid = gridRef.current;
        const header = headerRef.current;
        if (!grid || !header) return;

        const ctx = gsap.context(() => {
            // Header animation
            gsap.fromTo(header,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
            );

            // Cards stagger
            const cards = grid.querySelectorAll('.category-card');
            gsap.fromTo(cards,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: 'power3.out',
                    delay: 0.3
                }
            );
        });

        return () => ctx.revert();
    }, []);

    return (
        <div className="min-h-screen bg-[#F4F2EE] py-16 px-[6vw]">
            {/* Header */}
            <div ref={headerRef} className="text-center mb-16">
                <Link href="/" className="label-mono text-xs text-[#6E6A63] hover:text-[#0B0B0C] transition-colors mb-6 inline-block">
                    ← VOLVER AL INICIO
                </Link>
                <h1 className="heading-display text-[clamp(32px,4.5vw,64px)] text-[#0B0B0C] mb-4">
                    CATÁLOGO
                </h1>
                <p className="text-[#6E6A63] text-lg max-w-xl mx-auto">
                    Explora nuestra colección de sanitarios descatalogados por categoría
                </p>
            </div>

            {/* Categories Grid */}
            <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {categories.map((category) => (
                    <Link
                        key={category.id}
                        href={`/catalogo/${category.id}`}
                        className="category-card group relative overflow-hidden bg-[#0B0B0C] aspect-[4/3] flex flex-col justify-end p-6 transition-all duration-300 hover:shadow-xl"
                    >
                        {/* Background Image */}
                        <img
                            src={category.image}
                            alt={category.name}
                            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-70 group-hover:scale-105 transition-all duration-500"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = category.fallback;
                            }}
                        />
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />

                        {/* Content */}
                        <div className="relative z-20">
                            <span className="label-mono text-xs text-white/70 mb-2 block">
                                {category.count}+ PIEZAS
                            </span>
                            <h2 className="text-2xl font-display text-white mb-1 group-hover:text-[#D96C4A] transition-colors">
                                {category.name}
                            </h2>
                            <p className="text-white/70 text-sm">
                                {category.description}
                            </p>
                        </div>

                        {/* Hover arrow */}
                        <div className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center border border-white/30 opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-white text-lg">→</span>
                        </div>
                    </Link>
                ))}
            </div>

            {/* View All Link */}
            <div className="text-center mt-12">
                <Link
                    href="/catalogo/todos"
                    className="inline-flex items-center justify-center px-8 py-4 bg-[#0B0B0C] text-white text-xs font-medium uppercase tracking-widest hover:bg-[#D96C4A] transition-all duration-300"
                    style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                >
                    Ver todo el catálogo
                </Link>
            </div>
        </div>
    );
}
