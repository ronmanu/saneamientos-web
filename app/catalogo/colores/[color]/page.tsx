/**
 * =============================================================================
 * PÁGINA DE CATÁLOGO POR COLOR - SEO LONG-TAIL
 * =============================================================================
 * 
 * Ruta: /catalogo/colores/[color]
 * Ejemplo: /catalogo/colores/pergamino
 * 
 * Esta página captura búsquedas long-tail como:
 * - "sanitarios color pergamino"
 * - "inodoro visón descatalogado"
 * - "tapa wc azul caribe"
 */

import { Metadata } from 'next';
import Link from 'next/link';
import { getAllProductos, Producto } from '@/app/data/productos';

interface ColorPageProps {
    params: Promise<{ color: string }>;
}

// Colores disponibles y sus variantes de búsqueda
const coloresInfo: Record<string, { nombre: string; descripcion: string; variantes: string[] }> = {
    'pergamino': {
        nombre: 'Pergamino',
        descripcion: 'El color pergamino (o hueso) fue uno de los tonos más populares en los baños españoles de los años 80 y 90. Un blanco roto elegante con matices cálidos.',
        variantes: ['pergamino', 'hueso', 'marfil', 'crema'],
    },
    'vison': {
        nombre: 'Visón',
        descripcion: 'El visón es un gris cálido con toques marrones, muy demandado en decoración de baños de los 80. Difícil de encontrar pero muy valorado.',
        variantes: ['visón', 'vison', 'gris', 'topo'],
    },
    'blanco': {
        nombre: 'Blanco',
        descripcion: 'El blanco clásico sigue siendo el más demandado pero las tonalidades exactas varían entre fabricantes y épocas.',
        variantes: ['blanco', 'white'],
    },
    'azul-caribe': {
        nombre: 'Azul Caribe',
        descripcion: 'Un azul turquesa suave muy característico de los baños de los años 70-80. Color icónico de la época.',
        variantes: ['azul caribe', 'turquesa', 'azul', 'celeste'],
    },
    'rosa': {
        nombre: 'Rosa / Rosa Ilusión',
        descripcion: 'Los tonos rosa en sanitarios fueron muy populares en los 70-80. El "Rosa Ilusión" de Roca es especialmente buscado.',
        variantes: ['rosa', 'rosa ilusión', 'rosa ilusion', 'pink'],
    },
    'verde': {
        nombre: 'Verde / Verde Agua',
        descripcion: 'Los verdes agua y menta fueron colores muy utilizados en baños de los 60-70. Muy difíciles de conseguir hoy.',
        variantes: ['verde', 'verde agua', 'menta', 'mint'],
    },
    'champagne': {
        nombre: 'Champagne',
        descripcion: 'Similar al pergamino pero con un toque más dorado. Color elegante muy popular en sanitarios de gama alta.',
        variantes: ['champagne', 'champán', 'dorado claro'],
    },
};

// Generar rutas estáticas para colores principales
export async function generateStaticParams() {
    return Object.keys(coloresInfo).map(color => ({ color }));
}

function formatearTexto(slug: string): string {
    return slug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

// Buscar productos que mencionen el color
function buscarProductosPorColor(colorSlug: string): Producto[] {
    const colorData = coloresInfo[colorSlug];
    if (!colorData) return [];

    const todos = getAllProductos();
    const resultados: Producto[] = [];

    todos.forEach(producto => {
        const textoCompleto = `${producto.caracteristicas} ${producto.compatibilidades} ${producto.notas}`.toLowerCase();

        // Buscar cualquiera de las variantes del color
        const tieneColor = colorData.variantes.some(variante =>
            textoCompleto.includes(variante.toLowerCase())
        );

        if (tieneColor) {
            resultados.push(producto);
        }
    });

    return resultados;
}

export async function generateMetadata({ params }: ColorPageProps): Promise<Metadata> {
    const { color } = await params;
    const colorData = coloresInfo[color];

    if (!colorData) {
        return { title: 'Color no encontrado' };
    }

    return {
        title: `Sanitarios Color ${colorData.nombre} Descatalogados | Stock Garantizado`,
        description: `Buscas sanitarios en color ${colorData.nombre}? Tenemos inodoros, lavabos, bidés y tapas en ${colorData.nombre.toLowerCase()} descatalogado. Piezas originales de Roca, Gala, Bellavista y más.`,
        keywords: [
            `sanitarios ${colorData.nombre.toLowerCase()}`,
            `inodoro ${colorData.nombre.toLowerCase()} descatalogado`,
            `tapa wc ${colorData.nombre.toLowerCase()}`,
            `lavabo ${colorData.nombre.toLowerCase()}`,
            ...colorData.variantes.map(v => `sanitario ${v}`),
        ],
        alternates: {
            canonical: `https://www.aparatossanitariosdescatalogados.com/catalogo/colores/${color}`,
        },
    };
}

export default async function ColorPage({ params }: ColorPageProps) {
    const { color } = await params;
    const colorData = coloresInfo[color];

    if (!colorData) {
        return (
            <main style={{ maxWidth: 'var(--container-width)', margin: '0 auto', padding: 'calc(var(--header-height) + 2rem) 2rem 4rem', textAlign: 'center' }}>
                <h1>Color no encontrado</h1>
                <p>El color que buscas no está en nuestro catálogo.</p>
                <Link href="/catalogo">Volver al catálogo</Link>
            </main>
        );
    }

    const productos = buscarProductosPorColor(color);
    const whatsappUrl = `https://wa.me/34653942261?text=${encodeURIComponent(`Hola, busco sanitarios en color ${colorData.nombre}. ¿Qué modelos tienen disponibles?`)}`;

    return (
        <main style={{ maxWidth: 'var(--container-width)', margin: '0 auto', padding: 'calc(var(--header-height) + 2rem) 2rem 4rem' }}>
            {/* Breadcrumbs */}
            <nav style={{ marginBottom: '2rem', fontSize: '0.9rem' }}>
                <Link href="/" style={{ color: 'var(--color-text-muted)' }}>Inicio</Link>
                {' › '}
                <Link href="/catalogo" style={{ color: 'var(--color-text-muted)' }}>Catálogo</Link>
                {' › '}
                <Link href="/catalogo/colores" style={{ color: 'var(--color-text-muted)' }}>Colores</Link>
                {' › '}
                <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>{colorData.nombre}</span>
            </nav>

            {/* Header */}
            <header style={{ marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--color-text-main)' }}>
                    Sanitarios Color {colorData.nombre} Descatalogados
                </h1>
                <p style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)', lineHeight: 1.7, maxWidth: '800px' }}>
                    {colorData.descripcion}
                </p>
            </header>

            {/* CTA WhatsApp */}
            <div style={{
                background: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
                borderRadius: 'var(--radius-lg)',
                padding: '2rem',
                marginBottom: '3rem',
                textAlign: 'center',
            }}>
                <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--color-text-main)' }}>
                    ¿Buscas una pieza específica en {colorData.nombre}?
                </h2>
                <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
                    Envíanos una foto de tu sanitario y te confirmaremos si tenemos el color exacto en stock.
                </p>
                <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        display: 'inline-block',
                        padding: '1rem 2rem',
                        background: '#25D366',
                        color: 'white',
                        fontWeight: 700,
                        borderRadius: '50px',
                        textDecoration: 'none',
                    }}
                >
                    📲 Consultar disponibilidad en {colorData.nombre}
                </a>
            </div>

            {/* Productos encontrados */}
            {productos.length > 0 ? (
                <>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', color: 'var(--color-text-main)' }}>
                        Modelos disponibles en {colorData.nombre} ({productos.length})
                    </h2>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                        gap: '1.5rem',
                    }}>
                        {productos.map(producto => (
                            <Link
                                key={producto.id}
                                href={producto.url}
                                style={{
                                    background: 'var(--color-surface)',
                                    borderRadius: 'var(--radius-md)',
                                    padding: '1.5rem',
                                    textDecoration: 'none',
                                    border: '1px solid var(--glass-border)',
                                    transition: 'transform 0.2s, box-shadow 0.2s',
                                }}
                            >
                                <span style={{
                                    fontSize: '0.75rem',
                                    color: 'var(--color-primary)',
                                    textTransform: 'uppercase',
                                    fontWeight: 600,
                                }}>
                                    {producto.marca}
                                </span>
                                <h3 style={{
                                    fontSize: '1.1rem',
                                    color: 'var(--color-text-main)',
                                    margin: '0.5rem 0',
                                }}>
                                    {producto.modelo}
                                </h3>
                                <p style={{
                                    fontSize: '0.85rem',
                                    color: 'var(--color-text-muted)',
                                    marginBottom: '0.5rem',
                                }}>
                                    {producto.tipoPrincipal}
                                </p>
                                <span style={{
                                    fontSize: '0.8rem',
                                    color: 'var(--color-text-muted)',
                                }}>
                                    {producto.periodo}
                                </span>
                            </Link>
                        ))}
                    </div>
                </>
            ) : (
                <div style={{ textAlign: 'center', padding: '3rem' }}>
                    <p style={{ color: 'var(--color-text-muted)', marginBottom: '1rem' }}>
                        No tenemos productos específicos listados en {colorData.nombre}, pero podemos tener stock no catalogado.
                    </p>
                    <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: 'var(--color-primary)', fontWeight: 600 }}
                    >
                        Consultar por WhatsApp →
                    </a>
                </div>
            )}

            {/* Texto SEO */}
            <section style={{
                marginTop: '4rem',
                padding: '3rem',
                background: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
                borderRadius: 'var(--radius-lg)',
            }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--color-text-main)' }}>
                    ¿Por qué es difícil encontrar sanitarios en {colorData.nombre}?
                </h2>
                <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.8, marginBottom: '1rem' }}>
                    Los colores de sanitarios han cambiado mucho a lo largo de las décadas. Lo que en los años 70-90 era muy popular,
                    como el <strong>{colorData.nombre.toLowerCase()}</strong>, hoy ya no se fabrica. Esto crea un problema cuando se rompe
                    una pieza y necesitas reemplazarla manteniendo la estética original de tu baño.
                </p>
                <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.8 }}>
                    En <strong>Sanitarios Descatalogados</strong> nos especializamos precisamente en esto: localizar piezas en colores
                    que ya no existen en el mercado. Tenemos acceso a stock antiguo de fábrica y a piezas recuperadas de reformas,
                    todos en perfecto estado y listos para envío inmediato.
                </p>
            </section>

            {/* Otros colores */}
            <section style={{ marginTop: '3rem' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: 'var(--color-text-main)' }}>
                    Otros colores descatalogados
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                    {Object.entries(coloresInfo)
                        .filter(([slug]) => slug !== color)
                        .map(([slug, data]) => (
                            <Link
                                key={slug}
                                href={`/catalogo/colores/${slug}`}
                                style={{
                                    padding: '0.5rem 1rem',
                                    background: 'var(--color-bg)',
                                    borderRadius: '50px',
                                    fontSize: '0.9rem',
                                    color: 'var(--color-text-main)',
                                    textDecoration: 'none',
                                    border: '1px solid var(--glass-border)',
                                }}
                            >
                                {data.nombre}
                            </Link>
                        ))}
                </div>
            </section>
        </main>
    );
}
