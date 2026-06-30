import Decimal from '../core/decimal-config.js';

export const thermodynamics = {
    // TEMPERATURE - Base: kelvin (K) - AFFINE transformations
    temperature: {
        base: 'kelvin',
        symbol: 'K',
        affine: true,
        units: {
            kelvin: {
                toBase: (x) => x instanceof Decimal ? x : new Decimal(x),
                fromBase: (x) => x instanceof Decimal ? x : new Decimal(x),
                symbol: 'K',
                name: 'Kelvin'
            },
            celsius: {
                toBase: (x) => {
                    const val = x instanceof Decimal ? x : new Decimal(x);
                    return val.plus(new Decimal('273.15'));
                },
                fromBase: (x) => {
                    const val = x instanceof Decimal ? x : new Decimal(x);
                    return val.minus(new Decimal('273.15'));
                },
                symbol: '°C',
                name: 'Celsius'
            },
            fahrenheit: {
                toBase: (x) => {
                    const val = x instanceof Decimal ? x : new Decimal(x);
                    return val.plus(new Decimal('459.67')).times(new Decimal('5')).dividedBy(new Decimal('9'));
                },
                fromBase: (x) => {
                    const val = x instanceof Decimal ? x : new Decimal(x);
                    return val.times(new Decimal('9')).dividedBy(new Decimal('5')).minus(new Decimal('459.67'));
                },
                symbol: '°F',
                name: 'Fahrenheit'
            }
        }
    },

    // ENERGY - Base: joule (J)
    energy: {
        base: 'joule',
        symbol: 'J',
        units: {
            joule: { factor: '1', symbol: 'J', name: 'Joule' },
            kilojoule: { factor: '1000', symbol: 'kJ', name: 'Kilojoule' },
            calorie: { factor: '4.184', symbol: 'cal', name: 'Calorie' },
            kilocalorie: { factor: '4184', symbol: 'kcal', name: 'Kilocalorie' },
            wattHour: { factor: '3600', symbol: 'Wh', name: 'Watt-hour' },
            kilowattHour: { factor: '3600000', symbol: 'kWh', name: 'Kilowatt-hour' },
            electronvolt: { factor: '1.602176634e-19', symbol: 'eV', name: 'Electronvolt' },
            btu: { factor: '1055.056', symbol: 'BTU', name: 'British Thermal Unit' },
            footPound: { factor: '1.3558179483314', symbol: 'ft·lb', name: 'Foot-pound' }
        }
    },

    // POWER - Base: watt (W)
    power: {
        base: 'watt',
        symbol: 'W',
        units: {
            watt: { factor: '1', symbol: 'W', name: 'Watt' },
            kilowatt: { factor: '1000', symbol: 'kW', name: 'Kilowatt' },
            megawatt: { factor: '1000000', symbol: 'MW', name: 'Megawatt' },
            horsepower: { factor: '745.69987158227022', symbol: 'hp', name: 'Horsepower' },
            btuPerHour: { factor: '0.29307107017', symbol: 'BTU/h', name: 'BTU per Hour' }
        }
    },

    // SPECIFIC HEAT CAPACITY - Base: joule per kilogram-kelvin (J/(kg·K))
    specificHeatCapacity: {
        base: 'joulePerKilogramKelvin',
        symbol: 'J/(kg·K)',
        units: {
            joulePerKilogramKelvin: { factor: '1', symbol: 'J/(kg·K)', name: 'Joule per Kilogram-Kelvin' },
            joulePerGramKelvin: { factor: '1000', symbol: 'J/(g·K)', name: 'Joule per Gram-Kelvin' },
            kilojoulePerKilogramKelvin: { factor: '1000', symbol: 'kJ/(kg·K)', name: 'Kilojoule per Kilogram-Kelvin' },
            caloriePerGramKelvin: { factor: '4184', symbol: 'cal/(g·K)', name: 'Calorie per Gram-Kelvin' },
            kilocaloriePerKilogramKelvin: { factor: '4184', symbol: 'kcal/(kg·K)', name: 'Kilocalorie per Kilogram-Kelvin' },
            btuPerPoundFahrenheit: { factor: '4186.8', symbol: 'BTU/(lb·°F)', name: 'BTU per Pound-Fahrenheit' }
        }
    },

    // THERMAL CONDUCTIVITY - Base: watt per meter-kelvin (W/(m·K))
    thermalConductivity: {
        base: 'wattPerMeterKelvin',
        symbol: 'W/(m·K)',
        units: {
            wattPerMeterKelvin: { factor: '1', symbol: 'W/(m·K)', name: 'Watt per Meter-Kelvin' },
            wattPerCentimeterKelvin: { factor: '100', symbol: 'W/(cm·K)', name: 'Watt per Centimeter-Kelvin' },
            kilowattPerMeterKelvin: { factor: '1000', symbol: 'kW/(m·K)', name: 'Kilowatt per Meter-Kelvin' },
            caloriePerSecondCentimeterKelvin: { factor: '418.4', symbol: 'cal/(s·cm·K)', name: 'Calorie per Second-Centimeter-Kelvin' },
            btuPerHourFootFahrenheit: { factor: '1.730735', symbol: 'BTU/(h·ft·°F)', name: 'BTU per Hour-Foot-Fahrenheit' },
            btuInchPerHourSquareFootFahrenheit: { factor: '0.14422776', symbol: 'BTU·in/(h·ft²·°F)', name: 'BTU-Inch per Hour-Square Foot-Fahrenheit' }
        }
    },

    // ENTROPY - Base: joule per kelvin (J/K)
    entropy: {
        base: 'joulePerKelvin',
        symbol: 'J/K',
        units: {
            joulePerKelvin: { factor: '1', symbol: 'J/K', name: 'Joule per Kelvin' },
            kilojoulePerKelvin: { factor: '1000', symbol: 'kJ/K', name: 'Kilojoule per Kelvin' },
            caloriePerKelvin: { factor: '4.184', symbol: 'cal/K', name: 'Calorie per Kelvin' },
            kilocaloriePerKelvin: { factor: '4184', symbol: 'kcal/K', name: 'Kilocalorie per Kelvin' },
            btuPerRankine: { factor: '1899.1005', symbol: 'BTU/°R', name: 'BTU per Rankine' }
        }
    }
};
