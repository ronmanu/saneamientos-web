'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Quality() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const microRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    const label = labelRef.current;
    const line1 = line1Ref.current;
    const line2 = line2Ref.current;
    const cta = ctaRef.current;
    const micro = microRef.current;

    if (!section || !bg || !label || !line1 || !line2 || !cta || !micro) return;

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
        { scale: 1.14, opacity: 0.65 },
        { scale: 1.00, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(label,
        { y: '-5vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(line1,
        { y: '12vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.05
      );

      scrollTl.fromTo(line2,
        { y: '12vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.1
      );

      scrollTl.fromTo(cta,
        { y: '8vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.15
      );

      scrollTl.fromTo(micro,
        { opacity: 0 },
        { opacity: 1, ease: 'none' },
        0.2
      );

      // EXIT (70%-100%)
      scrollTl.fromTo([line1, line2],
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
        { scale: 1.00 },
        { scale: 1.06, ease: 'none' },
        0.7
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-pinned z-50"
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-[1] will-change-transform"
      >
        <img
          src="/quality_architecture.jpg"
          alt="Calidad arquitectónica"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-[3] frame-padding h-full flex flex-col items-center justify-center text-center text-white">
        <span
          ref={labelRef}
          className="label-mono text-white/80 mb-8"
        >
          CALIDAD
        </span>

        <h2 className="heading-display text-[clamp(34px,5vw,80px)] mb-10">
          <span ref={line1Ref} className="block">HECHO PARA DURAR</span>
          <span ref={line2Ref} className="block">DÉCADAS</span>
        </h2>

        <button
          ref={ctaRef}
          className="btn-editorial-primary"
          onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Ver garantía y estado
        </button>

        <p
          ref={microRef}
          className="absolute bottom-[4vh] right-[4vw] text-white/70 text-sm"
        >
          Revisado. Limpio. Listo para instalar.
        </p>
      </div>
    </section>
  );
}
