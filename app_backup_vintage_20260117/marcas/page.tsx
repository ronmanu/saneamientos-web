import styles from './page.module.css';

const brands = [
    { name: 'Roca', logo: 'ROCA' },
    { name: 'Gala', logo: 'GALA' },
    { name: 'Bellavista', logo: 'BELLAVISTA' },
    { name: 'Jacob Delafon', logo: 'JACOB DELAFON' },
    { name: 'Sangrá', logo: 'SANGRÁ' },
];

export default function MarcasPage() {
    return (
        <main className={styles.pageContainer}>
            <h1 className={styles.title}>Pioneros en las mejores marcas</h1>
            <p className={styles.subtitle}>Trabajamos con los fabricantes más prestigiosos para garantizar el repuesto original.</p>

            <div className={styles.grid}>
                {brands.map(brand => (
                    <a key={brand.name} href={`/marca/${brand.name.toLowerCase().replace(' ', '-')}`} className={`${styles.brandCard} glass-panel`}>
                        <img
                            src={`/logos/${brand.name.toLowerCase().replace(' ', '-').replace('á', 'a')}.png`}
                            alt={`Logotipo ${brand.name}`}
                            className={styles.brandLogo}
                        />
                        <span className={styles.name}>{brand.name}</span>
                    </a>
                ))}
            </div>
        </main>
    );
}
