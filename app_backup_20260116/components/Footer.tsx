import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.column}>
                    <h3>Contacto</h3>
                    <p className={styles.contactInfo}>
                        <strong>Dirección:</strong><br />
                        C/ Virgen de Lluc, 88z<br />
                        Madrid 28027
                    </p>
                    <p className={styles.contactInfo}>
                        <strong>Teléfono:</strong><br />
                        <a href="tel:+34653942261">+34 653 94 22 61</a>
                    </p>
                    <p className={styles.contactInfo}>
                        <strong>Email:</strong><br />
                        <a href="mailto:gamoservicios@gmail.com">gamoservicios@gmail.com</a>
                    </p>
                </div>

                <div className={styles.column}>
                    <h3>Catálogo</h3>
                    <ul>
                        <li><a href="/catalogo/inodoros">Inodoros</a></li>
                        <li><a href="/catalogo/bidets">Bidets</a></li>
                        <li><a href="/catalogo/lavabos">Lavabos</a></li>
                        <li><a href="/catalogo/accesorios">Accesorios</a></li>
                    </ul>
                </div>

                <div className={styles.column}>
                    <h3>Ayuda</h3>
                    <ul>
                        <li><a href="/contacto">Contacto</a></li>
                        <li><a href="/consultar-stock">Consultar Stock</a></li>
                        <li><a href="/marcas">Marcas</a></li>
                    </ul>
                </div>
            </div>

            <div className={styles.bottom}>
                &copy; {new Date().getFullYear()} Saneamientos Descatalogados. Todos los derechos reservados.
            </div>
        </footer>
    );
}
