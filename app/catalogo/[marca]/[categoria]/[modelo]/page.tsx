/**
 * =============================================================================
 * PÁGINA DE PRODUCTO DINÁMICO - SEO OPTIMIZADO
 * =============================================================================
 * 
 * Ruta: /catalogo/[marca]/[categoria]/[modelo]
 * Ejemplo: /catalogo/roca/inodoros/victoria
 * 
 * Características:
 * - Metadatos dinámicos para SEO
 * - Schema.org JSON-LD para productos
 * - Datos reales desde el Excel convertido a JSON
 */

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
    getProductoByRuta,
    getStaticProductParams,
    getProductosRelacionados,
    Producto
} from '@/app/data/productos';
import { getImagenProducto } from '@/app/data/imagenes';
import styles from './page.module.css';

interface ProductPageProps {
    params: Promise<{ marca: string; categoria: string; modelo: string }>;
}

// Función auxiliar para formatear texto
function formatearTexto(slug: string): string {
    return slug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

// Generación de rutas estáticas para todos los productos
export async function generateStaticParams() {
    return getStaticProductParams();
}

// Generación de metadatos dinámicos para SEO
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
    const { marca, categoria, modelo } = await params;
    const producto = getProductoByRuta(marca, categoria, modelo);

    if (!producto) {
        return {
            title: 'Producto no encontrado | Sanitarios Descatalogados',
        };
    }

    const marcaFormateada = formatearTexto(marca);
    const categoriaFormateada = formatearTexto(categoria);

    return {
        title: `${producto.modelo} ${marcaFormateada} Descatalogado - Piezas Originales | Sanitarios Descatalogados`,
        description: `¿Buscas ${producto.modelo} de ${marcaFormateada}? ${producto.caracteristicas}. Tenemos piezas originales: tazas, tanques y tapas. Stock garantizado y envío inmediato.`,
        keywords: [
            `${producto.modelo} ${marcaFormateada}`,
            `${categoriaFormateada} ${marcaFormateada} descatalogados`,
            'repuestos sanitarios antiguos',
            `tapas ${categoriaFormateada.toLowerCase()} colores descatalogados`,
            `piezas ${marcaFormateada.toLowerCase()} originales`,
        ],
        alternates: {
            canonical: `https://www.aparatossanitariosdescatalogados.com${producto.url}`,
        },
        openGraph: {
            title: `${producto.modelo} ${marcaFormateada} - Stock Disponible`,
            description: producto.caracteristicas,
            url: `https://www.aparatossanitariosdescatalogados.com${producto.url}`,
            siteName: 'Sanitarios Descatalogados',
            type: 'website',
        },
    };
}

export default async function ProductoPage({ params }: ProductPageProps) {
    const { marca, categoria, modelo } = await params;
    const producto = getProductoByRuta(marca, categoria, modelo);

    if (!producto) {
        notFound();
    }

    const marcaFormateada = formatearTexto(marca);
    const categoriaFormateada = formatearTexto(categoria);
    const relacionados = getProductosRelacionados(producto, 4);
    const imagenProducto = getImagenProducto(producto.marcaSlug, producto.modeloSlug, producto.categoria);

    // Schema.org JSON-LD para productos
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: `${producto.modelo} ${producto.marca}`,
        description: producto.caracteristicas,
        brand: {
            '@type': 'Brand',
            name: producto.marca,
        },
        category: categoriaFormateada,
        offers: {
            '@type': 'Offer',
            availability: producto.situacion.toLowerCase().includes('descatalogado')
                ? 'https://schema.org/LimitedAvailability'
                : 'https://schema.org/InStock',
            priceCurrency: 'EUR',
            url: `https://www.aparatossanitariosdescatalogados.com${producto.url}`,
            seller: {
                '@type': 'Organization',
                name: 'Sanitarios Descatalogados',
            },
        },
    };

    // Número de WhatsApp para CTA
    const whatsappNumber = '34653942261';
    const whatsappMessage = encodeURIComponent(
        `Hola, estoy interesado en el ${producto.modelo} de ${producto.marca}. ¿Tienen disponibilidad?`
    );
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

    return (
        <main className={styles.container}>
            {/* Inyección de datos estructurados JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Breadcrumbs para navegación y SEO */}
            <nav className={styles.breadcrumbs} aria-label="Migas de pan">
                <Link href="/">Inicio</Link>
                <span className={styles.separator}>›</span>
                <Link href="/catalogo">Catálogo</Link>
                <span className={styles.separator}>›</span>
                <Link href={`/catalogo?marca=${marca}`}>{marcaFormateada}</Link>
                <span className={styles.separator}>›</span>
                <Link href={`/catalogo?marca=${marca}&categoria=${categoria}`}>{categoriaFormateada}</Link>
                <span className={styles.separator}>›</span>
                <span className={styles.current}>{producto.modelo}</span>
            </nav>

            {/* Contenido del producto */}
            <div className={styles.productGrid}>
                {/* Imagen del producto */}
                <div className={styles.imageContainer}>
                    <Image
                        src={imagenProducto}
                        alt={`${producto.modelo} ${producto.marca} - Sanitario descatalogado`}
                        width={500}
                        height={500}
                        className={styles.productImage}
                        priority
                    />
                </div>

                {/* Información del producto */}
                <div className={styles.productInfo}>
                    <span className={styles.marcaLabel}>{producto.marca}</span>

                    <h1 className={styles.productTitle}>
                        {producto.modelo}
                        <span className={styles.badge}>
                            {producto.situacion.toUpperCase()}
                        </span>
                    </h1>

                    <div className={styles.periodo}>
                        <strong>Período:</strong> {producto.periodo}
                    </div>

                    <div className={styles.tipoPrincipal}>
                        <strong>Tipo:</strong> {producto.tipoPrincipal}
                    </div>

                    {producto.codigo && producto.codigo !== '–' && (
                        <div className={styles.codigo}>
                            <strong>Código/Referencia:</strong> {producto.codigo}
                        </div>
                    )}

                    <p className={styles.caracteristicas}>
                        {producto.caracteristicas}
                    </p>

                    {/* Piezas y compatibilidades */}
                    <div className={styles.infoPanel}>
                        {producto.compatibilidades && (
                            <div className={styles.infoSection}>
                                <h3>Compatibilidades</h3>
                                <p>{producto.compatibilidades}</p>
                            </div>
                        )}

                        {producto.recambios && (
                            <div className={styles.infoSection}>
                                <h3>Recambios Disponibles</h3>
                                <p>{producto.recambios}</p>
                            </div>
                        )}

                        {producto.notas && (
                            <div className={styles.infoSection}>
                                <h3>Notas</h3>
                                <p>{producto.notas}</p>
                            </div>
                        )}
                    </div>

                    {/* CTA WhatsApp */}
                    <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.whatsappCta}
                    >
                        📲 Consultar Disponibilidad por WhatsApp
                    </a>

                    <p className={styles.ctaSubtext}>
                        ¿No sabes qué modelo es? Envíanos una foto y te ayudamos a identificarlo.
                    </p>
                </div>
            </div>

            {/* Texto SEO de categoría */}
            <section className={styles.seoSection}>
                <h2>{categoriaFormateada} {marcaFormateada} Descatalogados</h2>
                <p>
                    ¿Se te ha roto tu {categoriaFormateada.toLowerCase()} {marcaFormateada} antiguo y crees que la única solución es picar el suelo y cambiar todo el baño?
                    Antes de llamar al albañil, tenemos una noticia para ti: <strong>la mayoría de los problemas en sanitarios antiguos se resuelven cambiando solo la pieza dañada.</strong>
                </p>
                <p>
                    En <strong>Sanitarios Descatalogados</strong>, somos especialistas en localizar esos modelos que ya no se fabrican pero que siguen siendo el corazón de muchos hogares.
                    Contamos con stock real de los modelos más icónicos de {marcaFormateada}. Nuestros repuestos sanitarios antiguos son piezas originales recuperadas o de stock antiguo garantizado.
                </p>
            </section>

            {/* Productos relacionados */}
            {relacionados.length > 0 && (
                <section className={styles.relacionados}>
                    <h2>Productos Relacionados</h2>
                    <div className={styles.relacionadosGrid}>
                        {relacionados.map(rel => (
                            <Link key={rel.id} href={rel.url} className={styles.relacionadoCard}>
                                <div className={styles.relacionadoImage}>🚽</div>
                                <div className={styles.relacionadoInfo}>
                                    <span className={styles.relacionadoMarca}>{rel.marca}</span>
                                    <h3>{rel.modelo}</h3>
                                    <span className={styles.relacionadoPeriodo}>{rel.periodo}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}
        </main>
    );
}
