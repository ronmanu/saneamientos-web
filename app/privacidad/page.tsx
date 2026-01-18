/**
 * =============================================================================
 * PÁGINA DE POLÍTICA DE PRIVACIDAD Y AVISO LEGAL
 * =============================================================================
 */

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Política de Privacidad y Aviso Legal | Sanitarios Descatalogados',
    description: 'Información sobre el tratamiento de datos personales, política de privacidad y aviso legal de Sanitarios Descatalogados.',
};

export default function PrivacidadPage() {
    return (
        <main style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: 'calc(var(--header-height) + 2rem) 2rem 4rem',
        }}>
            <h1 style={{
                fontSize: '2.5rem',
                marginBottom: '2rem',
                color: 'var(--color-text-main)',
            }}>
                Política de Privacidad y Aviso Legal
            </h1>

            <section style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>
                    1. Responsable del Tratamiento
                </h2>
                <p style={{ lineHeight: 1.7, color: 'var(--color-text-muted)' }}>
                    <strong>Razón Social:</strong> Sanitarios Descatalogados<br />
                    <strong>Dirección:</strong> C/ Virgen de Lluc, 88z, 28027 Madrid<br />
                    <strong>Email:</strong> gamoservicios@gmail.com<br />
                    <strong>Teléfono:</strong> 653 94 22 61
                </p>
            </section>

            <section style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>
                    2. Finalidad del Tratamiento de Datos
                </h2>
                <p style={{ lineHeight: 1.7, color: 'var(--color-text-muted)', marginBottom: '1rem' }}>
                    Los datos personales que nos facilite a través de nuestros formularios de contacto o WhatsApp serán tratados con las siguientes finalidades:
                </p>
                <ul style={{ lineHeight: 1.7, color: 'var(--color-text-muted)', paddingLeft: '1.5rem' }}>
                    <li>Gestionar sus consultas y solicitudes de información sobre productos.</li>
                    <li>Enviar presupuestos personalizados.</li>
                    <li>Tramitar pedidos y gestionar envíos.</li>
                    <li>Mantenerle informado sobre disponibilidad de productos de su interés.</li>
                </ul>
            </section>

            <section style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>
                    3. Legitimación
                </h2>
                <p style={{ lineHeight: 1.7, color: 'var(--color-text-muted)' }}>
                    La base legal para el tratamiento de sus datos es el consentimiento del interesado y la ejecución de un contrato o precontrato (solicitud de presupuesto, compra de productos).
                </p>
            </section>

            <section style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>
                    4. Conservación de Datos
                </h2>
                <p style={{ lineHeight: 1.7, color: 'var(--color-text-muted)' }}>
                    Sus datos se conservarán mientras dure la relación comercial y durante los plazos legalmente establecidos para atender responsabilidades derivadas del tratamiento.
                </p>
            </section>

            <section style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>
                    5. Derechos del Usuario
                </h2>
                <p style={{ lineHeight: 1.7, color: 'var(--color-text-muted)', marginBottom: '1rem' }}>
                    Usted tiene derecho a:
                </p>
                <ul style={{ lineHeight: 1.7, color: 'var(--color-text-muted)', paddingLeft: '1.5rem' }}>
                    <li>Acceder a sus datos personales.</li>
                    <li>Solicitar la rectificación de datos inexactos.</li>
                    <li>Solicitar la supresión de sus datos.</li>
                    <li>Solicitar la limitación del tratamiento.</li>
                    <li>Oponerse al tratamiento.</li>
                    <li>Derecho a la portabilidad de los datos.</li>
                </ul>
                <p style={{ lineHeight: 1.7, color: 'var(--color-text-muted)', marginTop: '1rem' }}>
                    Para ejercer estos derechos, puede contactar con nosotros en <a href="mailto:gamoservicios@gmail.com" style={{ color: 'var(--color-primary)' }}>gamoservicios@gmail.com</a>.
                </p>
            </section>

            <section style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>
                    6. Cookies
                </h2>
                <p style={{ lineHeight: 1.7, color: 'var(--color-text-muted)' }}>
                    Este sitio web utiliza únicamente cookies técnicas necesarias para su correcto funcionamiento. No utilizamos cookies de seguimiento ni publicitarias de terceros.
                </p>
            </section>

            <section style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>
                    7. Propiedad Intelectual
                </h2>
                <p style={{ lineHeight: 1.7, color: 'var(--color-text-muted)' }}>
                    Todos los contenidos de este sitio web (textos, imágenes, logos, diseños) son propiedad de Sanitarios Descatalogados o se utilizan con autorización de sus propietarios. Queda prohibida su reproducción sin autorización expresa.
                </p>
            </section>

            <p style={{
                marginTop: '3rem',
                padding: '1rem',
                background: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.9rem',
                color: 'var(--color-text-muted)',
            }}>
                Última actualización: Enero 2026
            </p>
        </main>
    );
}
