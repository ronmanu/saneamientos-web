'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import styles from './Header.module.css';

/**
 * Header Component
 * 
 * Responsive navigation bar with:
 * - Logo
 * - Navigation links (desktop)
 * - Hamburger menu (mobile)
 * - CTA button
 */
export default function Header() {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);

    const isActive = (path: string) => {
        if (path === '/') return pathname === '/';
        return pathname.startsWith(path);
    };

    const toggleMenu = () => setMenuOpen(!menuOpen);
    const closeMenu = () => setMenuOpen(false);

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <a href="/" className={styles.logoLink}>
                    <Image
                        src="/logo-nobg.png"
                        alt="Aparatos Sanitarios Descatalogados"
                        width={200}
                        height={60}
                        className={styles.logoImage}
                        priority
                    />
                </a>

                {/* Hamburger Button - Mobile Only */}
                <button
                    className={styles.hamburger}
                    onClick={toggleMenu}
                    aria-label="Abrir menú"
                    aria-expanded={menuOpen}
                >
                    <span className={`${styles.hamburgerLine} ${menuOpen ? styles.open : ''}`}></span>
                    <span className={`${styles.hamburgerLine} ${menuOpen ? styles.open : ''}`}></span>
                    <span className={`${styles.hamburgerLine} ${menuOpen ? styles.open : ''}`}></span>
                </button>

                {/* Navigation */}
                <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}>
                    <a href="/" className={`${styles.navLink} ${isActive('/') ? styles.navLinkActive : ''}`} onClick={closeMenu}>
                        Inicio
                    </a>
                    <a href="/categorias" className={`${styles.navLink} ${isActive('/categorias') ? styles.navLinkActive : ''}`} onClick={closeMenu}>
                        Categorías
                    </a>
                    <a href="/catalogo" className={`${styles.navLink} ${isActive('/catalogo') ? styles.navLinkActive : ''}`} onClick={closeMenu}>
                        Catálogo
                    </a>
                    <a href="/marcas" className={`${styles.navLink} ${isActive('/marcas') ? styles.navLinkActive : ''}`} onClick={closeMenu}>
                        Marcas
                    </a>
                    <a href="/contacto" className={`${styles.navLink} ${isActive('/contacto') ? styles.navLinkActive : ''}`} onClick={closeMenu}>
                        Contacto
                    </a>

                    {/* CTA inside nav for mobile */}
                    <a href="/consultar-stock" className={styles.navCta} onClick={closeMenu}>
                        Consultar Stock
                    </a>
                </nav>

                {/* CTA Button - Desktop Only */}
                <div className={styles.actions}>
                    <a href="/consultar-stock" className={styles.contactBtn}>
                        Consultar Stock
                    </a>
                </div>
            </div>

            {/* Overlay for mobile menu */}
            {menuOpen && <div className={styles.overlay} onClick={closeMenu}></div>}
        </header>
    );
}
