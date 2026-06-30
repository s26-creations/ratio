import { describe, it, expect } from 'vitest';
import definitions from '../definitions/index.js';

describe('Unit Definitions Schema', () => {
    it('ensures all categories are valid', () => {
        for (const [catKey, catDef] of Object.entries(definitions)) {
            // Must have a valid base unit that exists in the units object
            expect(catDef.base, `Category ${catKey} missing base unit`).toBeDefined();
            expect(catDef.units[catDef.base], `Base unit ${catDef.base} not found in category ${catKey}`).toBeDefined();

            for (const [unitKey, unitDef] of Object.entries(catDef.units)) {
                expect(unitDef.name, `${catKey}/${unitKey} missing name`).toBeDefined();
                expect(unitDef.symbol, `${catKey}/${unitKey} missing symbol`).toBeDefined();

                if (catDef.affine || catDef.logarithmic) {
                    expect(typeof unitDef.toBase, `${catKey}/${unitKey} missing toBase function`).toBe('function');
                    expect(typeof unitDef.fromBase, `${catKey}/${unitKey} missing fromBase function`).toBe('function');
                } else {
                    // Linear units must have a numerical/string factor convertible to Decimal
                    expect(unitDef.factor, `${catKey}/${unitKey} missing factor`).toBeDefined();
                }
            }
        }
    });
});
