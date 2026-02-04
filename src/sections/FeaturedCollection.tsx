'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedCollection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const microRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    const label = labelRef.current;
    const headline = headlineRef.current;
    const cta = ctaRef.current;
    const micro = microRef.current;

    if (!section || !bg || !label || !headline || !cta || !micro) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      // ENTRANCE (0%-30%)
      scrollTl.fromTo(bg,
        { scale: 1.10, x: '6vw', opacity: 0.6 },
        { scale: 1.00, x: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(label,
        { y: '-6vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(headline,
        { y: '10vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.05
      );

      scrollTl.fromTo(cta,
        { y: '8vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.1
      );

      scrollTl.fromTo(micro,
        { opacity: 0 },
        { opacity: 1, ease: 'none' },
        0.15
      );

      // SETTLE (30%-70%) - static

      // EXIT (70%-100%)
      scrollTl.fromTo(headline,
        { y: 0, opacity: 1 },
        { y: '-14vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(cta,
        { y: 0, opacity: 1 },
        { y: '-10vh', opacity: 0, ease: 'power2.in' },
        0.72
      );

      scrollTl.fromTo(label,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.75
      );

      scrollTl.fromTo(micro,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.75
      );

      scrollTl.fromTo(bg,
        { scale: 1.00, y: 0 },
        { scale: 1.06, y: '-2vh', ease: 'none' },
        0.7
      );

    }, section);

    return () => ctx.revert();
  }, []);

  // Navigation is now handled by Next.js Link

  return (
    <section
      ref={sectionRef}
      className="section-pinned z-20"
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-[1] will-change-transform"
      >
        <img
          src="/collection_stilllife.jpg"
          alt="Colección destacada"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/35" />
      </div>

      {/* Content */}
      <div className="relative z-[3] frame-padding h-full flex flex-col items-center justify-center text-center text-white">
        <span
          ref={labelRef}
          className="label-mono text-white/80 mb-8"
        >
          COLECCIÓN DESTACADA
        </span>

        <h2
          ref={headlineRef}
          className="heading-display text-[clamp(34px,5vw,80px)] mb-10"
        >
          LORENTINA / LUCERNA
        </h2>

        <Link
          ref={ctaRef}
          href="/catalogo/todos?buscar=lorentina"
          className="inline-flex items-center justify-center px-8 py-4 bg-[#F4F2EE] text-[#0B0B0C] text-xs font-medium uppercase tracking-widest border border-[#0B0B0C] hover:bg-[#0B0B0C] hover:text-[#F4F2EE] transition-all duration-300"
          style={{ fontFamily: "'IBM Plex Mono', monospace" }}
        >
          Explorar la colección
        </Link>

        <p
          ref={microRef}
          className="absolute bottom-[4vh] right-[4vw] text-white/70 text-sm"
        >
          Disponibilidad limitada.
        </p>
      </div>
    </section>
  );
}
