import styles from './Header.module.css';

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <a href="/" className={styles.logoLink}>
                    <img src="/logo-nobg.png" alt="Saneamientos Descatalogados" className={styles.logoImage} />
                </a>

                <nav className={styles.nav}>
                    <a href="/" className={styles.navLink}>Inicio</a>
                    <a href="/catalogo" className={styles.navLink}>Catálogo</a>
                    <a href="/marcas" className={styles.navLink}>Marcas</a>
                    <a href="/contacto" className={styles.navLink}>Contacto</a>
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
