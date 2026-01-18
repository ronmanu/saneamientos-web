/**
 * =============================================================================
 * PÁGINA DINÁMICA DE ARTÍCULO DE BLOG
 * =============================================================================
 */

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';

interface BlogPostProps {
    params: Promise<{ slug: string }>;
}

// Simulación de base de datos de artículos
const articulos: Record<string, any> = {
    'identificar-modelo-inodoro-roca-tornillos': {
        titulo: 'Cómo identificar el modelo de tu inodoro Roca midiendo la distancia de los tornillos',
        contenido: `
## Por qué es importante medir la distancia entre tornillos

Cuando la tapa de tu inodoro se rompe o se desgasta, lo primero que piensas es: "Voy a comprar una tapa universal". Error. Las tapas universales rara vez encajan bien en modelos descatalogados, porque cada serie de Roca tiene medidas específicas.

La **distancia entre los tornillos de fijación** (también llamados "anclajes" o "bisagras") es el dato más importante para identificar tu modelo.

## Cómo medir correctamente

1. **Localiza los agujeros de fijación**: Están en la parte trasera del inodoro, donde se ancla la tapa.
2. **Mide de centro a centro**: Usa una cinta métrica y mide desde el centro de un agujero hasta el centro del otro.
3. **Anota la medida en milímetros**: Las diferencias pueden ser de pocos milímetros, pero son cruciales.

### Medidas comunes de modelos Roca descatalogados:

| Modelo | Distancia entre tornillos |
|--------|--------------------------|
| Victoria | 160 mm |
| Lorentina | 155 mm |
| Dama Retro | 170 mm |
| Giralda | 165 mm |

## ¿Y si no coincide con ninguno?

Envíanos una foto por WhatsApp con la medida y te ayudamos a identificarlo. Tenemos el mayor catálogo de piezas descatalogadas de España.
        `,
        fecha: '2026-01-15',
        categoria: 'Guías',
        autor: 'Equipo Sanitarios Descatalogados',
    },
    'guia-colores-ceramica-descatalogados': {
        titulo: 'Guía de colores de cerámica antigua: ¿Es Pergamino, Visón o Champagne?',
        contenido: `
## El problema de los colores descatalogados

Uno de los mayores quebraderos de cabeza cuando se rompe una pieza de tu baño antiguo es encontrar el color exacto. Los fabricantes han ido retirando tonos que antes eran muy populares.

## Colores clásicos de Roca ya descatalogados

- **Pergamino**: Un blanco roto con un toque ligeramente amarillento. Muy popular en los 80.
- **Visón**: Un gris cálido con matices marrones. Elegante y muy demandado.
- **Champagne**: Similar al pergamino pero más dorado.
- **Azul Caribe**: Un azul turquesa suave muy característico.
- **Rosa Ilusión**: Un rosa pálido muy típico de los 70-80.
- **Verde Agua**: Un verde muy suave, casi menta.

## Cómo identificar tu color

1. **Limpia bien la pieza**: La suciedad puede alterar el color real.
2. **Compara a la luz natural**: La luz artificial puede engañar.
3. **Haznos una foto**: Envíanos una imagen por WhatsApp con buena iluminación y te ayudamos.

## ¿Por qué no mezclar colores?

Aunque parezca que "blanco es blanco", en cerámica hay decenas de tonos de blanco. Mezclar un blanco puro con un pergamino queda fatal y arruina la estética de tu baño.
        `,
        fecha: '2026-01-10',
        categoria: 'Guías',
        autor: 'Equipo Sanitarios Descatalogados',
    },
    'piezas-universales-no-funcionan-dama-retro': {
        titulo: 'Por qué las piezas universales no sirven para los modelos Dama Retro',
        contenido: `
## La trampa de lo "universal"

Cuando buscas una tapa de inodoro o un mecanismo de cisterna, encontrarás muchas opciones "universales" a precios muy bajos. Parece la solución perfecta... hasta que la instalas.

## Problemas comunes con piezas universales en Dama Retro

1. **La tapa no cierra bien**: Queda un hueco, hace ruido, o se mueve.
2. **Las bisagras no encajan**: Los agujeros de la Dama Retro tienen una posición específica.
3. **El mecanismo de descarga no ajusta**: La cisterna tiene un diseño particular.

## Por qué la Dama Retro es especial

La serie Dama Retro de Roca fue un diseño premium en su época. Tiene:

- Formas redondeadas específicas
- Anclajes a medida no estándar
- Mecanismos de cisterna con configuración propia

## La solución: piezas originales

En Sanitarios Descatalogados tenemos stock de piezas originales Dama Retro:
- Tapas en varios colores (blanco, pergamino, rosa)
- Mecanismos de cisterna
- Pulsadores originales

No te la juegues con universales. Consulta disponibilidad.
        `,
        fecha: '2026-01-05',
        categoria: 'Consejos',
        autor: 'Equipo Sanitarios Descatalogados',
    },
    'como-cambiar-tapa-inodoro-antiguo': {
        titulo: 'Cómo cambiar la tapa de un inodoro antiguo paso a paso',
        contenido: `
## Herramientas necesarias

- Llave inglesa o alicates
- Destornillador plano
- Guantes de trabajo
- Trapo o bayeta

## Paso 1: Retirar la tapa antigua

1. Localiza los tornillos de fijación (debajo de las bisagras o en la parte trasera).
2. Aflojalos girando en sentido antihorario.
3. Si están oxidados, aplica WD-40 y espera 10 minutos.
4. Retira la tapa con cuidado.

## Paso 2: Limpiar la zona

Aprovecha para limpiar bien la parte trasera del inodoro donde irá la nueva tapa.

## Paso 3: Colocar la nueva tapa

1. Alinea los agujeros de la tapa con los del inodoro.
2. Inserta los tornillos de fijación.
3. Aprieta sin pasarte (la cerámica puede romperse).
4. Comprueba que la tapa abre y cierra correctamente.

## Consejos importantes

- **No aprietes demasiado**: Los tornillos de plástico pueden romperse.
- **Comprueba el modelo antes de comprar**: Mide la distancia entre tornillos.
- **Si tienes dudas, pregúntanos**: Te ayudamos gratis por WhatsApp.
        `,
        fecha: '2025-12-28',
        categoria: 'Tutoriales',
        autor: 'Equipo Sanitarios Descatalogados',
    },
};

export async function generateMetadata({ params }: BlogPostProps): Promise<Metadata> {
    const { slug } = await params;
    const articulo = articulos[slug];

    if (!articulo) {
        return { title: 'Artículo no encontrado' };
    }

    return {
        title: `${articulo.titulo} | Blog Sanitarios Descatalogados`,
        description: articulo.contenido.substring(0, 160).replace(/[#*\n]/g, '').trim() + '...',
        alternates: {
            canonical: `https://www.aparatossanitariosdescatalogados.com/blog/${slug}`,
        },
    };
}

export default async function BlogPostPage({ params }: BlogPostProps) {
    const { slug } = await params;
    const articulo = articulos[slug];

    if (!articulo) {
        notFound();
    }

    // Schema.org para artículo
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: articulo.titulo,
        author: {
            '@type': 'Organization',
            name: articulo.autor,
        },
        datePublished: articulo.fecha,
        publisher: {
            '@type': 'Organization',
            name: 'Sanitarios Descatalogados',
            url: 'https://www.aparatossanitariosdescatalogados.com',
        },
    };

    return (
        <main style={{ maxWidth: '800px', margin: '0 auto', padding: 'calc(var(--header-height) + 2rem) 2rem 4rem' }}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Breadcrumbs */}
            <nav style={{ marginBottom: '2rem', fontSize: '0.9rem' }}>
                <Link href="/" style={{ color: 'var(--color-text-muted)' }}>Inicio</Link>
                {' › '}
                <Link href="/blog" style={{ color: 'var(--color-text-muted)' }}>Blog</Link>
                {' › '}
                <span style={{ color: 'var(--color-primary)' }}>{articulo.categoria}</span>
            </nav>

            {/* Cabecera del artículo */}
            <header style={{ marginBottom: '2rem' }}>
                <span style={{
                    display: 'inline-block',
                    padding: '0.25rem 0.75rem',
                    background: 'var(--color-primary)',
                    color: 'white',
                    borderRadius: '50px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    marginBottom: '1rem',
                }}>
                    {articulo.categoria}
                </span>

                <h1 style={{ fontSize: '2.25rem', lineHeight: 1.2, marginBottom: '1rem', color: 'var(--color-text-main)' }}>
                    {articulo.titulo}
                </h1>

                <div style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                    Por {articulo.autor} · {new Date(articulo.fecha).toLocaleDateString('es-ES', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                    })}
                </div>
            </header>

            {/* Contenido del artículo */}
            <article style={{
                color: 'var(--color-text-main)',
                lineHeight: 1.8,
                fontSize: '1.05rem',
            }}>
                {articulo.contenido.split('\n').map((parrafo: string, i: number) => {
                    if (parrafo.startsWith('## ')) {
                        return <h2 key={i} style={{ fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem' }}>{parrafo.replace('## ', '')}</h2>;
                    }
                    if (parrafo.startsWith('### ')) {
                        return <h3 key={i} style={{ fontSize: '1.2rem', marginTop: '1.5rem', marginBottom: '0.75rem' }}>{parrafo.replace('### ', '')}</h3>;
                    }
                    if (parrafo.startsWith('- ')) {
                        return <li key={i} style={{ marginLeft: '1.5rem', marginBottom: '0.5rem' }}>{parrafo.replace('- ', '')}</li>;
                    }
                    if (parrafo.match(/^\d+\./)) {
                        return <li key={i} style={{ marginLeft: '1.5rem', marginBottom: '0.5rem' }}>{parrafo}</li>;
                    }
                    if (parrafo.startsWith('|')) {
                        return null; // Skip table rows for simplicity
                    }
                    if (parrafo.trim()) {
                        return <p key={i} style={{ marginBottom: '1rem' }}>{parrafo}</p>;
                    }
                    return null;
                })}
            </article>

            {/* CTA */}
            <div style={{
                marginTop: '3rem',
                padding: '2rem',
                background: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
                borderRadius: 'var(--radius-lg)',
                textAlign: 'center',
            }}>
                <h3 style={{ marginBottom: '1rem', color: 'var(--color-text-main)' }}>
                    ¿Necesitas ayuda con tu sanitario descatalogado?
                </h3>
                <a
                    href="https://wa.me/34653942261"
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
                    📲 Consultar por WhatsApp
                </a>
            </div>

            {/* Volver al blog */}
            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                <Link href="/blog" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
                    ← Volver al Blog
                </Link>
            </div>
        </main>
    );
}
