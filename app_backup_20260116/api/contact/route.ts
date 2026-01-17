import { NextResponse } from 'next/server';
import { ContactFormSchema, sanitizeString } from '../../lib/validation';

// Simple in-memory rate limiting (for production use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = 5; // Max requests
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute window

function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const record = rateLimitMap.get(ip);

    if (!record || now > record.resetTime) {
        rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
        return false;
    }

    if (record.count >= RATE_LIMIT_MAX) {
        return true;
    }

    record.count++;
    return false;
}

export async function POST(request: Request) {
    try {
        // Get client IP for rate limiting
        const forwarded = request.headers.get('x-forwarded-for');
        const ip = forwarded?.split(',')[0] ?? 'unknown';

        // Check rate limit
        if (isRateLimited(ip)) {
            return NextResponse.json(
                { error: 'Demasiadas solicitudes. Inténtalo de nuevo en un minuto.' },
                { status: 429 }
            );
        }

        // Parse and validate request body
        const body = await request.json();
        const validationResult = ContactFormSchema.safeParse(body);

        if (!validationResult.success) {
            return NextResponse.json(
                {
                    error: 'Datos inválidos',
                    details: validationResult.error.flatten().fieldErrors
                },
                { status: 400 }
            );
        }

        // Sanitize validated data
        const sanitizedData = {
            name: sanitizeString(validationResult.data.name),
            email: sanitizeString(validationResult.data.email),
            message: sanitizeString(validationResult.data.message),
            hasImage: validationResult.data.hasImage ?? 'No',
        };

        // URL de tu webhook de n8n (configurar en .env)
        const N8N_WEBHOOK_URL = process.env.N8N_CONTACT_WEBHOOK_URL;

        if (!N8N_WEBHOOK_URL) {
            // Log para desarrollo (en producción usar un logger apropiado)
            if (process.env.NODE_ENV === 'development') {
                console.log('[DEV] Contact form submission:', sanitizedData);
            }
            return NextResponse.json({ message: 'Solicitud recibida' }, { status: 200 });
        }

        const response = await fetch(N8N_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...sanitizedData,
                source: 'Web Saneamientos Descatalogados',
                timestamp: new Date().toISOString(),
                ip: ip !== 'unknown' ? ip : undefined,
            }),
        });

        if (!response.ok) {
            throw new Error('Error en la respuesta del webhook');
        }

        return NextResponse.json({ message: 'Solicitud enviada correctamente' }, { status: 200 });
    } catch (error) {
        // Log error securely (don't expose details to client)
        if (process.env.NODE_ENV === 'development') {
            console.error('[DEV] API Error:', error);
        }
        return NextResponse.json(
            { error: 'Error interno del servidor. Inténtalo de nuevo.' },
            { status: 500 }
        );
    }
}
