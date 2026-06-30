import { describe, it, expect } from 'vitest';
import { isValidNumber, isValidNumberFormat, isValidCategory, isValidUnit } from '../utils/validators.js';

describe('Validators', () => {
    describe('isValidNumber', () => {
        it('returns true for valid numbers', () => {
            expect(isValidNumber(123)).toBe(true);
            expect(isValidNumber('123.45')).toBe(true);
            expect(isValidNumber('1e-5')).toBe(true);
            expect(isValidNumber(0)).toBe(true);
        });

        it('returns false for invalid numbers', () => {
            expect(isValidNumber(null)).toBe(false);
            expect(isValidNumber(undefined)).toBe(false);
            expect(isValidNumber('')).toBe(false);
            expect(isValidNumber('abc')).toBe(false);
            expect(isValidNumber(NaN)).toBe(false);
        });
    });

    describe('isValidNumberFormat', () => {
        it('returns true for valid formats (including partial typing)', () => {
            expect(isValidNumberFormat('123')).toBe(true);
            expect(isValidNumberFormat('-123')).toBe(true);
            expect(isValidNumberFormat('123.45')).toBe(true);
            expect(isValidNumberFormat('.45')).toBe(true);
            expect(isValidNumberFormat('1e5')).toBe(true);
            expect(isValidNumberFormat('-1.5e-10')).toBe(true);
            expect(isValidNumberFormat('12e')).toBe(true); // Partial typing
        });

        it('returns false for invalid formats', () => {
            expect(isValidNumberFormat('12.34.56')).toBe(false);
            expect(isValidNumberFormat('abc')).toBe(false);
            expect(isValidNumberFormat('12ee')).toBe(false);
        });
    });
});
