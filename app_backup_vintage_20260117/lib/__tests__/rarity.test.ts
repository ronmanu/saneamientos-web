/**
 * =============================================================================
 * RARITY MODULE TESTS
 * =============================================================================
 * 
 * Unit tests for the rarity utility functions.
 */

import { getRarityInfo, getRarityBadge, getRarityClassName } from '../rarity';

describe('getRarityInfo', () => {
    it('should return correct info for rarity level 5 (Joya)', () => {
        const info = getRarityInfo(5);
        expect(info.level).toBe(5);
        expect(info.label).toBe('Joya - Extremadamente Raro');
        expect(info.color).toBe('#e91e63');
        expect(info.emoji).toBe('💎');
    });

    it('should return correct info for rarity level 4', () => {
        const info = getRarityInfo(4);
        expect(info.level).toBe(4);
        expect(info.label).toBe('Muy Difícil de Encontrar');
        expect(info.color).toBe('#ff5722');
        expect(info.emoji).toBe('🔥');
    });

    it('should return correct info for rarity level 3', () => {
        const info = getRarityInfo(3);
        expect(info.level).toBe(3);
        expect(info.label).toBe('Raro');
        expect(info.color).toBe('#ff9800');
        expect(info.emoji).toBe('✨');
    });

    it('should return correct info for rarity level 2', () => {
        const info = getRarityInfo(2);
        expect(info.level).toBe(2);
        expect(info.label).toBe('Poco Común');
        expect(info.color).toBe('#2196f3');
        expect(info.emoji).toBe('🔎');
    });

    it('should return correct info for rarity level 1 (default)', () => {
        const info = getRarityInfo(1);
        expect(info.level).toBe(1);
        expect(info.label).toBe('Disponible');
        expect(info.color).toBe('#4caf50');
        expect(info.emoji).toBe('✓');
    });

    it('should clamp values above 5 to 5', () => {
        const info = getRarityInfo(10);
        expect(info.level).toBe(5);
        expect(info.label).toBe('Joya - Extremadamente Raro');
    });

    it('should clamp values below 1 to 1', () => {
        const info = getRarityInfo(0);
        expect(info.level).toBe(1);
        expect(info.label).toBe('Disponible');
    });

    it('should handle negative values', () => {
        const info = getRarityInfo(-5);
        expect(info.level).toBe(1);
    });

    it('should handle decimal values by flooring', () => {
        const info = getRarityInfo(3.7);
        expect(info.level).toBe(3);
        expect(info.label).toBe('Raro');
    });

    it('should handle NaN by defaulting to 1', () => {
        const info = getRarityInfo(NaN);
        expect(info.level).toBe(1);
    });
});

describe('getRarityBadge', () => {
    it('should return Joya badge for rarity 5', () => {
        const badge = getRarityBadge(5);
        expect(badge).not.toBeNull();
        expect(badge?.text).toBe('💎 Joya');
        expect(badge?.color).toBe('#e91e63');
    });

    it('should return Muy Raro badge for rarity 4', () => {
        const badge = getRarityBadge(4);
        expect(badge).not.toBeNull();
        expect(badge?.text).toBe('🔥 Muy Raro');
        expect(badge?.color).toBe('#ff5722');
    });

    it('should return Raro badge for rarity 3', () => {
        const badge = getRarityBadge(3);
        expect(badge).not.toBeNull();
        expect(badge?.text).toBe('✨ Raro');
        expect(badge?.color).toBe('#ff9800');
    });

    it('should return null for rarity 2 (common)', () => {
        const badge = getRarityBadge(2);
        expect(badge).toBeNull();
    });

    it('should return null for rarity 1 (common)', () => {
        const badge = getRarityBadge(1);
        expect(badge).toBeNull();
    });

    it('should return Joya badge for rarity above 5', () => {
        const badge = getRarityBadge(6);
        expect(badge?.text).toBe('💎 Joya');
    });
});

describe('getRarityClassName', () => {
    it('should return correct class name for each level', () => {
        expect(getRarityClassName(1)).toBe('rarityLevel1');
        expect(getRarityClassName(2)).toBe('rarityLevel2');
        expect(getRarityClassName(3)).toBe('rarityLevel3');
        expect(getRarityClassName(4)).toBe('rarityLevel4');
        expect(getRarityClassName(5)).toBe('rarityLevel5');
    });

    it('should clamp values to valid range', () => {
        expect(getRarityClassName(0)).toBe('rarityLevel1');
        expect(getRarityClassName(10)).toBe('rarityLevel5');
    });

    it('should floor decimal values', () => {
        expect(getRarityClassName(3.9)).toBe('rarityLevel3');
    });
});
