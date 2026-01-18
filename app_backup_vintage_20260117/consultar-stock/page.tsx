'use client';

import { useState } from 'react';
import styles from './page.module.css';

export default function ConsultarStockPage() {
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [fileName, setFileName] = useState<string>('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFileName(e.target.files[0].name);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('sending');

        try {
            const formData = new FormData(e.currentTarget);
            const data = Object.fromEntries(formData.entries());

            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: data.name,
                    email: data.email,
                    message: data.message,
                    hasImage: fileName ? 'Sí' : 'No'
                }),
            });

            if (!response.ok) throw new Error('Error en la solicitud');

            setStatus('success');
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };

    return (
        <main className={styles.pageContainer}>
            <div className={styles.wrapper}>
                <div className={styles.info}>
                    <h1 className={styles.title}>¿No encuentras lo que buscas?</h1>
                    <p className={styles.subtitle}>
                        Empresa de referencia para nuestros clientes dentro del sector de aparatos sanitarios descatalogados.
                        <br /><br />
                        Nuestro equipo de expertos te ayudará a localizar la pieza exacta.
                        Rellena el formulario y si es posible, <strong>adjunta una foto</strong> de la pieza que necesitas.
                    </p>
                </div>

                <form className={`${styles.form} glass-panel`} onSubmit={handleSubmit}>
                    <div className={styles.field}>
                        <label htmlFor="name">Nombre Completo</label>
                        <input type="text" id="name" name="name" required placeholder="Tu nombre" />
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" required placeholder="tu@email.com" />
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="message">¿Qué pieza necesitas?</label>
                        <textarea id="message" name="message" rows={4} required placeholder="Marca, modelo, color, medidas..."></textarea>
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="image">
                            Adjuntar Foto
                            <span className={styles.optional}>(Opcional, pero recomendado)</span>
                        </label>
                        <div className={styles.fileInputWrapper}>
                            <input
                                type="file"
                                name="image"
                                id="image"
                                accept="image/*"
                                className={styles.fileInput}
                                onChange={handleFileChange}
                                title="Seleccionar imagen"
                            />
                            <div className={styles.fileInputLabel}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                                    <polyline points="21 15 16 10 5 21"></polyline>
                                </svg>
                                <span>{fileName || 'Haz clic o arrastra una imagen aquí'}</span>
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className={styles.submitButton}
                        disabled={status === 'sending'}
                    >
                        {status === 'sending' ? 'Enviando...' : 'Solicitar Consulta'}
                    </button>

                    {status === 'success' && (
                        <p className={styles.successMsg}>¡Solicitud enviada! Te responderemos en breve.</p>
                    )}

                    {status === 'error' && (
                        <p className={styles.errorMsg}>Error al enviar. Por favor, inténtalo de nuevo.</p>
                    )}
                </form>
            </div>
        </main>
    );
}
