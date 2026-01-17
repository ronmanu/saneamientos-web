import styles from './not-found.module.css';

export default function NotFound() {
    return (
        <main className={styles.container}>
            <div className="glass-panel" style={{ padding: '4rem', textAlign: 'center' }}>
                <h1 className={styles.title}>404</h1>
                <h2 className={styles.subtitle}>Oops! Pieza no encontrada</h2>
                <p className={styles.text}>
                    Parece que el producto o la página que buscas ya no está disponible
                    o ha sido movida a otro catálogo.
                </p>
                <a href="/" className="btn-primary" style={{ display: 'inline-block', marginTop: '2rem' }}>
                    Volver al Inicio
                </a>
            </div>
        </main>
    );
}
