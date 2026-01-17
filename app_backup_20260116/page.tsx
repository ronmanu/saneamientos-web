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

      {/* Categories Grid */}
      <section className={styles.categoriesSection}>
        <h2 className={styles.sectionTitle}>Explora por Categoría</h2>
        <div className={styles.grid}>
          <a href="/catalogo/lavabos" className={styles.card} style={{ backgroundImage: "url('/images/categories/lavabos.png')" }}>
            <div className={styles.cardOverlay}></div>
            <h3 className={styles.cardTitle}>Lavabos</h3>
            <span className={styles.cardLink}>Ver colección &rarr;</span>
          </a>

          <a href="/catalogo/inodoros" className={styles.card} style={{ backgroundImage: "url('/images/categories/inodoros.png')" }}>
            <div className={styles.cardOverlay}></div>
            <h3 className={styles.cardTitle}>Inodoros</h3>
            <span className={styles.cardLink}>Ver modelos &rarr;</span>
          </a>

          <a href="/catalogo/bidets" className={styles.card} style={{ backgroundImage: "url('/images/categories/bidets.png')" }}>
            <div className={styles.cardOverlay}></div>
            <h3 className={styles.cardTitle}>Bidets</h3>
            <span className={styles.cardLink}>Ver catálogo &rarr;</span>
          </a>

          <a href="/catalogo/mamparas" className={styles.card} style={{ backgroundImage: "url('/images/categories/mamparas.png')" }}>
            <div className={styles.cardOverlay}></div>
            <h3 className={styles.cardTitle}>Mamparas</h3>
            <span className={styles.cardLink}>Ver soluciones &rarr;</span>
          </a>

          <a href="/catalogo/accesorios" className={styles.card} style={{ backgroundImage: "url('/images/categories/accesorios.png')" }}>
            <div className={styles.cardOverlay}></div>
            <h3 className={styles.cardTitle}>Accesorios</h3>
            <span className={styles.cardLink}>Ver todo &rarr;</span>
          </a>
        </div>
      </section>
    </main>
  );
}
