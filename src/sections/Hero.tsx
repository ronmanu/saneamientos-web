'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const microRef = useRef<HTMLParagraphElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    const headline = headlineRef.current;
    const subhead = subheadRef.current;
    const cta = ctaRef.current;
    const micro = microRef.current;
    const scrollHint = scrollHintRef.current;
    const wordmark = wordmarkRef.current;
    const nav = navRef.current;

    if (!section || !bg || !headline || !subhead || !cta || !micro || !scrollHint || !wordmark || !nav) return;

    const ctx = gsap.context(() => {
      // Initial load animation
      const loadTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Background fade in with scale
      loadTl.fromTo(bg,
        { opacity: 0, scale: 1.06 },
        { opacity: 1, scale: 1, duration: 1.2 }
      );

      // Wordmark
      loadTl.fromTo(wordmark,
        { y: -12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        0.2
      );

      // Nav
      loadTl.fromTo(nav,
        { y: -12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        0.35
      );

      // Headline words stagger
      const words = headline.querySelectorAll('.word');
      loadTl.fromTo(words,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.06 },
        0.5
      );

      // Subheadline
      loadTl.fromTo(subhead,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        0.75
      );

      // CTA
      loadTl.fromTo(cta,
        { scale: 0.96, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.55 },
        0.95
      );

      // Bottom elements
      loadTl.fromTo([micro, scrollHint],
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        1.1
      );

      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset all elements to visible when scrolling back
            gsap.set([wordmark, nav, headline, subhead, cta, micro, scrollHint], {
              opacity: 1, y: 0, scale: 1
            });
            gsap.set(bg, { scale: 1, y: 0 });
          }
        }
      });

      // EXIT phase (70%-100%)
      scrollTl.fromTo(headline,
        { y: 0, opacity: 1 },
        { y: '-18vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(subhead,
        { y: 0, opacity: 1 },
        { y: '-14vh', opacity: 0, ease: 'power2.in' },
        0.72
      );

      scrollTl.fromTo(cta,
        { y: 0, opacity: 1 },
        { y: '-10vh', opacity: 0, ease: 'power2.in' },
        0.74
      );

      scrollTl.fromTo([micro, scrollHint],
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.75
      );

      scrollTl.fromTo(bg,
        { scale: 1, y: 0 },
        { scale: 1.08, y: '-3vh', ease: 'none' },
        0.7
      );

    }, section);

    return () => ctx.revert();
  }, []);

  // Navigation is now handled by Next.js Link

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="section-pinned z-10"
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-[1] will-change-transform"
      >
        <img
          src="/hero_bathroom.jpg"
          alt="Baño vintage"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Frame padding container */}
      <div className="relative z-[3] frame-padding h-full flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-start">
          {/* Wordmark */}
          <div ref={wordmarkRef} className="text-white">
            <span className="label-mono text-[11px] md:text-xs">
              SANITARIOS DESCATALOGADOS
            </span>
          </div>

          {/* Navigation */}
          <nav ref={navRef} className="hidden md:flex gap-8">
            <Link
              href="/catalogo"
              className="text-white/80 hover:text-white text-[13px] transition-colors"
            >
              Catálogo
            </Link>
            <a
              href="#nosotros"
              className="text-white/80 hover:text-white text-[13px] transition-colors"
            >
              Nosotros
            </a>
            <a
              href="#contacto"
              className="text-white/80 hover:text-white text-[13px] transition-colors"
            >
              Contacto
            </a>
          </nav>
        </header>

        {/* Main Content - Centered */}
        <div className="flex-1 flex flex-col items-center justify-center text-center text-white">
          <h1
            ref={headlineRef}
            className="heading-display text-[clamp(44px,6.2vw,96px)] mb-6"
          >
            <span className="word inline-block">PIEZAS</span>{' '}
            <span className="word inline-block">ÚNICAS</span>
          </h1>

          <p
            ref={subheadRef}
            className="text-lg md:text-xl text-white/90 max-w-xl mb-10"
          >
            Sanitarios descatalogados de los 60 a los 2000.
          </p>

          <Link
            ref={ctaRef}
            href="/catalogo"
            className="inline-flex items-center justify-center px-8 py-4 bg-[#F4F2EE] text-[#0B0B0C] text-xs font-medium uppercase tracking-widest border border-[#0B0B0C] hover:bg-[#0B0B0C] hover:text-[#F4F2EE] transition-all duration-300"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            Ver catálogo
          </Link>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-end text-white/70">
          <p ref={microRef} className="text-sm">
            Especialistas en recuperar lo esencial.
          </p>

          <div ref={scrollHintRef} className="flex items-center gap-2 text-sm">
            <span>Desplaza</span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
