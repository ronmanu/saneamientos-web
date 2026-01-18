import { z } from 'zod';

/**
 * =============================================================================
 * VALIDATION MODULE
 * =============================================================================
 * 
 * Provides server-side validation schemas using Zod and utility functions
 * for input sanitization to prevent XSS attacks.
 * 
 * @module lib/validation
 * @author Saneamientos Descatalogados Dev Team
 * @since 1.0.0
 */

/**
 * Zod schema for validating contact form submissions.
 * 
 * This schema validates incoming data from the contact form,
 * ensuring all required fields meet the specified constraints.
 * 
 * @example
 * ```typescript
 * const result = ContactFormSchema.safeParse(formData);
 * if (!result.success) {
 *   console.error(result.error.flatten().fieldErrors);
 * }
 * ```
 * 
 * @property {string} name - User's full name (2-100 characters, trimmed)
 * @property {string} email - Valid email address (max 254 characters per RFC 5321)
 * @property {string} message - Contact message (10-2000 characters, trimmed)
 * @property {string} [hasImage] - Optional flag indicating if user has an image to share
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

/**
 * TypeScript type inferred from ContactFormSchema.
 * Use this type for typed form data handling.
 * 
 * @typedef {Object} ContactFormData
 * @property {string} name - User's full name
 * @property {string} email - User's email address
 * @property {string} message - Contact message
 * @property {string} [hasImage] - Optional image flag
 */
export type ContactFormData = z.infer<typeof ContactFormSchema>;

/**
 * Sanitizes a string to prevent XSS (Cross-Site Scripting) attacks.
 * 
 * This function escapes potentially dangerous HTML characters that could
 * be used to inject malicious scripts into the page.
 * 
 * Characters escaped:
 * - `<` → `&lt;`
 * - `>` → `&gt;`
 * - `"` → `&quot;`
 * - `'` → `&#x27;`
 * 
 * @param {unknown} str - The input to sanitize (must be a string, otherwise returns '')
 * @returns {string} The sanitized string with HTML entities escaped
 * 
 * @example
 * ```typescript
 * sanitizeString('<script>alert("xss")</script>');
 * // Returns: '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'
 * 
 * sanitizeString(null);
 * // Returns: ''
 * ```
 * 
 * @security This is a basic XSS prevention measure. For user-generated HTML content,
 * consider using a dedicated library like DOMPurify.
 */
export function sanitizeString(str: unknown): string {
    // Return empty string for non-string inputs
    if (typeof str !== 'string') return '';

    return str
        // Escape HTML entities to prevent script injection
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        // Remove leading/trailing whitespace
        .trim();
}

/**
 * Schema for stock inquiry form (future use)
 * Extends ContactFormSchema with product-specific fields
 */
export const StockInquirySchema = ContactFormSchema.extend({
    productId: z.string().optional(),
    productName: z.string().optional(),
});

export type StockInquiryData = z.infer<typeof StockInquirySchema>;
