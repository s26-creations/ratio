import Decimal from '../core/decimal-config.js';

export const fuel = {
    // FUEL CONSUMPTION - Base: kilometer per liter (km/L)
    // Uses affine: true to handle reciprocal units (L/100km)
    FuelConsumption: {
        base: 'kilometerPerLiter',
        symbol: 'km/L',
        affine: true,
        units: {
            kilometerPerLiter: {
                toBase: (x) => x instanceof Decimal ? x : new Decimal(x),
                fromBase: (x) => x instanceof Decimal ? x : new Decimal(x),
                symbol: 'km/L',
                name: 'Kilometer per Liter'
            },
            literPer100Kilometers: {
                toBase: (x) => {
                    const val = x instanceof Decimal ? x : new Decimal(x);
                    // Avoid division by zero
                    if (val.isZero()) return new Decimal(0);
                    return new Decimal(100).dividedBy(val);
                },
                fromBase: (x) => {
                    const val = x instanceof Decimal ? x : new Decimal(x);
                    if (val.isZero()) return new Decimal(0);
                    return new Decimal(100).dividedBy(val);
                },
                symbol: 'L/100km',
                name: 'Liters per 100km'
            },
            milePerGallonUS: {
                toBase: (x) => {
                    const val = x instanceof Decimal ? x : new Decimal(x);
                    // 1 mpg (US) = 0.425143707 km/L
                    return val.times(new Decimal('0.425143707'));
                },
                fromBase: (x) => {
                    const val = x instanceof Decimal ? x : new Decimal(x);
                    return val.dividedBy(new Decimal('0.425143707'));
                },
                symbol: 'mpg (US)',
                name: 'Miles per Gallon (US)'
            },
            milePerGallonUK: {
                toBase: (x) => {
                    const val = x instanceof Decimal ? x : new Decimal(x);
                    // 1 mpg (UK) = 0.354006189 km/L
                    return val.times(new Decimal('0.354006189'));
                },
                fromBase: (x) => {
                    const val = x instanceof Decimal ? x : new Decimal(x);
                    return val.dividedBy(new Decimal('0.354006189'));
                },
                symbol: 'mpg (UK)',
                name: 'Miles per Gallon (UK)'
            }
        }
    }
};
