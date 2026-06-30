import { describe, it, expect } from 'vitest';
import { formatValue } from '../utils/formatters.js';
import Decimal from '../core/decimal-config.js';

describe('Formatters', () => {
    describe('formatValue', () => {
        it('returns 0 for invalid inputs', () => {
            expect(formatValue(null)).toBe('0');
            expect(formatValue(undefined)).toBe('0');
            expect(formatValue('abc')).toBe('0');
        });

        it('strips trailing zeros', () => {
            expect(formatValue(new Decimal('1.5000'))).toBe('1.5');
            expect(formatValue(new Decimal('1.000'))).toBe('1');
        });

        it('uses scientific notation for large numbers', () => {
            expect(formatValue(new Decimal('10000000000000000'))).toMatch(/1e\+?16/);
        });

        it('uses scientific notation for small numbers', () => {
            expect(formatValue(new Decimal('0.0000001'))).toBe('1e-7');
        });

        it('respects maxDecimals', () => {
            expect(formatValue(new Decimal('1.1234567891234'), 5)).toBe('1.12346');
        });
    });
});
