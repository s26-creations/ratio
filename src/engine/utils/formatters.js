/**
 * Value Formatting Utilities
 * Pure functions for formatting Decimal values for display
 */

import Decimal from '../core/decimal-config.js';

/**
 * Format a Decimal value for display
 * @param {Decimal} value - Decimal value
 * @param {number} maxDecimals - Maximum decimal places (default: 10)
 * @returns {string} - Formatted string
 */
export function formatValue(value, maxDecimals = 10) {
    if (!value || !(value instanceof Decimal)) {
        return '0';
    }

    // Remove trailing zeros and unnecessary decimal point
    let str = value.toFixed(maxDecimals);
    str = str.replace(/\.?0+$/, '');

    // Use scientific notation for very large or very small numbers
    const absValue = value.abs();
    if (absValue.greaterThan(1e15) || (absValue.lessThan(1e-6) && absValue.greaterThan(0))) {
        return value.toExponential(maxDecimals).replace(/\.?0+e/, 'e');
    }

    return str;
}

/**
 * Format category name for display
 * @param {string} key - Category key
 * @returns {string} - Formatted category name
 */
export function formatCategoryName(key) {
    const names = {
        length: 'Length',
        mass: 'Mass',
        time: 'Time',
        temperature: 'Temperature',
        area: 'Area',
        volume: 'Volume',
        energy: 'Energy',
        power: 'Power',
        speed: 'Speed',
        acceleration: 'Acceleration',
        force: 'Force',
        pressure: 'Pressure',
        electricCurrent: 'Electric Current',
        voltage: 'Voltage',
        resistance: 'Resistance',
        charge: 'Charge',
        capacitance: 'Capacitance',
        amountOfSubstance: 'Amount of Substance',
        concentration: 'Concentration',
        density: 'Density',
        dataSize: 'Data Size',
        dataTransfer: 'Data Transfer',
        angle: 'Angle',
        specificHeatCapacity: 'Specific Heat Capacity',
        thermalConductivity: 'Thermal Conductivity',
        entropy: 'Entropy',
        radioactivity: 'Radioactivity',
        absorbedDose: 'Absorbed Dose',
        equivalentDose: 'Equivalent Dose',
        luminousIntensity: 'Luminous Intensity',
        illuminance: 'Illuminance',
        luminousFlux: 'Luminous Flux',
        soundIntensity: 'Sound Intensity',
        soundPressureLevel: 'Sound Pressure Level',
        dynamicViscosity: 'Dynamic Viscosity',
        kinematicViscosity: 'Kinematic Viscosity',
        volumetricFlowRate: 'Volumetric Flow Rate',
        massFlowRate: 'Mass Flow Rate',
        torque: 'Torque',
        molality: 'Molality',
        osmolality: 'Osmolality',
        enzymeActivity: 'Enzyme Activity',
        Cooking_Flour: 'Cooking (Flour)',
        Cooking_Sugar: 'Cooking (Sugar)',
        Cooking_Butter: 'Cooking (Butter)',
        Cooking_Rice: 'Cooking (Rice)',
        Cooking_Liquids: 'Cooking (Liquids)',
        FuelConsumption: 'Fuel Consumption'
    };
    return names[key] || key;
}

/**
 * Format timestamp for history display
 * @param {string} timestamp - ISO timestamp
 * @returns {string} - Formatted time string
 */
export function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;

    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return date.toLocaleDateString();
}
