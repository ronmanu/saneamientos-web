'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from "./page.module.css";

export default function Home() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/catalogo?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <main className={styles.main}>
      {/* Hero Section - CRO Optimizado */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>
            No cambies todo el baño<br />
            por una pieza rota.
          </h1>
          <p className={styles.subtitle}>
            Encontramos tu sanitario descatalogado exacto.
            Evita obras, escombros y gastos innecesarios. Envío en 24h.
          </p>

          <form className={styles.searchWrapper} onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="¿Qué pieza buscas? (Ej: Tapa Roca Victoria)"
              className={styles.searchInput}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit" className={styles.searchBtn} aria-label="Buscar">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </form>

          {/* CTA WhatsApp - Irresistible */}
          <a
            href="https://wa.me/34653942261?text=Hola,%20se%20me%20ha%20roto%20el%20inodoro%20y%20no%20sé%20qué%20modelo%20es.%20¿Podéis%20ayudarme?"
            className={styles.whatsappCta}
            target="_blank"
            rel="noopener noreferrer"
          >
            🤳 No sé qué modelo es: Enviar foto por WhatsApp
          </a>

          <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.95rem', color: 'var(--color-text-muted)' }}>
            <p>
              ¿Prefieres contactar por <strong>correo electrónico</strong>?
              Hazlo desde nuestra sección <a href="/consultar-stock" style={{ color: 'var(--color-primary)', fontWeight: 700, textDecoration: 'none' }}>Consultar Stock</a>.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.brandsSection}>
        <div className={styles.brandsContainer}>
          <a href="/catalogo?marca=roca" className={styles.brandLink}>
            <img src="/logos/roca.png" alt="Roca" className={styles.brandLogo} />
            <span className={styles.brandName}>Roca</span>
          </a>
          <a href="/catalogo?marca=gala" className={styles.brandLink}>
            <img src="/logos/gala.png" alt="Gala" className={styles.brandLogo} />
            <span className={styles.brandName}>Gala</span>
          </a>
          <a href="/catalogo?marca=bellavista" className={styles.brandLink}>
            <img src="/logos/bellavista.png" alt="Bellavista" className={styles.brandLogo} />
            <span className={styles.brandName}>Bellavista</span>
          </a>
          <a href="/catalogo?marca=jacob-delafon" className={styles.brandLink}>
            <img src="/logos/jacob-delafon.png" alt="Jacob Delafon" className={styles.brandLogo} />
            <span className={styles.brandName}>Jacob Delafon</span>
          </a>
          <a href="/catalogo?marca=sangra" className={styles.brandLink}>
            <img src="/logos/sangra.png" alt="Sangrá" className={styles.brandLogo} />
            <span className={styles.brandName}>Sangrá</span>
          </a>
        </div>
      </section>

      {/* CTA Section - Urgencia y Ahorro */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>¿Se te ha roto tu inodoro antiguo?</h2>
          <p className={styles.ctaText}>
            No necesitas picar suelos ni cambiar azulejos.
            Tenemos la pieza exacta de Roca, Gala o Bellavista que ya no se fabrica.
            Stock real y envío inmediato para que tu baño vuelva a funcionar hoy.
          </p>
          <div className={styles.ctaButtons}>
            <a href="/catalogo" className={styles.ctaBtn}>
              Ver Catálogo Completo
            </a>
            <a href="/consultar-stock" className={styles.ctaBtnOutline}>
              Consultar Disponibilidad
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
