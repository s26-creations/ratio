import { CONSTANTS } from '../core/decimal-config.js';

export const chemistry = {
    // AMOUNT OF SUBSTANCE - Base: mole (mol)
    amountOfSubstance: {
        base: 'mole',
        symbol: 'mol',
        units: {
            mole: { factor: '1', symbol: 'mol', name: 'Mole' },
            millimole: { factor: '0.001', symbol: 'mmol', name: 'Millimole' },
            micromole: { factor: '0.000001', symbol: 'μmol', name: 'Micromole' },
            kilomole: { factor: '1000', symbol: 'kmol', name: 'Kilomole' }
        }
    },

    // CONCENTRATION - Base: molar (mol/L)
    concentration: {
        base: 'molar',
        symbol: 'M',
        units: {
            molar: { factor: '1', symbol: 'M', name: 'Molar' },
            millimolar: { factor: '0.001', symbol: 'mM', name: 'Millimolar' },
            micromolar: { factor: '0.000001', symbol: 'μM', name: 'Micromolar' },
            nanomolar: { factor: '0.000000001', symbol: 'nM', name: 'Nanomolar' },
            molPerCubicMeter: { factor: '0.001', symbol: 'mol/m³', name: 'Mole per Cubic Meter' }
        }
    },

    // DENSITY - Base: kilogram per cubic meter (kg/m³)
    density: {
        base: 'kilogramPerCubicMeter',
        symbol: 'kg/m³',
        units: {
            kilogramPerCubicMeter: { factor: '1', symbol: 'kg/m³', name: 'Kilogram per Cubic Meter' },
            gramPerCubicCentimeter: { factor: '1000', symbol: 'g/cm³', name: 'Gram per Cubic Centimeter' },
            gramPerMilliliter: { factor: '1000', symbol: 'g/mL', name: 'Gram per Milliliter' },
            kilogramPerLiter: { factor: '1000', symbol: 'kg/L', name: 'Kilogram per Liter' },
            gramPerLiter: { factor: '1', symbol: 'g/L', name: 'Gram per Liter' },
            poundPerCubicFoot: { factor: '16.018463373960142', symbol: 'lb/ft³', name: 'Pound per Cubic Foot' }
        }
    },

    // MOLALITY - Base: mole per kilogram (mol/kg)
    molality: {
        base: 'molePerKilogram',
        symbol: 'mol/kg',
        units: {
            molePerKilogram: { factor: '1', symbol: 'mol/kg', name: 'Mole per Kilogram' },
            millimolePerKilogram: { factor: '0.001', symbol: 'mmol/kg', name: 'Millimole per Kilogram' },
            micromolePerKilogram: { factor: '0.000001', symbol: 'μmol/kg', name: 'Micromole per Kilogram' },
            molePerGram: { factor: '1000', symbol: 'mol/g', name: 'Mole per Gram' },
            millimolePerGram: { factor: '1', symbol: 'mmol/g', name: 'Millimole per Gram' }
        }
    },

    // OSMOLALITY - Base: osmole per kilogram (osmol/kg)
    osmolality: {
        base: 'osmolePerKilogram',
        symbol: 'osmol/kg',
        units: {
            osmolePerKilogram: { factor: '1', symbol: 'osmol/kg', name: 'Osmole per Kilogram' },
            milliosmolePerKilogram: { factor: '0.001', symbol: 'mOsmol/kg', name: 'Milliosmole per Kilogram' },
            microosmolePerKilogram: { factor: '0.000001', symbol: 'μOsmol/kg', name: 'Microosmole per Kilogram' }
        }
    },

    // ENZYME ACTIVITY - Base: katal (kat)
    // 1 U (enzyme unit) = 1 μmol/min = exactly 1/(60×10⁶) mol/s
    enzymeActivity: {
        base: 'katal',
        symbol: 'kat',
        units: {
            katal: { factor: '1', symbol: 'kat', name: 'Katal' },
            millikatal: { factor: '0.001', symbol: 'mkat', name: 'Millikatal' },
            microkatal: { factor: '0.000001', symbol: 'μkat', name: 'Microkatal' },
            nanokatal: { factor: '0.000000001', symbol: 'nkat', name: 'Nanokatal' },
            unit: {
                factor: CONSTANTS.ENZYME_UNIT_TO_KATAL ? CONSTANTS.ENZYME_UNIT_TO_KATAL.toString() : '0.000000016666666666666667',
                symbol: 'U',
                name: 'Enzyme Unit'
            },
            milliunit: {
                factor: CONSTANTS.ENZYME_UNIT_TO_KATAL ? CONSTANTS.ENZYME_UNIT_TO_KATAL.dividedBy(1000).toString() : '0.000000000016666666666667',
                symbol: 'mU',
                name: 'Millienzyme Unit'
            },
            microunit: {
                factor: CONSTANTS.ENZYME_UNIT_TO_KATAL ? CONSTANTS.ENZYME_UNIT_TO_KATAL.dividedBy(1000000).toString() : '0.000000000000016666666667',
                symbol: 'μU',
                name: 'Microenzyme Unit'
            }
        }
    }
};
