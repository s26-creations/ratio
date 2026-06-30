import Decimal from '../core/decimal-config.js';
import { CONSTANTS } from '../core/decimal-config.js';

export const physicsMisc = {
    // ANGLE - Base: radian (rad)
    angle: {
        base: 'radian',
        symbol: 'rad',
        units: {
            radian: { factor: '1', symbol: 'rad', name: 'Radian' },
            degree: {
                factor: CONSTANTS.PI ? CONSTANTS.PI.dividedBy(180).toString() : '0.01745329251994329576923690768488612713442871888541725',
                symbol: '°',
                name: 'Degree'
            },
            gradian: {
                factor: CONSTANTS.PI ? CONSTANTS.PI.dividedBy(200).toString() : '0.01570796326794896619231321691639751442098584699687552',
                symbol: 'grad',
                name: 'Gradian'
            },
            revolution: {
                factor: CONSTANTS.PI ? CONSTANTS.PI.times(2).toString() : '6.2831853071795864769252867665590057683943387987502116',
                symbol: 'rev',
                name: 'Revolution'
            },
            arcminute: {
                factor: CONSTANTS.PI ? CONSTANTS.PI.dividedBy(10800).toString() : '0.00029088820866572159615394512941476024557381198092362',
                symbol: "'",
                name: 'Arcminute'
            },
            arcsecond: {
                factor: CONSTANTS.PI ? CONSTANTS.PI.dividedBy(648000).toString() : '0.00000484813681109535993589908754902460040928968663205',
                symbol: '"',
                name: 'Arcsecond'
            }
        }
    },

    // RADIOACTIVITY (ACTIVITY) - Base: becquerel (Bq)
    radioactivity: {
        base: 'becquerel',
        symbol: 'Bq',
        units: {
            becquerel: { factor: '1', symbol: 'Bq', name: 'Becquerel' },
            kilobecquerel: { factor: '1000', symbol: 'kBq', name: 'Kilobecquerel' },
            megabecquerel: { factor: '1000000', symbol: 'MBq', name: 'Megabecquerel' },
            gigabecquerel: { factor: '1000000000', symbol: 'GBq', name: 'Gigabecquerel' },
            curie: { factor: '37000000000', symbol: 'Ci', name: 'Curie' },
            millicurie: { factor: '37000000', symbol: 'mCi', name: 'Millicurie' },
            microcurie: { factor: '37000', symbol: 'μCi', name: 'Microcurie' },
            nanocurie: { factor: '37', symbol: 'nCi', name: 'Nanocurie' },
            picocurie: { factor: '0.037', symbol: 'pCi', name: 'Picocurie' }
        }
    },

    // ABSORBED DOSE - Base: gray (Gy)
    absorbedDose: {
        base: 'gray',
        symbol: 'Gy',
        units: {
            gray: { factor: '1', symbol: 'Gy', name: 'Gray' },
            milligray: { factor: '0.001', symbol: 'mGy', name: 'Milligray' },
            microgray: { factor: '0.000001', symbol: 'μGy', name: 'Microgray' },
            kilogray: { factor: '1000', symbol: 'kGy', name: 'Kilogray' },
            rad: { factor: '0.01', symbol: 'rad', name: 'Rad' },
            millirad: { factor: '0.00001', symbol: 'mrad', name: 'Millirad' }
        }
    },

    // EQUIVALENT DOSE - Base: sievert (Sv)
    equivalentDose: {
        base: 'sievert',
        symbol: 'Sv',
        units: {
            sievert: { factor: '1', symbol: 'Sv', name: 'Sievert' },
            millisievert: { factor: '0.001', symbol: 'mSv', name: 'Millisievert' },
            microsievert: { factor: '0.000001', symbol: 'μSv', name: 'Microsievert' },
            rem: { factor: '0.01', symbol: 'rem', name: 'Rem' },
            millirem: { factor: '0.00001', symbol: 'mrem', name: 'Millirem' }
        }
    },

    // LUMINOUS INTENSITY - Base: candela (cd)
    luminousIntensity: {
        base: 'candela',
        symbol: 'cd',
        units: {
            candela: { factor: '1', symbol: 'cd', name: 'Candela' },
            millicandela: { factor: '0.001', symbol: 'mcd', name: 'Millicandela' },
            kilocandela: { factor: '1000', symbol: 'kcd', name: 'Kilocandela' },
            candlepower: { factor: '0.981', symbol: 'cp', name: 'Candlepower' }
        }
    },

    // ILLUMINANCE - Base: lux (lx)
    illuminance: {
        base: 'lux',
        symbol: 'lx',
        units: {
            lux: { factor: '1', symbol: 'lx', name: 'Lux' },
            millilux: { factor: '0.001', symbol: 'mlx', name: 'Millilux' },
            kilolux: { factor: '1000', symbol: 'klx', name: 'Kilolux' },
            phot: { factor: '10000', symbol: 'ph', name: 'Phot' },
            footCandle: { factor: '10.763910417', symbol: 'fc', name: 'Foot-candle' }
        }
    },

    // LUMINOUS FLUX - Base: lumen (lm)
    luminousFlux: {
        base: 'lumen',
        symbol: 'lm',
        units: {
            lumen: { factor: '1', symbol: 'lm', name: 'Lumen' },
            millilumen: { factor: '0.001', symbol: 'mlm', name: 'Millilumen' },
            kilolumen: { factor: '1000', symbol: 'klm', name: 'Kilolumen' }
        }
    },

    // SOUND INTENSITY - Base: watt per square meter (W/m²)
    soundIntensity: {
        base: 'wattPerSquareMeter',
        symbol: 'W/m²',
        units: {
            wattPerSquareMeter: { factor: '1', symbol: 'W/m²', name: 'Watt per Square Meter' },
            wattPerSquareCentimeter: { factor: '10000', symbol: 'W/cm²', name: 'Watt per Square Centimeter' },
            milliwattPerSquareMeter: { factor: '0.001', symbol: 'mW/m²', name: 'Milliwatt per Square Meter' },
            microwattPerSquareMeter: { factor: '0.000001', symbol: 'μW/m²', name: 'Microwatt per Square Meter' }
        }
    },

    // SOUND PRESSURE LEVEL - Base: decibel (dB) - LOGARITHMIC
    soundPressureLevel: {
        base: 'decibel',
        symbol: 'dB',
        logarithmic: true,
        referencePressure: '20e-6', // Pa - threshold of human hearing
        units: {
            decibel: {
                toBase: (pressure) => {
                    // Convert Pa pressure to dB: 20 × log₁₀(P/P₀)
                    const P = new Decimal(pressure);
                    const P0 = CONSTANTS.SOUND_REFERENCE_PRESSURE || new Decimal('20e-6');
                    return new Decimal(20).times(P.dividedBy(P0).log(10));
                },
                fromBase: (db) => {
                    // Convert dB to Pa pressure: P₀ × 10^(dB/20)
                    const dB = new Decimal(db);
                    const P0 = CONSTANTS.SOUND_REFERENCE_PRESSURE || new Decimal('20e-6');
                    return P0.times(Decimal.pow(10, dB.dividedBy(20)));
                },
                symbol: 'dB',
                name: 'Decibel'
            },
            pascal: {
                toBase: (pressure) => {
                    // Direct pressure value, convert to dB
                    const P = new Decimal(pressure);
                    const P0 = CONSTANTS.SOUND_REFERENCE_PRESSURE || new Decimal('20e-6');
                    return new Decimal(20).times(P.dividedBy(P0).log(10));
                },
                fromBase: (db) => {
                    // Convert dB back to Pa
                    const dB = new Decimal(db);
                    const P0 = CONSTANTS.SOUND_REFERENCE_PRESSURE || new Decimal('20e-6');
                    return P0.times(Decimal.pow(10, dB.dividedBy(20)));
                },
                symbol: 'Pa',
                name: 'Pascal'
            }
        }
    },

    // DYNAMIC VISCOSITY - Base: pascal-second (Pa·s)
    dynamicViscosity: {
        base: 'pascalSecond',
        symbol: 'Pa·s',
        units: {
            pascalSecond: { factor: '1', symbol: 'Pa·s', name: 'Pascal-second' },
            millipascalSecond: { factor: '0.001', symbol: 'mPa·s', name: 'Millipascal-second' },
            micropascalSecond: { factor: '0.000001', symbol: 'μPa·s', name: 'Micropascal-second' },
            poise: { factor: '0.1', symbol: 'P', name: 'Poise' },
            centipoise: { factor: '0.001', symbol: 'cP', name: 'Centipoise' },
            millipoise: { factor: '0.0001', symbol: 'mP', name: 'Millipoise' },
            poundPerFootSecond: { factor: '1.4881639', symbol: 'lb/(ft·s)', name: 'Pound per Foot-Second' },
            poundForceSecondPerSquareFoot: { factor: '47.880258888889', symbol: 'lbf·s/ft²', name: 'Pound-force Second per Square Foot' }
        }
    },

    // KINEMATIC VISCOSITY - Base: square meter per second (m²/s)
    kinematicViscosity: {
        base: 'squareMeterPerSecond',
        symbol: 'm²/s',
        units: {
            squareMeterPerSecond: { factor: '1', symbol: 'm²/s', name: 'Square Meter per Second' },
            squareCentimeterPerSecond: { factor: '0.0001', symbol: 'cm²/s', name: 'Square Centimeter per Second' },
            squareMillimeterPerSecond: { factor: '0.000001', symbol: 'mm²/s', name: 'Square Millimeter per Second' },
            stokes: { factor: '0.0001', symbol: 'St', name: 'Stokes' },
            centistokes: { factor: '0.000001', symbol: 'cSt', name: 'Centistokes' },
            squareFootPerSecond: { factor: '0.09290304', symbol: 'ft²/s', name: 'Square Foot per Second' },
            squareInchPerSecond: { factor: '0.00064516', symbol: 'in²/s', name: 'Square Inch per Second' }
        }
    },

    // VOLUMETRIC FLOW RATE - Base: cubic meter per second (m³/s)
    volumetricFlowRate: {
        base: 'cubicMeterPerSecond',
        symbol: 'm³/s',
        units: {
            cubicMeterPerSecond: { factor: '1', symbol: 'm³/s', name: 'Cubic Meter per Second' },
            cubicMeterPerHour: { factor: '0.000277777777777778', symbol: 'm³/h', name: 'Cubic Meter per Hour' },
            literPerSecond: { factor: '0.001', symbol: 'L/s', name: 'Liter per Second' },
            literPerMinute: { factor: '0.000016666666666667', symbol: 'L/min', name: 'Liter per Minute' },
            literPerHour: { factor: '0.000000277777777778', symbol: 'L/h', name: 'Liter per Hour' },
            milliliterPerSecond: { factor: '0.000001', symbol: 'mL/s', name: 'Milliliter per Second' },
            milliliterPerMinute: { factor: '0.000000016666666667', symbol: 'mL/min', name: 'Milliliter per Minute' },
            cubicFootPerSecond: { factor: '0.028316846592', symbol: 'ft³/s', name: 'Cubic Foot per Second' },
            cubicFootPerMinute: { factor: '0.000471947443', symbol: 'ft³/min', name: 'Cubic Foot per Minute' },
            cubicFootPerHour: { factor: '0.000007865790733333', symbol: 'ft³/h', name: 'Cubic Foot per Hour' },
            gallonUSPerSecond: { factor: '0.003785411784', symbol: 'gal/s', name: 'US Gallon per Second' },
            gallonUSPerMinute: { factor: '0.00006309019639333', symbol: 'gal/min', name: 'US Gallon per Minute' },
            gallonUSPerHour: { factor: '0.0000010515032732222', symbol: 'gal/h', name: 'US Gallon per Hour' }
        }
    },

    // MASS FLOW RATE - Base: kilogram per second (kg/s)
    massFlowRate: {
        base: 'kilogramPerSecond',
        symbol: 'kg/s',
        units: {
            kilogramPerSecond: { factor: '1', symbol: 'kg/s', name: 'Kilogram per Second' },
            kilogramPerMinute: { factor: '0.016666666666667', symbol: 'kg/min', name: 'Kilogram per Minute' },
            kilogramPerHour: { factor: '0.000277777777777778', symbol: 'kg/h', name: 'Kilogram per Hour' },
            gramPerSecond: { factor: '0.001', symbol: 'g/s', name: 'Gram per Second' },
            gramPerMinute: { factor: '0.000016666666666667', symbol: 'g/min', name: 'Gram per Minute' },
            gramPerHour: { factor: '0.000000277777777778', symbol: 'g/h', name: 'Gram per Hour' },
            tonPerHour: { factor: '0.277777777777778', symbol: 't/h', name: 'Metric Ton per Hour' },
            poundPerSecond: { factor: '0.45359237', symbol: 'lb/s', name: 'Pound per Second' },
            poundPerMinute: { factor: '0.007559873166667', symbol: 'lb/min', name: 'Pound per Minute' },
            poundPerHour: { factor: '0.00012599788611111', symbol: 'lb/h', name: 'Pound per Hour' }
        }
    }
};
