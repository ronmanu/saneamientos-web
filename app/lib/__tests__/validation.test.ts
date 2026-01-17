/**
 * =============================================================================
 * VALIDATION MODULE TESTS
 * =============================================================================
 * 
 * Unit tests for the validation module including Zod schemas and sanitization.
 */

import { ContactFormSchema, sanitizeString, StockInquirySchema } from '../validation';

describe('ContactFormSchema', () => {
    describe('valid data', () => {
        it('should accept valid contact form data', () => {
            const validData = {
                name: 'Juan García',
                email: 'juan@example.com',
                message: 'Estoy interesado en un inodoro Roca Victoria.',
            };

            const result = ContactFormSchema.safeParse(validData);
            expect(result.success).toBe(true);
        });

        it('should accept data with optional hasImage field', () => {
            const validData = {
                name: 'María López',
                email: 'maria@test.com',
                message: 'Tengo fotos del modelo que busco.',
                hasImage: 'Sí',
            };

            const result = ContactFormSchema.safeParse(validData);
            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.hasImage).toBe('Sí');
            }
        });

        it('should trim whitespace from name and message', () => {
            const dataWithWhitespace = {
                name: '  Pedro Martínez  ',
                email: 'pedro@test.com',
                message: '   Necesito un bidet descatalogado.   ',
            };

            const result = ContactFormSchema.safeParse(dataWithWhitespace);
            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.name).toBe('Pedro Martínez');
                expect(result.data.message).toBe('Necesito un bidet descatalogado.');
            }
        });
    });

    describe('invalid data', () => {
        it('should reject name shorter than 2 characters', () => {
            const invalidData = {
                name: 'A',
                email: 'test@test.com',
                message: 'Este es un mensaje válido.',
            };

            const result = ContactFormSchema.safeParse(invalidData);
            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.flatten().fieldErrors.name).toBeDefined();
            }
        });

        it('should reject name longer than 100 characters', () => {
            const invalidData = {
                name: 'A'.repeat(101),
                email: 'test@test.com',
                message: 'Este es un mensaje válido.',
            };

            const result = ContactFormSchema.safeParse(invalidData);
            expect(result.success).toBe(false);
        });

        it('should reject invalid email format', () => {
            const invalidData = {
                name: 'Juan Test',
                email: 'not-an-email',
                message: 'Este es un mensaje válido.',
            };

            const result = ContactFormSchema.safeParse(invalidData);
            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.flatten().fieldErrors.email).toBeDefined();
            }
        });

        it('should reject message shorter than 10 characters', () => {
            const invalidData = {
                name: 'Juan Test',
                email: 'juan@test.com',
                message: 'Hola',
            };

            const result = ContactFormSchema.safeParse(invalidData);
            expect(result.success).toBe(false);
        });

        it('should reject message longer than 2000 characters', () => {
            const invalidData = {
                name: 'Juan Test',
                email: 'juan@test.com',
                message: 'A'.repeat(2001),
            };

            const result = ContactFormSchema.safeParse(invalidData);
            expect(result.success).toBe(false);
        });

        it('should reject missing required fields', () => {
            const result = ContactFormSchema.safeParse({});
            expect(result.success).toBe(false);
            if (!result.success) {
                const errors = result.error.flatten().fieldErrors;
                expect(errors.name).toBeDefined();
                expect(errors.email).toBeDefined();
                expect(errors.message).toBeDefined();
            }
        });
    });
});

describe('sanitizeString', () => {
    it('should escape < and > characters', () => {
        const input = '<script>alert("xss")</script>';
        const result = sanitizeString(input);
        expect(result).toBe('&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;');
        expect(result).not.toContain('<');
        expect(result).not.toContain('>');
    });

    it('should escape double quotes', () => {
        const input = 'He said "hello"';
        const result = sanitizeString(input);
        expect(result).toBe('He said &quot;hello&quot;');
    });

    it('should escape single quotes', () => {
        const input = "It's a test";
        const result = sanitizeString(input);
        expect(result).toBe("It&#x27;s a test");
    });

    it('should trim whitespace', () => {
        const input = '   hello world   ';
        const result = sanitizeString(input);
        expect(result).toBe('hello world');
    });

    it('should return empty string for null input', () => {
        const result = sanitizeString(null);
        expect(result).toBe('');
    });

    it('should return empty string for undefined input', () => {
        const result = sanitizeString(undefined);
        expect(result).toBe('');
    });

    it('should return empty string for number input', () => {
        const result = sanitizeString(123);
        expect(result).toBe('');
    });

    it('should escape complex XSS attempts making them harmless', () => {
        const input = '<img src="x" onerror="alert(\'xss\')">';
        const result = sanitizeString(input);
        // The string is escaped, making < and > safe
        expect(result).toContain('&lt;img');
        expect(result).toContain('&gt;');
        // Original < > characters are gone
        expect(result).not.toContain('<');
        expect(result).not.toContain('>');
    });
});

describe('StockInquirySchema', () => {
    it('should extend ContactFormSchema with product fields', () => {
        const validData = {
            name: 'Ana Test',
            email: 'ana@test.com',
            message: 'Busco este producto específico.',
            productId: 'roca-1',
            productName: 'Inodoro Victoria',
        };

        const result = StockInquirySchema.safeParse(validData);
        expect(result.success).toBe(true);
        if (result.success) {
            expect(result.data.productId).toBe('roca-1');
            expect(result.data.productName).toBe('Inodoro Victoria');
        }
    });

    it('should allow product fields to be optional', () => {
        const validData = {
            name: 'Ana Test',
            email: 'ana@test.com',
            message: 'Busco un producto pero no sé la referencia.',
        };

        const result = StockInquirySchema.safeParse(validData);
        expect(result.success).toBe(true);
    });
});
