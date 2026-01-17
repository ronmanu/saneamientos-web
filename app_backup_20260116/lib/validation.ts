import { z } from 'zod';

/**
 * Schema for contact form validation
 */
export const ContactFormSchema = z.object({
    name: z.string()
        .min(2, 'El nombre debe tener al menos 2 caracteres')
        .max(100, 'El nombre no puede superar 100 caracteres')
        .trim(),
    email: z.string()
        .email('Email inválido')
        .max(254, 'Email demasiado largo'),
    message: z.string()
        .min(10, 'El mensaje debe tener al menos 10 caracteres')
        .max(2000, 'El mensaje no puede superar 2000 caracteres')
        .trim(),
    hasImage: z.string().optional(),
});

export type ContactFormData = z.infer<typeof ContactFormSchema>;

/**
 * Sanitize string to prevent XSS
 */
export function sanitizeString(str: unknown): string {
    if (typeof str !== 'string') return '';
    return str
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .trim();
}
