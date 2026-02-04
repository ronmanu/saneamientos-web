'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clock, Award, Users, Wrench } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { icon: Clock, value: '30+', label: 'Años de experiencia' },
  { icon: Award, value: '10.000+', label: 'Piezas recuperadas' },
  { icon: Users, value: '20.000+', label: 'Clientes satisfechos' },
  { icon: Wrench, value: '100%', label: 'Compromiso' },
];

export default function History() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;

    if (!section || !content) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(content.querySelectorAll('.animate-in'),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-[#0B0B0C] text-white"
    >
      <div ref={contentRef} className="max-w-6xl mx-auto px-[6vw]">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="animate-in label-mono text-xs text-white/60 mb-4 block">
            NUESTRA HISTORIA
          </span>
          <h2 className="animate-in heading-display text-[clamp(32px,4.5vw,56px)] mb-6">
            MÁS DE TRES DÉCADAS<br />RECUPERANDO LO ESENCIAL
          </h2>
          <p className="animate-in text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
            Desde 1992, nos dedicamos a localizar y preservar piezas de sanitarios
            descatalogados. Lo que empezó como una pequeña colección personal se ha
            convertido en el mayor almacén especializado de España.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="animate-in text-center">
              <stat.icon className="w-8 h-8 text-[#D96C4A] mx-auto mb-4" />
              <div className="text-3xl md:text-4xl font-display text-white mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-white/60">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          {/* Left Column */}
          <div className="space-y-6">
            <h3 className="animate-in text-2xl font-display text-[#D96C4A]">
              Nuestra Misión
            </h3>
            <p className="animate-in text-white/70 leading-relaxed">
              Sabemos lo frustrante que puede ser buscar una pieza de tu baño antiguo
              que ya no se fabrica. Una cisterna Roca de los años 70, un lavabo Gala
              de los 80, o esa tapa de inodoro Victoria que ya no existe en catálogo.
            </p>
            <p className="animate-in text-white/70 leading-relaxed">
              Por eso hemos dedicado nuestra vida profesional a rastrear, recuperar y
              clasificar miles de piezas de sanitarios descatalogados de las principales
              marcas españolas y europeas.
            </p>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <h3 className="animate-in text-2xl font-display text-[#D96C4A]">
              Nuestro Compromiso
            </h3>
            <p className="animate-in text-white/70 leading-relaxed">
              Cada pieza que sale de nuestro almacén ha sido revisada, limpiada y
              verificada. Trabajamos con particulares, reformistas y profesionales
              del sector, ofreciendo siempre un trato cercano y personalizado.
            </p>
            <p className="animate-in text-white/70 leading-relaxed">
              Si no tenemos lo que buscas, lo buscamos. Nuestra red de contactos y
              proveedores nos permite localizar piezas que parecían imposibles de
              encontrar.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <button
            className="animate-in inline-flex items-center justify-center px-8 py-4 bg-[#D96C4A] text-white text-xs font-medium uppercase tracking-widest hover:bg-[#c25e3e] transition-all duration-300"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Cuéntanos qué necesitas
          </button>
        </div>
      </div>
    </section>
  );
}
