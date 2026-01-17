'use client';

/**
 * =============================================================================
 * GLOBAL ERROR BOUNDARY
 * =============================================================================
 * 
 * Catches unhandled errors in the application and displays a user-friendly
 * error message with option to retry.
 * 
 * This is a React Error Boundary wrapped for Next.js App Router.
 */

import { useEffect } from 'react';

interface ErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
    useEffect(() => {
        // Log error to console in development
        // In production, you would send this to an error tracking service
        console.error('Application error:', error);
    }, [error]);

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '50vh',
            padding: '2rem',
            textAlign: 'center',
        }}>
            <h2 style={{
                fontSize: '1.5rem',
                marginBottom: '1rem',
                color: 'var(--color-primary, #2563eb)'
            }}>
                ¡Algo salió mal!
            </h2>
            <p style={{
                marginBottom: '1.5rem',
                color: 'var(--color-text-muted, #6b7280)'
            }}>
                Ha ocurrido un error inesperado. Por favor, inténtalo de nuevo.
            </p>
            <button
                onClick={reset}
                style={{
                    padding: '0.75rem 1.5rem',
                    background: 'var(--color-primary, #2563eb)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: 600,
                }}
            >
                Intentar de nuevo
            </button>
        </div>
    );
}
