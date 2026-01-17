'use client';

import { usePathname } from 'next/navigation';
import Image from 'next/image';
import styles from './Header.module.css';

/**
 * Header Component
 * 
 * Main navigation bar with logo, navigation links, and CTA button.
 * Uses usePathname to highlight the active navigation link.
 */
export default function Header() {
    const pathname = usePathname();

    /**
     * Determines if a navigation path is currently active.
     * Special case: root path '/' only matches exactly.
     */
    const isActive = (path: string) => {
        if (path === '/') return pathname === '/';
        return pathname.startsWith(path);
    };

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <a href="/" className={styles.logoLink}>
                    <Image
                        src="/logo-nobg.png"
                        alt="Saneamientos Descatalogados"
                        width={200}
                        height={60}
                        className={styles.logoImage}
                        priority
                    />
                </a>

                <nav className={styles.nav}>
                    <a href="/" className={`${styles.navLink} ${isActive('/') ? styles.navLinkActive : ''}`}>
                        Inicio
                    </a>
                    <a href="/categorias" className={`${styles.navLink} ${isActive('/categorias') ? styles.navLinkActive : ''}`}>
                        Categorías
                    </a>
                    <a href="/catalogo" className={`${styles.navLink} ${isActive('/catalogo') ? styles.navLinkActive : ''}`}>
                        Catálogo
                    </a>
                    <a href="/marcas" className={`${styles.navLink} ${isActive('/marcas') ? styles.navLinkActive : ''}`}>
                        Marcas
                    </a>
                    <a href="/contacto" className={`${styles.navLink} ${isActive('/contacto') ? styles.navLinkActive : ''}`}>
                        Contacto
                    </a>
                </nav>

                <div className={styles.actions}>
                    <a href="/consultar-stock" className={styles.contactBtn}>
                        Consultar Stock
                    </a>
                </div>
            </div>
        </header>
    );
}
