/**
 * =============================================================================
 * RARITY UTILITY MODULE
 * =============================================================================
 * 
 * Centralized logic for product rarity display across the application.
 * Rarity indicates how difficult it is to find a discontinued product.
 * 
 * Scale: 1 (Common/Available) → 5 (Extremely Rare/Collector's Item)
 * 
 * @module lib/rarity
 * @author Saneamientos Descatalogados Dev Team
 * @since 1.0.0
 */

/**
 * Rarity information object containing display data.
 * 
 * @interface RarityInfo
 * @property {number} level - Numeric rarity level (1-5)
 * @property {string} label - Human-readable description in Spanish
 * @property {string} color - Hex color code for visual indicators
 * @property {string} emoji - Emoji icon for quick visual recognition
 */
export interface RarityInfo {
    level: number;
    label: string;
    color: string;
    emoji: string;
}

/**
 * Mapping of rarity levels to their display properties.
 * Used internally for consistent rarity representation.
 * 
 * @constant
 * @private
 */
const RARITY_CONFIG: Record<number, Omit<RarityInfo, 'level'>> = {
    5: { label: 'Joya - Extremadamente Raro', color: '#e91e63', emoji: '💎' },
    4: { label: 'Muy Difícil de Encontrar', color: '#ff5722', emoji: '🔥' },
    3: { label: 'Raro', color: '#ff9800', emoji: '✨' },
    2: { label: 'Poco Común', color: '#2196f3', emoji: '🔎' },
    1: { label: 'Disponible', color: '#4caf50', emoji: '✓' },
};

/**
 * Get complete rarity information for display purposes.
 * 
 * This function returns all display data needed to render rarity indicators
 * in product cards, detail pages, and badges.
 * 
 * @param {number} rarity - Rarity level from 1-5 (values outside range default to 1)
 * @returns {RarityInfo} Complete rarity display information
 * 
 * @example
 * ```tsx
 * const info = getRarityInfo(5);
 * // Returns: { level: 5, label: 'Joya - Extremadamente Raro', color: '#e91e63', emoji: '💎' }
 * 
 * // Usage in component:
 * <span style={{ color: info.color }}>
 *   {info.emoji} {info.label}
 * </span>
 * ```
 * 
 * @example
 * ```tsx
 * // Rendering star rating
 * const info = getRarityInfo(product.rarity);
 * return (
 *   <div>
 *     {'★'.repeat(info.level)}{'☆'.repeat(5 - info.level)}
 *     <span>{info.label}</span>
 *   </div>
 * );
 * ```
 */
export function getRarityInfo(rarity: number): RarityInfo {
    // Clamp rarity to valid range and default to 1 for invalid values
    const validRarity = Math.max(1, Math.min(5, Math.floor(rarity))) || 1;
    const config = RARITY_CONFIG[validRarity] || RARITY_CONFIG[1];

    return {
        level: validRarity,
        ...config,
    };
}

/**
 * Get a compact badge for catalog/grid views.
 * 
 * Only returns a badge for rare items (rarity >= 3) to avoid visual clutter.
 * Common items (rarity 1-2) return null and should not display a badge.
 * 
 * @param {number} rarity - Rarity level from 1-5
 * @returns {{ text: string; color: string } | null} Badge info or null for common items
 * 
 * @example
 * ```tsx
 * const badge = getRarityBadge(product.rarity);
 * 
 * return (
 *   <div className="product-card">
 *     {badge && (
 *       <span className="badge" style={{ background: badge.color }}>
 *         {badge.text}
 *       </span>
 *     )}
 *   </div>
 * );
 * ```
 */
export function getRarityBadge(rarity: number): { text: string; color: string } | null {
    // Only show badges for genuinely rare items (rarity >= 3)
    // This prevents badge fatigue in the catalog view
    if (rarity >= 5) return { text: '💎 Joya', color: '#e91e63' };
    if (rarity === 4) return { text: '🔥 Muy Raro', color: '#ff5722' };
    if (rarity === 3) return { text: '✨ Raro', color: '#ff9800' };

    // Return null for common items - no badge needed
    return null;
}

/**
 * Get CSS class name for rarity-based styling.
 * 
 * Use this to apply rarity-specific styles from CSS modules.
 * 
 * @param {number} rarity - Rarity level from 1-5
 * @returns {string} CSS class name like 'rarityLevel3'
 * 
 * @example
 * ```tsx
 * import styles from './product.module.css';
 * 
 * const className = getRarityClassName(product.rarity);
 * return <span className={styles[className]}>{info.label}</span>;
 * ```
 */
export function getRarityClassName(rarity: number): string {
    const validRarity = Math.max(1, Math.min(5, Math.floor(rarity))) || 1;
    return `rarityLevel${validRarity}`;
}
