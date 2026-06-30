export const mechanics = {
    // LENGTH - Base: meter (m)
    length: {
        base: 'meter',
        symbol: 'm',
        units: {
            // Metric
            meter: { factor: '1', symbol: 'm', name: 'Meter' },
            kilometer: { factor: '1000', symbol: 'km', name: 'Kilometer' },
            centimeter: { factor: '0.01', symbol: 'cm', name: 'Centimeter' },
            millimeter: { factor: '0.001', symbol: 'mm', name: 'Millimeter' },
            micrometer: { factor: '0.000001', symbol: 'μm', name: 'Micrometer' },
            nanometer: { factor: '0.000000001', symbol: 'nm', name: 'Nanometer' },

            // Imperial/US
            mile: { factor: '1609.344', symbol: 'mi', name: 'Mile' },
            yard: { factor: '0.9144', symbol: 'yd', name: 'Yard' },
            foot: { factor: '0.3048', symbol: 'ft', name: 'Foot' },
            inch: { factor: '0.0254', symbol: 'in', name: 'Inch' },

            // Nautical and astronomical
            nauticalMile: { factor: '1852', symbol: 'nmi', name: 'Nautical Mile' },
            astronomicalUnit: { factor: '149597870700', symbol: 'AU', name: 'Astronomical Unit' },
            lightYear: { factor: '9460730472580800', symbol: 'ly', name: 'Light Year' }
        }
    },

    // MASS - Base: kilogram (kg)
    mass: {
        base: 'kilogram',
        symbol: 'kg',
        units: {
            // Metric
            kilogram: { factor: '1', symbol: 'kg', name: 'Kilogram' },
            gram: { factor: '0.001', symbol: 'g', name: 'Gram' },
            milligram: { factor: '0.000001', symbol: 'mg', name: 'Milligram' },
            microgram: { factor: '0.000000001', symbol: 'μg', name: 'Microgram' },
            metricTon: { factor: '1000', symbol: 't', name: 'Metric Ton' },

            // Imperial/US
            pound: { factor: '0.45359237', symbol: 'lb', name: 'Pound' },
            ounce: { factor: '0.028349523125', symbol: 'oz', name: 'Ounce' },
            stone: { factor: '6.35029318', symbol: 'st', name: 'Stone' },
            tonUS: { factor: '907.18474', symbol: 'ton', name: 'US Ton' },
            tonUK: { factor: '1016.0469088', symbol: 'ton', name: 'UK Ton' }
        }
    },

    // TIME - Base: second (s)
    time: {
        base: 'second',
        symbol: 's',
        units: {
            second: { factor: '1', symbol: 's', name: 'Second' },
            millisecond: { factor: '0.001', symbol: 'ms', name: 'Millisecond' },
            microsecond: { factor: '0.000001', symbol: 'μs', name: 'Microsecond' },
            nanosecond: { factor: '0.000000001', symbol: 'ns', name: 'Nanosecond' },
            minute: { factor: '60', symbol: 'min', name: 'Minute' },
            hour: { factor: '3600', symbol: 'h', name: 'Hour' },
            day: { factor: '86400', symbol: 'd', name: 'Day' },
            week: { factor: '604800', symbol: 'wk', name: 'Week' },
            year: { factor: '31557600', symbol: 'yr', name: 'Year' } // 365.25 days
        }
    },

    // AREA - Base: square meter (m²)
    area: {
        base: 'squareMeter',
        symbol: 'm²',
        units: {
            squareMeter: { factor: '1', symbol: 'm²', name: 'Square Meter' },
            squareKilometer: { factor: '1000000', symbol: 'km²', name: 'Square Kilometer' },
            squareCentimeter: { factor: '0.0001', symbol: 'cm²', name: 'Square Centimeter' },
            squareMillimeter: { factor: '0.000001', symbol: 'mm²', name: 'Square Millimeter' },
            squareMile: { factor: '2589988.110336', symbol: 'mi²', name: 'Square Mile' },
            squareYard: { factor: '0.83612736', symbol: 'yd²', name: 'Square Yard' },
            squareFoot: { factor: '0.09290304', symbol: 'ft²', name: 'Square Foot' },
            squareInch: { factor: '0.00064516', symbol: 'in²', name: 'Square Inch' },
            hectare: { factor: '10000', symbol: 'ha', name: 'Hectare' },
            acre: { factor: '4046.8564224', symbol: 'ac', name: 'Acre' }
        }
    },

    // VOLUME - Base: cubic meter (m³)
    volume: {
        base: 'cubicMeter',
        symbol: 'm³',
        units: {
            // Metric
            cubicMeter: { factor: '1', symbol: 'm³', name: 'Cubic Meter' },
            cubicCentimeter: { factor: '0.000001', symbol: 'cm³', name: 'Cubic Centimeter' },
            liter: { factor: '0.001', symbol: 'L', name: 'Liter' },
            milliliter: { factor: '0.000001', symbol: 'mL', name: 'Milliliter' },

            // Imperial/US
            cubicFoot: { factor: '0.028316846592', symbol: 'ft³', name: 'Cubic Foot' },
            cubicInch: { factor: '0.000016387064', symbol: 'in³', name: 'Cubic Inch' },
            gallonUS: { factor: '0.003785411784', symbol: 'gal', name: 'US Gallon' },
            gallonUK: { factor: '0.00454609', symbol: 'gal', name: 'UK Gallon' },
            quartUS: { factor: '0.000946352946', symbol: 'qt', name: 'US Quart' },
            pintUS: { factor: '0.000473176473', symbol: 'pt', name: 'US Pint' },
            cupUS: { factor: '0.0002365882365', symbol: 'cup', name: 'US Cup' },
            fluidOunceUS: { factor: '0.0000295735295625', symbol: 'fl oz', name: 'US Fluid Ounce' },
            tablespoon: { factor: '0.00001478676478125', symbol: 'tbsp', name: 'Tablespoon' },
            teaspoon: { factor: '0.00000492892159375', symbol: 'tsp', name: 'Teaspoon' }
        }
    },

    // SPEED/VELOCITY - Base: meter per second (m/s)
    speed: {
        base: 'meterPerSecond',
        symbol: 'm/s',
        units: {
            meterPerSecond: { factor: '1', symbol: 'm/s', name: 'Meter per Second' },
            kilometerPerHour: { factor: '0.277777777777778', symbol: 'km/h', name: 'Kilometer per Hour' },
            milePerHour: { factor: '0.44704', symbol: 'mph', name: 'Mile per Hour' },
            footPerSecond: { factor: '0.3048', symbol: 'ft/s', name: 'Foot per Second' },
            knot: { factor: '0.514444444444444', symbol: 'kn', name: 'Knot' },
            speedOfLight: { factor: '299792458', symbol: 'c', name: 'Speed of Light' }
        }
    },

    // ACCELERATION - Base: meter per second squared (m/s²)
    acceleration: {
        base: 'meterPerSecondSquared',
        symbol: 'm/s²',
        units: {
            meterPerSecondSquared: { factor: '1', symbol: 'm/s²', name: 'Meter per Second²' },
            gForce: { factor: '9.80665', symbol: 'g', name: 'G-force' },
            footPerSecondSquared: { factor: '0.3048', symbol: 'ft/s²', name: 'Foot per Second²' }
        }
    },

    // FORCE - Base: newton (N)
    force: {
        base: 'newton',
        symbol: 'N',
        units: {
            newton: { factor: '1', symbol: 'N', name: 'Newton' },
            kilonewton: { factor: '1000', symbol: 'kN', name: 'Kilonewton' },
            poundForce: { factor: '4.4482216152605', symbol: 'lbf', name: 'Pound-force' },
            dyne: { factor: '0.00001', symbol: 'dyn', name: 'Dyne' },
            kilogramForce: { factor: '9.80665', symbol: 'kgf', name: 'Kilogram-force' }
        }
    },

    // PRESSURE - Base: pascal (Pa)
    pressure: {
        base: 'pascal',
        symbol: 'Pa',
        units: {
            pascal: { factor: '1', symbol: 'Pa', name: 'Pascal' },
            kilopascal: { factor: '1000', symbol: 'kPa', name: 'Kilopascal' },
            bar: { factor: '100000', symbol: 'bar', name: 'Bar' },
            atmosphere: { factor: '101325', symbol: 'atm', name: 'Atmosphere' },
            psi: { factor: '6894.757293168', symbol: 'psi', name: 'Pound per Square Inch' },
            mmHg: { factor: '133.322387415', symbol: 'mmHg', name: 'Millimeter of Mercury' },
            torr: { factor: '133.322368421', symbol: 'Torr', name: 'Torr' },
            inHg: { factor: '3386.389', symbol: 'inHg', name: 'Inch of Mercury' }
        }
    },

    // TORQUE - Base: newton-meter (N·m)
    torque: {
        base: 'newtonMeter',
        symbol: 'N·m',
        units: {
            newtonMeter: { factor: '1', symbol: 'N·m', name: 'Newton-meter' },
            newtonCentimeter: { factor: '0.01', symbol: 'N·cm', name: 'Newton-centimeter' },
            newtonMillimeter: { factor: '0.001', symbol: 'N·mm', name: 'Newton-millimeter' },
            kilonewtonMeter: { factor: '1000', symbol: 'kN·m', name: 'Kilonewton-meter' },
            dyneCentimeter: { factor: '0.0000001', symbol: 'dyn·cm', name: 'Dyne-centimeter' },
            poundForceFoot: { factor: '1.3558179483314', symbol: 'lbf·ft', name: 'Pound-force Foot' },
            poundForceInch: { factor: '0.112984829027617', symbol: 'lbf·in', name: 'Pound-force Inch' },
            ounceForceFoot: { factor: '0.0847386546', symbol: 'ozf·ft', name: 'Ounce-force Foot' },
            ounceForceInch: { factor: '0.00706155455', symbol: 'ozf·in', name: 'Ounce-force Inch' }
        }
    }
};
