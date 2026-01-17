/**
 * Rarity utility functions
 * Centralized logic for product rarity display
 */

export interface RarityInfo {
    level: number;
    label: string;
    color: string;
    emoji: string;
}

/**
 * Get rarity information for display
 * @param rarity - Rarity level 1-5 (1 = common, 5 = extremely rare)
 */
export function getRarityInfo(rarity: number): RarityInfo {
    switch (rarity) {
        case 5:
            return { level: 5, label: 'Joya - Extremadamente Raro', color: '#e91e63', emoji: '💎' };
        case 4:
            return { level: 4, label: 'Muy Difícil de Encontrar', color: '#ff5722', emoji: '🔥' };
        case 3:
            return { level: 3, label: 'Raro', color: '#ff9800', emoji: '✨' };
        case 2:
            return { level: 2, label: 'Poco Común', color: '#2196f3', emoji: '🔎' };
        default:
            return { level: 1, label: 'Disponible', color: '#4caf50', emoji: '✓' };
    }
}

/**
 * Get rarity badge for catalog view (returns null for common items)
 */
export function getRarityBadge(rarity: number): { text: string; color: string } | null {
    if (rarity >= 5) return { text: '💎 Joya', color: '#e91e63' };
    if (rarity === 4) return { text: '🔥 Muy Raro', color: '#ff5722' };
    if (rarity === 3) return { text: '✨ Raro', color: '#ff9800' };
    return null; // Don't show badge for common items
}
