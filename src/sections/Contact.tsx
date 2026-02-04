'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, Mail, MessageCircle, Send } from 'lucide-react';
import { toast } from 'sonner';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    busqueda: '',
    mensaje: ''
  });

  useEffect(() => {
    const section = sectionRef.current;
    const left = leftRef.current;
    const form = formRef.current;

    if (!section || !left || !form) return;

    const ctx = gsap.context(() => {
      // Left content animation
      gsap.fromTo(left,
        { x: '-6vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Form animation
      gsap.fromTo(form,
        { x: '6vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Inputs stagger
      const inputs = form.querySelectorAll('.form-field');
      gsap.fromTo(inputs,
        { y: 12, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: form,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      );

    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Mensaje enviado. Te contactaremos en menos de 24h.');
    setFormData({ nombre: '', email: '', telefono: '', busqueda: '', mensaje: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section
      ref={sectionRef}
      id="contacto"
      className="relative z-[80] bg-primary-dark py-20 md:py-32"
    >
      <div className="px-[8vw]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
          {/* Left Column - Info */}
          <div ref={leftRef} className="text-white">
            <h2 className="heading-display text-[clamp(34px,4.2vw,72px)] mb-6">
              ¿Buscas una pieza concreta?
            </h2>

            <p className="text-white/70 text-lg mb-10 max-w-md">
              Escríbenos. Respondemos en menos de 24h con disponibilidad y precio.
            </p>

            {/* Contact Details */}
            <div className="space-y-6">
              <a
                href="https://wa.me/34653942261"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 flex items-center justify-center border border-white/30 group-hover:border-accent group-hover:bg-accent transition-all duration-300">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <span className="label-mono text-xs text-white/50 block mb-1">WHATSAPP</span>
                  <span className="text-white group-hover:text-accent transition-colors">+34 653 94 22 61</span>
                </div>
              </a>

              <a
                href="tel:+34653942261"
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 flex items-center justify-center border border-white/30 group-hover:border-accent group-hover:bg-accent transition-all duration-300">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="label-mono text-xs text-white/50 block mb-1">TELÉFONO</span>
                  <span className="text-white group-hover:text-accent transition-colors">+34 653 94 22 61</span>
                </div>
              </a>

              <a
                href="mailto:gamoservicios@gmail.com"
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 flex items-center justify-center border border-white/30 group-hover:border-accent group-hover:bg-accent transition-all duration-300">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="label-mono text-xs text-white/50 block mb-1">EMAIL</span>
                  <span className="text-white group-hover:text-accent transition-colors">gamoservicios@gmail.com</span>
                </div>
              </a>
            </div>
          </div>

          {/* Right Column - Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="form-field">
              <label className="label-mono text-xs text-white/50 block mb-2">NOMBRE</label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                className="w-full bg-transparent border-b border-white/30 focus:border-accent text-white py-3 outline-none transition-colors"
                placeholder="Tu nombre"
              />
            </div>

            <div className="form-field">
              <label className="label-mono text-xs text-white/50 block mb-2">EMAIL</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-transparent border-b border-white/30 focus:border-accent text-white py-3 outline-none transition-colors"
                placeholder="tu@email.com"
              />
            </div>

            <div className="form-field">
              <label className="label-mono text-xs text-white/50 block mb-2">TELÉFONO</label>
              <input
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-white/30 focus:border-accent text-white py-3 outline-none transition-colors"
                placeholder="+34 600 00 00 00"
              />
            </div>

            <div className="form-field">
              <label className="label-mono text-xs text-white/50 block mb-2">¿QUÉ BUSCAS?</label>
              <select
                name="busqueda"
                value={formData.busqueda}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-white/30 focus:border-accent text-white py-3 outline-none transition-colors appearance-none cursor-pointer"
              >
                <option value="" className="bg-[#0B0B0C]">Selecciona una opción</option>
                <option value="lavabo" className="bg-[#0B0B0C]">Lavabo</option>
                <option value="inodoro" className="bg-[#0B0B0C]">Inodoro</option>
                <option value="bidet" className="bg-[#0B0B0C]">Bidet</option>
                <option value="cisterna" className="bg-[#0B0B0C]">Cisterna</option>
                <option value="tapa" className="bg-[#0B0B0C]">Tapa / Asiento</option>
                <option value="otro" className="bg-[#0B0B0C]">Otro</option>
              </select>
            </div>

            <div className="form-field">
              <label className="label-mono text-xs text-white/50 block mb-2">MENSAJE</label>
              <textarea
                name="mensaje"
                value={formData.mensaje}
                onChange={handleChange}
                rows={4}
                className="w-full bg-transparent border-b border-white/30 focus:border-accent text-white py-3 outline-none transition-colors resize-none"
                placeholder="Describe la pieza que buscas..."
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#D96C4A] text-white text-xs font-medium uppercase tracking-widest hover:bg-[#c25e3e] transition-all duration-300 w-full md:w-auto mt-8"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              <span>Enviar consulta</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
