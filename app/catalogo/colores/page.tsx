/**
 * =============================================================================
 * PÁGINA ÍNDICE DE COLORES DESCATALOGADOS
 * =============================================================================
 */

import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Colores Descatalogados de Sanitarios | Pergamino, Visón, Rosa y más',
    description: 'Encuentra sanitarios en colores que ya no se fabrican: pergamino, visón, azul caribe, rosa ilusión. Piezas originales de Roca, Gala, Bellavista con envío inmediato.',
    alternates: {
        canonical: 'https://www.aparatossanitariosdescatalogados.com/catalogo/colores',
    },
};

const colores = [
    { slug: 'pergamino', nombre: 'Pergamino', descripcion: 'Blanco roto cálido, muy popular en los 80-90', emoji: '🥛' },
    { slug: 'vison', nombre: 'Visón', descripcion: 'Gris cálido con toques marrones', emoji: '🐿️' },
    { slug: 'blanco', nombre: 'Blanco', descripcion: 'El clásico, pero con tonalidades que varían', emoji: '⬜' },
    { slug: 'azul-caribe', nombre: 'Azul Caribe', descripcion: 'Turquesa suave de los años 70-80', emoji: '🌊' },
    { slug: 'rosa', nombre: 'Rosa / Rosa Ilusión', descripcion: 'Rosa pálido icónico de los 70-80', emoji: '🌸' },
    { slug: 'verde', nombre: 'Verde Agua', descripcion: 'Verde menta de los años 60-70', emoji: '🌿' },
    { slug: 'champagne', nombre: 'Champagne', descripcion: 'Pergamino con toque dorado', emoji: '🥂' },
];

export default function ColoresPage() {
    return (
        <main style={{ maxWidth: 'var(--container-width)', margin: '0 auto', padding: 'calc(var(--header-height) + 2rem) 2rem 4rem' }}>
            {/* Breadcrumbs */}
            <nav style={{ marginBottom: '2rem', fontSize: '0.9rem' }}>
                <Link href="/" style={{ color: 'var(--color-text-muted)' }}>Inicio</Link>
                {' › '}
                <Link href="/catalogo" style={{ color: 'var(--color-text-muted)' }}>Catálogo</Link>
                {' › '}
                <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Colores</span>
            </nav>

            {/* Header */}
            <header style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--color-text-main)' }}>
                    Colores Descatalogados de Sanitarios
                </h1>
                <p style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)', maxWidth: '700px', margin: '0 auto' }}>
                    Los colores de moda en los baños de los 70, 80 y 90 ya no se fabrican.
                    Aquí encontrarás piezas originales en esos tonos tan difíciles de conseguir.
                </p>
            </header>

            {/* Grid de colores */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '2rem',
            }}>
                {colores.map(color => (
                    <Link
                        key={color.slug}
                        href={`/catalogo/colores/${color.slug}`}
                        style={{
                            background: 'var(--glass-bg)',
                            border: '1px solid var(--glass-border)',
                            borderRadius: 'var(--radius-lg)',
                            padding: '2rem',
                            textDecoration: 'none',
                            transition: 'transform 0.3s, box-shadow 0.3s',
                            display: 'block',
                        }}
                    >
                        <span style={{ fontSize: '3rem', display: 'block', marginBottom: '1rem' }}>
                            {color.emoji}
                        </span>
                        <h2 style={{
                            fontSize: '1.5rem',
                            color: 'var(--color-text-main)',
                            marginBottom: '0.5rem',
                        }}>
                            {color.nombre}
                        </h2>
                        <p style={{
                            fontSize: '0.95rem',
                            color: 'var(--color-text-muted)',
                            lineHeight: 1.5,
                        }}>
                            {color.descripcion}
                        </p>
                        <span style={{
                            display: 'inline-block',
                            marginTop: '1rem',
                            color: 'var(--color-primary)',
                            fontWeight: 600,
                            fontSize: '0.9rem',
                        }}>
                            Ver productos →
                        </span>
                    </Link>
                ))}
            </div>

            {/* CTA */}
            <section style={{
                marginTop: '4rem',
                padding: '3rem',
                background: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
                borderRadius: 'var(--radius-lg)',
                textAlign: 'center',
            }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--color-text-main)' }}>
                    ¿No encuentras tu color?
                </h2>
                <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem' }}>
                    Tenemos muchos más colores en stock que no están listados.
                    Envíanos una foto de tu sanitario y te confirmaremos si tenemos el color exacto.
                </p>
                <a
                    href="https://wa.me/34653942261?text=Hola,%20busco%20un%20sanitario%20en%20un%20color%20descatalogado.%20¿Podéis%20ayudarme?"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        display: 'inline-block',
                        padding: '1rem 2.5rem',
                        background: '#25D366',
                        color: 'white',
                        fontWeight: 700,
                        borderRadius: '50px',
                        textDecoration: 'none',
                    }}
                >
                    📲 Consultar color por WhatsApp
                </a>
            </section>

            {/* SEO Text */}
            <section style={{ marginTop: '4rem' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--color-text-main)' }}>
                    ¿Por qué buscar sanitarios por color?
                </h2>
                <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.8, marginBottom: '1rem' }}>
                    Cuando se rompe una pieza de tu baño antiguo, el mayor problema suele ser encontrar el color exacto.
                    Lo que para ti es "blanco" puede ser en realidad <strong>pergamino, hueso o champagne</strong>. Y la diferencia
                    se nota mucho cuando colocas una pieza nueva junto a las antiguas.
                </p>
                <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.8 }}>
                    En <strong>Sanitarios Descatalogados</strong> tenemos experiencia identificando colores exactos. Muchos de
                    nuestros clientes nos envían fotos por WhatsApp y les confirmamos si tenemos el tono correcto antes de comprar.
                    Así te aseguras de que la pieza nueva encaje perfectamente con el resto de tu baño.
                </p>
            </section>
        </main>
    );
}
