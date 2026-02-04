'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram, Facebook } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(footer,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footer,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, footer);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative z-[90] bg-primary-dark py-12 md:py-16"
    >
      {/* Divider */}
      <div className="hairline-light mx-[8vw] mb-12" />

      <div className="px-[8vw]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {/* Left - Brand */}
          <div className="text-white">
            <span className="label-mono text-xs block mb-3">
              SANITARIOS DESCATALOGADOS
            </span>
            <p className="text-white/60 text-sm">
              Piezas únicas. Historia real.
            </p>
          </div>

          {/* Center - Links */}
          <nav className="flex flex-wrap md:justify-center gap-6">
            <Link
              href="/catalogo"
              className="text-white/60 hover:text-white text-sm transition-colors"
            >
              Catálogo
            </Link>
            <a
              href="#nosotros"
              className="text-white/60 hover:text-white text-sm transition-colors"
            >
              Nosotros
            </a>
            <a
              href="#contacto"
              className="text-white/60 hover:text-white text-sm transition-colors"
            >
              Contacto
            </a>
            <a
              href="#"
              className="text-white/60 hover:text-white text-sm transition-colors"
            >
              Privacidad
            </a>
          </nav>

          {/* Right - Social */}
          <div className="flex md:justify-end items-start gap-4">
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center border border-white/30 hover:border-accent hover:bg-accent transition-all duration-300"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4 text-white" />
            </a>
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center border border-white/30 hover:border-accent hover:bg-accent transition-all duration-300"
              aria-label="Facebook"
            >
              <Facebook className="w-4 h-4 text-white" />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-white/40 text-xs text-center label-mono">
            © 2026 SANITARIOS DESCATALOGADOS. TODOS LOS DERECHOS RESERVADOS.
          </p>
        </div>
      </div>
    </footer>
  );
}
