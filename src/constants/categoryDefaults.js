import definitions from '../engine/definitions/index.js';

export const defaultUnits = {
    length: { from: 'kilometer', to: 'mile' },
    mass: { from: 'kilogram', to: 'pound' },
    time: { from: 'hour', to: 'minute' },
    temperature: { from: 'celsius', to: 'fahrenheit' },
    area: { from: 'squareMeter', to: 'squareFoot' },
    volume: { from: 'liter', to: 'gallonUS' },
    energy: { from: 'joule', to: 'calorie' },
    power: { from: 'watt', to: 'horsepower' },
    speed: { from: 'meterPerSecond', to: 'kilometerPerHour' },
    acceleration: { from: 'meterPerSecondSquared', to: 'footPerSecondSquared' },
    force: { from: 'newton', to: 'poundForce' },
    pressure: { from: 'pascal', to: 'atmosphere' },
    electricCurrent: { from: 'ampere', to: 'milliampere' },
    voltage: { from: 'volt', to: 'millivolt' },
    resistance: { from: 'ohm', to: 'milliohm' },
    charge: { from: 'coulomb', to: 'milliampereHour' },
    capacitance: { from: 'farad', to: 'microfarad' },
    amountOfSubstance: { from: 'mole', to: 'millimole' },
    concentration: { from: 'molar', to: 'millimolar' },
    density: { from: 'kilogramPerCubicMeter', to: 'gramPerCubicCentimeter' },
    dataSize: { from: 'gigabyte', to: 'megabyte' },
    dataTransfer: { from: 'megabitsPerSecond', to: 'kilobitsPerSecond' },
    angle: { from: 'degree', to: 'radian' },
    specificHeatCapacity: { from: 'joulePerKilogramKelvin', to: 'caloriePerGramKelvin' },
    thermalConductivity: { from: 'wattPerMeterKelvin', to: 'btuPerHourFootFahrenheit' },
    entropy: { from: 'joulePerKelvin', to: 'caloriePerKelvin' },
    radioactivity: { from: 'becquerel', to: 'curie' },
    absorbedDose: { from: 'gray', to: 'rad' },
    equivalentDose: { from: 'sievert', to: 'rem' },
    luminousIntensity: { from: 'candela', to: 'millicandela' },
    illuminance: { from: 'lux', to: 'footCandle' },
    luminousFlux: { from: 'lumen', to: 'millilumen' },
    soundIntensity: { from: 'wattPerSquareMeter', to: 'milliwattPerSquareMeter' },
    soundPressureLevel: { from: 'decibel', to: 'bel' },
    dynamicViscosity: { from: 'pascalSecond', to: 'poise' },
    kinematicViscosity: { from: 'squareMeterPerSecond', to: 'stokes' },
    volumetricFlowRate: { from: 'cubicMeterPerSecond', to: 'literPerMinute' },
    massFlowRate: { from: 'kilogramPerSecond', to: 'poundPerSecond' },
    torque: { from: 'newtonMeter', to: 'poundForceFoot' },
    molality: { from: 'molePerKilogram', to: 'millimolePerKilogram' },
    osmolality: { from: 'osmolePerKilogram', to: 'milliosmolePerKilogram' },
    enzymeActivity: { from: 'katal', to: 'enzymeUnit' },
    Cooking_Flour: { from: 'cup', to: 'gram' },
    Cooking_Sugar: { from: 'cup', to: 'gram' },
    Cooking_Butter: { from: 'stick', to: 'gram' },
    Cooking_Rice: { from: 'cup', to: 'gram' },
    Cooking_Liquids: { from: 'milliliter', to: 'cup' },
    FuelConsumption: { from: 'milePerGallonUS', to: 'literPer100Kilometers' },
    Typography: { from: 'pixel', to: 'rem' }
};

/**
 * Helper function to get smart default units for each category
 * @param {string} category - Category key
 * @returns {object} - Object with from and to keys
 */
export function getDefaultUnits(category) {
    // If we have a default, use it
    if (defaultUnits[category]) {
        return defaultUnits[category];
    }

    // Otherwise pick first two different units
    const categoryDef = definitions[category];
    if (categoryDef && categoryDef.units) {
        const unitKeys = Object.keys(categoryDef.units);
        return {
            from: unitKeys[0] || '',
            to: unitKeys[1] || unitKeys[0] || ''
        };
    }

    return { from: '', to: '' };
}
