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
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>
            Tu sanitario descatalogado,<br />
            como nuevo.
          </h1>
          <p className={styles.subtitle}>
            Especialistas en piezas difíciles de encontrar.
            Calidad original, stock garantizado y envío inmediato.
          </p>

          <form className={styles.searchWrapper} onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="¿Qué pieza buscas? (Ej: Tapa Roca Dama)"
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
        </div>
      </section>

      <section className={styles.brandsSection}>
        <div className={styles.brandsContainer}>
          <a href="/marca/roca" className={styles.brandLink}>
            <img src="/logos/roca.png" alt="Roca" className={styles.brandLogo} />
            <span className={styles.brandName}>Roca</span>
          </a>
          <a href="/marca/gala" className={styles.brandLink}>
            <img src="/logos/gala.png" alt="Gala" className={styles.brandLogo} />
            <span className={styles.brandName}>Gala</span>
          </a>
          <a href="/marca/bellavista" className={styles.brandLink}>
            <img src="/logos/bellavista.png" alt="Bellavista" className={styles.brandLogo} />
            <span className={styles.brandName}>Bellavista</span>
          </a>
          <a href="/marca/jacob-delafon" className={styles.brandLink}>
            <img src="/logos/jacob-delafon.png" alt="Jacob Delafon" className={styles.brandLogo} />
            <span className={styles.brandName}>Jacob Delafon</span>
          </a>
          <a href="/marca/sangra" className={styles.brandLink}>
            <img src="/logos/sangra.png" alt="Sangrá" className={styles.brandLogo} />
            <span className={styles.brandName}>Sangrá</span>
          </a>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>¿No encuentras tu pieza?</h2>
          <p className={styles.ctaText}>
            Tenemos acceso a miles de referencias descatalogadas.
            Consúltanos y te ayudamos a encontrar lo que necesitas.
          </p>
          <div className={styles.ctaButtons}>
            <a href="/categorias" className={styles.ctaBtn}>
              Ver Categorías
            </a>
            <a href="/consultar-stock" className={styles.ctaBtnOutline}>
              Consultar Stock
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
