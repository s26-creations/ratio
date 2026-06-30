/**
 * Decimal.js Configuration
 * Centralized configuration for high-precision arithmetic
 */

import Decimal from 'decimal.js';

// Configure Decimal.js
Decimal.set({ precision: 50, rounding: 4 });

// Mathematical constants with full precision using Decimal.js
export const CONSTANTS = {
    PI: Decimal.acos(-1),
    // Reference intensity for sound decibel calculations (W/m²)
    SOUND_REFERENCE_INTENSITY: new Decimal('1e-12'),
    // Exact enzyme unit conversion: 1 U = 1 μmol/min = 1/(60×10^6) mol/s
    ENZYME_UNIT_TO_KATAL: new Decimal(1).dividedBy(60000000)
};

export default Decimal;
