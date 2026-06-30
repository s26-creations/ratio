/**
 * Input Validation Utilities
 * Pure functions for validating user input
 */

import Decimal from '../core/decimal-config.js';

/**
 * Validate if a value is a valid number
 * @param {any} value - Value to validate
 * @returns {boolean} - True if valid
 */
export function isValidNumber(value) {
    if (value === null || value === undefined || value === '') {
        return false;
    }

    try {
        const decimal = new Decimal(value);
        return decimal.isFinite();
    } catch {
        return false;
    }
}

/**
 * Validate number input format (allows partial input during typing)
 * @param {string} input - Input string
 * @returns {boolean} - True if valid format
 */
export function isValidNumberFormat(input) {
    const validNumberRegex = /^-?\d*\.?\d*([eE][-+]?\d*)?$/;
    return validNumberRegex.test(input);
}

/**
 * Validate if category exists
 * @param {string} category - Category key
 * @param {object} definitions - Unit definitions object
 * @returns {boolean} - True if valid
 */
export function isValidCategory(category, definitions) {
    return Boolean(definitions[category]);
}

/**
 * Validate if unit exists in category
 * @param {string} unit - Unit key
 * @param {string} category - Category key
 * @param {object} definitions - Unit definitions object
 * @returns {boolean} - True if valid
 */
export function isValidUnit(unit, category, definitions) {
    return Boolean(definitions[category]?.units[unit]);
}
