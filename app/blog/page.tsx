/**
 * =============================================================================
 * PÁGINA PRINCIPAL DEL BLOG - SEO & TRÁFICO INFORMATIVO
 * =============================================================================
 * 
 * Estrategia: Captar tráfico informativo con guías de identificación
 * que luego conviertan en ventas.
 */

import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Blog | Guías de Sanitarios Descatalogados',
    description: 'Aprende a identificar modelos de sanitarios antiguos, medir piezas y encontrar repuestos descatalogados. Guías prácticas de Roca, Gala, Bellavista y más.',
    alternates: {
        canonical: 'https://www.aparatossanitariosdescatalogados.com/blog',
    },
};

// Artículos del blog (simular base de datos)
const articulos = [
    {
        slug: 'identificar-modelo-inodoro-roca-tornillos',
        titulo: 'Cómo identificar el modelo de tu inodoro Roca midiendo la distancia de los tornillos',
        excerpt: 'La distancia entre los tornillos de fijación de la tapa es clave para identificar tu modelo. Te enseñamos a medirlo correctamente.',
        imagen: '/blog/medir-tornillos.jpg',
        fecha: '2026-01-15',
        categoria: 'Guías',
    },
    {
        slug: 'guia-colores-ceramica-descatalogados',
        titulo: 'Guía de colores de cerámica antigua: ¿Es Pergamino, Visón o Champagne?',
        excerpt: 'Los colores de sanitarios han cambiado mucho. Aprende a distinguir entre los tonos clásicos que ya no se fabrican.',
        imagen: '/blog/colores-ceramica.jpg',
        fecha: '2026-01-10',
        categoria: 'Guías',
    },
    {
        slug: 'piezas-universales-no-funcionan-dama-retro',
        titulo: 'Por qué las piezas universales no sirven para los modelos Dama Retro',
        excerpt: 'Mucha gente compra repuestos universales y no encajan. Te explicamos por qué y cómo encontrar la pieza exacta.',
        imagen: '/blog/dama-retro.jpg',
        fecha: '2026-01-05',
        categoria: 'Consejos',
    },
    {
        slug: 'como-cambiar-tapa-inodoro-antiguo',
        titulo: 'Cómo cambiar la tapa de un inodoro antiguo paso a paso',
        excerpt: 'Tutorial completo para sustituir la tapa de tu inodoro descatalogado sin necesidad de llamar a un fontanero.',
        imagen: '/blog/cambiar-tapa.jpg',
        fecha: '2025-12-28',
        categoria: 'Tutoriales',
    },
];

export default function BlogPage() {
    return (
        <main style={{ maxWidth: 'var(--container-width)', margin: '0 auto', padding: 'calc(var(--header-height) + 2rem) 2rem 4rem' }}>
            {/* Cabecera */}
            <header style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--color-text-main)' }}>
                    Blog de Sanitarios Descatalogados
                </h1>
                <p style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)', maxWidth: '600px', margin: '0 auto' }}>
                    Guías prácticas para identificar modelos, medir piezas y encontrar repuestos de sanitarios que ya no se fabrican.
                </p>
            </header>

            {/* Grid de artículos */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '2rem',
            }}>
                {articulos.map((articulo) => (
                    <article
                        key={articulo.slug}
                        style={{
                            background: 'var(--color-surface)',
                            borderRadius: 'var(--radius-lg)',
                            overflow: 'hidden',
                            border: '1px solid var(--glass-border)',
                            transition: 'transform 0.2s, box-shadow 0.2s',
                        }}
                    >
                        {/* Imagen placeholder */}
                        <div style={{
                            height: '180px',
                            background: 'linear-gradient(135deg, var(--color-primary-light) 0%, var(--color-primary) 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '3rem',
                        }}>
                            📖
                        </div>

                        <div style={{ padding: '1.5rem' }}>
                            <span style={{
                                display: 'inline-block',
                                padding: '0.25rem 0.75rem',
                                background: 'var(--color-bg)',
                                borderRadius: '50px',
                                fontSize: '0.75rem',
                                color: 'var(--color-primary)',
                                fontWeight: 600,
                                marginBottom: '0.75rem',
                            }}>
                                {articulo.categoria}
                            </span>

                            <h2 style={{
                                fontSize: '1.1rem',
                                lineHeight: 1.3,
                                marginBottom: '0.75rem',
                                color: 'var(--color-text-main)',
                            }}>
                                <Link
                                    href={`/blog/${articulo.slug}`}
                                    style={{ textDecoration: 'none', color: 'inherit' }}
                                >
                                    {articulo.titulo}
                                </Link>
                            </h2>

                            <p style={{
                                fontSize: '0.9rem',
                                color: 'var(--color-text-muted)',
                                lineHeight: 1.6,
                                marginBottom: '1rem',
                            }}>
                                {articulo.excerpt}
                            </p>

                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}>
                                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                                    {new Date(articulo.fecha).toLocaleDateString('es-ES', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                    })}
                                </span>
                                <Link
                                    href={`/blog/${articulo.slug}`}
                                    style={{
                                        color: 'var(--color-primary)',
                                        fontWeight: 600,
                                        fontSize: '0.85rem',
                                        textDecoration: 'none',
                                    }}
                                >
                                    Leer más →
                                </Link>
                            </div>
                        </div>
                    </article>
                ))}
            </div>

            {/* CTA final */}
            <section style={{
                marginTop: '4rem',
                padding: '3rem',
                background: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
                borderRadius: 'var(--radius-lg)',
                textAlign: 'center',
            }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--color-text-main)' }}>
                    ¿No encuentras tu modelo?
                </h2>
                <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem' }}>
                    Envíanos una foto de tu sanitario por WhatsApp y nuestros expertos lo identificarán gratis.
                </p>
                <a
                    href="https://wa.me/34653942261?text=Hola,%20necesito%20ayuda%20para%20identificar%20mi%20sanitario"
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
                    📲 Identificar mi modelo por WhatsApp
                </a>
            </section>
        </main>
    );
}
