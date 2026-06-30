import { describe, it, expect } from 'vitest';
import { convert, getConversionInfo, getQuickReferenceValues } from '../core/converter.js';

describe('Converter Engine', () => {
    describe('convert()', () => {
        it('performs identity conversions correctly', () => {
            const result = convert('100', 'meter', 'meter', 'length');
            expect(result.toString()).toBe('100');
        });

        it('performs linear conversions correctly', () => {
            // 1 km = 1000 m
            const result = convert('1', 'kilometer', 'meter', 'length');
            expect(result.toString()).toBe('1000');
            
            // 1000 g = 1 kg
            const result2 = convert('1000', 'gram', 'kilogram', 'mass');
            expect(result2.toString()).toBe('1');
        });

        it('performs affine (temperature) conversions correctly', () => {
            // 0 C = 32 F
            const resultCtoF = convert('0', 'celsius', 'fahrenheit', 'temperature');
            expect(resultCtoF.toString()).toBe('32');

            // 32 F = 0 C
            const resultFtoC = convert('32', 'fahrenheit', 'celsius', 'temperature');
            expect(resultFtoC.toString()).toBe('0');

            // 0 K = -273.15 C
            const resultKtoC = convert('0', 'kelvin', 'celsius', 'temperature');
            expect(resultKtoC.toString()).toBe('-273.15');
        });

        it('throws on unknown category', () => {
            expect(() => convert('1', 'a', 'b', 'magic')).toThrow(/Unknown category/);
        });

        it('throws on unknown units', () => {
            expect(() => convert('1', 'magicUnit', 'meter', 'length')).toThrow(/Unknown unit/);
            expect(() => convert('1', 'meter', 'magicUnit', 'length')).toThrow(/Unknown unit/);
        });
    });

    describe('getConversionInfo()', () => {
        it('returns info for linear conversions', () => {
            const info = getConversionInfo('kilometer', 'meter', 'length');
            expect(info.type).toBe('linear');
            expect(info.factor).toBe('1000');
        });

        it('returns info for affine conversions', () => {
            const info = getConversionInfo('celsius', 'fahrenheit', 'temperature');
            expect(info.type).toBe('affine');
            expect(info.factor).toBeNull();
            expect(info.formulaText).toContain('32');
        });

        it('returns identity info for same units', () => {
            const info = getConversionInfo('meter', 'meter', 'length');
            expect(info.type).toBe('identity');
            expect(info.factor).toBe('1');
        });
    });

    describe('getQuickReferenceValues()', () => {
        it('returns 8 reference points', () => {
            const refs = getQuickReferenceValues('kilometer', 'meter', 'length', 2);
            expect(refs).toHaveLength(8);
            expect(refs[0].input).toBe('1');
            expect(refs[0].output).toBe('1000');
        });
    });
});
