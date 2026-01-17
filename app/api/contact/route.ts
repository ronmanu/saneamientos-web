/**
 * =============================================================================
 * CONTACT API ENDPOINT
 * =============================================================================
 * 
 * Handles contact form submissions from the website.
 * Implements validation, sanitization, rate limiting, and forwards
 * data to an n8n webhook for further processing.
 * 
 * @route POST /api/contact
 * @module api/contact
 * @author Saneamientos Descatalogados Dev Team
 * @since 1.0.0
 */

import { NextResponse } from 'next/server';
import { ContactFormSchema, sanitizeString } from '../../lib/validation';

// =============================================================================
// RATE LIMITING CONFIGURATION
// =============================================================================

/**
 * In-memory storage for rate limiting.
 * 
 * @warning This is a simple implementation suitable for single-server deployments.
 * For production serverless/multi-instance deployments, use Redis or Upstash.
 * 
 * @private
 */
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

/** Maximum number of requests allowed per time window */
const RATE_LIMIT_MAX = 5;

/** Time window in milliseconds (1 minute) */
const RATE_LIMIT_WINDOW = 60 * 1000;

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Checks if an IP address has exceeded the rate limit.
 * 
 * Uses a sliding window approach where each IP is tracked with a request count
 * and reset time. The window resets after RATE_LIMIT_WINDOW milliseconds.
 * 
 * @param {string} ip - The client IP address to check
 * @returns {boolean} True if the IP is rate limited, false otherwise
 * 
 * @example
 * ```typescript
 * if (isRateLimited(clientIp)) {
 *   return { error: 'Too many requests' };
 * }
 * ```
 * 
 * @private
 */
function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const record = rateLimitMap.get(ip);

    // No record or expired window - create new tracking entry
    if (!record || now > record.resetTime) {
        rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
        return false;
    }

    // Check if limit exceeded
    if (record.count >= RATE_LIMIT_MAX) {
        return true;
    }

    // Increment counter
    record.count++;
    return false;
}

/**
 * Extracts client IP address from request headers.
 * 
 * Handles both direct connections and proxied requests (behind load balancers).
 * Falls back to 'unknown' if no IP can be determined.
 * 
 * @param {Request} request - The incoming HTTP request
 * @returns {string} The client IP address or 'unknown'
 * 
 * @private
 */
function getClientIp(request: Request): string {
    // x-forwarded-for may contain multiple IPs; first is the original client
    const forwarded = request.headers.get('x-forwarded-for');
    return forwarded?.split(',')[0]?.trim() ?? 'unknown';
}

// =============================================================================
// API HANDLER
// =============================================================================

/**
 * Handles POST requests to the contact form endpoint.
 * 
 * Processing flow:
 * 1. Extract client IP for rate limiting
 * 2. Check rate limit (max 5 requests per minute)
 * 3. Parse and validate request body with Zod
 * 4. Sanitize all user inputs to prevent XSS
 * 5. Forward data to n8n webhook (if configured)
 * 6. Return appropriate response
 * 
 * @param {Request} request - The incoming HTTP request
 * @returns {Promise<NextResponse>} JSON response with status
 * 
 * @example
 * ```typescript
 * // Client-side usage:
 * const response = await fetch('/api/contact', {
 *   method: 'POST',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify({ name, email, message })
 * });
 * ```
 * 
 * @throws Returns 400 for validation errors
 * @throws Returns 429 for rate limit exceeded
 * @throws Returns 500 for server errors (details not exposed to client)
 */
export async function POST(request: Request) {
    try {
        // ---------------------------------------------------------------------
        // Step 1: Extract client IP for rate limiting
        // ---------------------------------------------------------------------
        const ip = getClientIp(request);

        // ---------------------------------------------------------------------
        // Step 2: Check rate limit
        // ---------------------------------------------------------------------
        if (isRateLimited(ip)) {
            return NextResponse.json(
                { error: 'Demasiadas solicitudes. Inténtalo de nuevo en un minuto.' },
                { status: 429 }
            );
        }

        // ---------------------------------------------------------------------
        // Step 3: Parse and validate request body
        // ---------------------------------------------------------------------
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

        // ---------------------------------------------------------------------
        // Step 4: Sanitize validated data
        // ---------------------------------------------------------------------
        const sanitizedData = {
            name: sanitizeString(validationResult.data.name),
            email: sanitizeString(validationResult.data.email),
            message: sanitizeString(validationResult.data.message),
            hasImage: validationResult.data.hasImage ?? 'No',
        };

        // ---------------------------------------------------------------------
        // Step 5: Forward to n8n webhook
        // ---------------------------------------------------------------------
        const N8N_WEBHOOK_URL = process.env.N8N_CONTACT_WEBHOOK_URL;

        // Development fallback: log data if webhook not configured
        if (!N8N_WEBHOOK_URL) {
            if (process.env.NODE_ENV === 'development') {
                console.log('[DEV] Contact form submission:', sanitizedData);
            }
            return NextResponse.json(
                { message: 'Solicitud recibida' },
                { status: 200 }
            );
        }

        // Send to n8n
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
            throw new Error(`Webhook response status: ${response.status}`);
        }

        // ---------------------------------------------------------------------
        // Step 6: Return success response
        // ---------------------------------------------------------------------
        return NextResponse.json(
            { message: 'Solicitud enviada correctamente' },
            { status: 200 }
        );

    } catch (error) {
        // Log error securely - never expose internal details to client
        if (process.env.NODE_ENV === 'development') {
            console.error('[DEV] API Error:', error);
        }

        return NextResponse.json(
            { error: 'Error interno del servidor. Inténtalo de nuevo.' },
            { status: 500 }
        );
    }
}
