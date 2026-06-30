/**
 * Core Conversion Logic
 */

import Decimal from './decimal-config.js';
import definitions from '../definitions/index.js';
import { formatCategoryName } from '../utils/formatters.js';
import { formatValue } from '../utils/formatters.js';

/**
 * Convert a value from one unit to another
 * @param {number|string} value - The value to convert
 * @param {string} fromUnit - Source unit
 * @param {string} toUnit - Target unit
 * @param {string} category - Unit category
 * @returns {Decimal} - Converted value as Decimal object
 */
export function convert(value, fromUnit, toUnit, category) {
    // Validate inputs
    if (!definitions[category]) {
        throw new Error(`Unknown category: ${category}`);
    }

    const categoryDef = definitions[category];

    if (!categoryDef.units[fromUnit]) {
        throw new Error(`Unknown unit '${fromUnit}' in category '${category}'`);
    }

    if (!categoryDef.units[toUnit]) {
        throw new Error(`Unknown unit '${toUnit}' in category '${category}'`);
    }

    // Handle same unit conversion
    if (fromUnit === toUnit) {
        return new Decimal(value);
    }

    // Handle affine transformations (temperature)
    if (categoryDef.affine) {
        const fromDef = categoryDef.units[fromUnit];
        const toDef = categoryDef.units[toUnit];

        // Convert to base unit (Kelvin)
        const baseValue = fromDef.toBase(value);
        // Convert from base to target unit
        const result = toDef.fromBase(baseValue);

        return result;
    }

    // Handle logarithmic transformations (decibels)
    if (categoryDef.logarithmic) {
        const fromDef = categoryDef.units[fromUnit];
        const toDef = categoryDef.units[toUnit];

        // Convert from source unit to base (dB)
        const baseValue = fromDef.toBase(value);
        // Convert from base (dB) to target unit
        const result = toDef.fromBase(baseValue);

        return result;
    }

    // Handle linear transformations (all other units)
    const fromDef = categoryDef.units[fromUnit];
    const toDef = categoryDef.units[toUnit];

    // Convert to base unit (linear units have zero offset, so only multiply)
    const baseValue = new Decimal(value).times(fromDef.factor);

    // Safety check for zero division
    const toFactor = new Decimal(toDef.factor);
    if (toFactor.isZero()) {
        throw new Error('Invalid target unit factor (zero division)');
    }

    // Convert from base to target unit (only divide)
    const result = baseValue.dividedBy(toFactor);

    return result;
}

/**
 * Get all available units for a category
 * @param {string} category - Unit category
 * @returns {Array} - Array of unit objects with name, symbol, and key
 */
export function getUnitsForCategory(category) {
    if (!definitions[category]) {
        throw new Error(`Unknown category: ${category}`);
    }

    const categoryDef = definitions[category];
    const baseUnitSymbol = categoryDef.units[categoryDef.base]?.symbol || categoryDef.symbol || '';

    return Object.keys(categoryDef.units).map(key => {
        const unitDef = categoryDef.units[key];
        let formula = '';
        
        if (key === categoryDef.base) {
            formula = 'Base unit';
        } else if (categoryDef.affine) {
            formula = 'Complex conversion';
        } else if (categoryDef.logarithmic) {
            formula = 'Logarithmic conversion';
        } else if (unitDef.factor) {
            const factorStr = unitDef.factor.toString();
            formula = `1 ${unitDef.symbol} = ${factorStr.substring(0, 15)}${factorStr.length > 15 ? '...' : ''} ${baseUnitSymbol}`;
        }

        return {
            key: key,
            name: unitDef.name,
            symbol: unitDef.symbol,
            formula: formula
        };
    });
}

/**
 * Get all available categories
 * @returns {Array} - Array of category objects
 */
export function getCategories() {
    return Object.keys(definitions).map(key => ({
        key: key,
        name: formatCategoryName(key),
        base: definitions[key].base,
        symbol: definitions[key].symbol,
        unitCount: Object.keys(definitions[key].units).length
    }));
}

/**
 * Get conversion formula information for display purposes
 * @param {string} fromUnit - Source unit key
 * @param {string} toUnit - Target unit key
 * @param {string} category - Unit category
 * @returns {object} - Formula descriptor with type, factor, display strings
 */
export function getConversionInfo(fromUnit, toUnit, category) {
    if (!definitions[category]) return null;

    const categoryDef = definitions[category];
    const fromDef = categoryDef.units[fromUnit];
    const toDef = categoryDef.units[toUnit];

    if (!fromDef || !toDef) return null;

    const fromSymbol = fromDef.symbol || fromUnit;
    const toSymbol = toDef.symbol || toUnit;

    // Same unit
    if (fromUnit === toUnit) {
        return {
            type: 'identity',
            formulaText: `1 ${fromSymbol} = 1 ${toSymbol}`,
            latexFormula: `1 \\text{ ${fromSymbol}} = 1 \\text{ ${toSymbol}}`,
            stepsText: 'Same unit — no conversion needed',
            fromSymbol,
            toSymbol,
            factor: '1'
        };
    }

    // Affine (temperature)
    if (categoryDef.affine) {
        const tempFormulas = {
            'celsius-fahrenheit': { 
                formula: '(°C × 9/5) + 32 = °F', 
                steps: 'Multiply by 9/5, then add 32',
                latex: `(^{\\circ}\\text{C} \\times \\frac{9}{5}) + 32 = ^{\\circ}\\text{F}`
            },
            'fahrenheit-celsius': { 
                formula: '(°F − 32) × 5/9 = °C', 
                steps: 'Subtract 32, then multiply by 5/9',
                latex: `(^{\\circ}\\text{F} - 32) \\times \\frac{5}{9} = ^{\\circ}\\text{C}`
            },
            'celsius-kelvin': { 
                formula: '°C + 273.15 = K', 
                steps: 'Add 273.15',
                latex: `^{\\circ}\\text{C} + 273.15 = \\text{K}`
            },
            'kelvin-celsius': { 
                formula: 'K − 273.15 = °C', 
                steps: 'Subtract 273.15',
                latex: `\\text{K} - 273.15 = ^{\\circ}\\text{C}`
            },
            'fahrenheit-kelvin': { 
                formula: '(°F + 459.67) × 5/9 = K', 
                steps: 'Add 459.67, then multiply by 5/9',
                latex: `(^{\\circ}\\text{F} + 459.67) \\times \\frac{5}{9} = \\text{K}`
            },
            'kelvin-fahrenheit': { 
                formula: '(K × 9/5) − 459.67 = °F', 
                steps: 'Multiply by 9/5, then subtract 459.67',
                latex: `(\\text{K} \\times \\frac{9}{5}) - 459.67 = ^{\\circ}\\text{F}`
            }
        };

        const key = `${fromUnit}-${toUnit}`;
        const formulaData = tempFormulas[key];

        return {
            type: 'affine',
            formulaText: formulaData ? formulaData.formula : `${fromSymbol} → ${toSymbol} (affine transform)`,
            latexFormula: formulaData ? formulaData.latex : `\\text{${fromSymbol}} \\rightarrow \\text{${toSymbol}} \\quad (\\text{affine transform})`,
            stepsText: formulaData ? formulaData.steps : 'Multi-step conversion through base unit',
            fromSymbol,
            toSymbol,
            factor: null
        };
    }

    // Logarithmic
    if (categoryDef.logarithmic) {
        return {
            type: 'logarithmic',
            formulaText: `${fromSymbol} ↔ ${toSymbol} (logarithmic scale)`,
            latexFormula: `\\text{${fromSymbol}} \\leftrightarrow \\text{${toSymbol}} \\quad (\\text{logarithmic scale})`,
            stepsText: 'Convert through base unit using logarithmic transform',
            fromSymbol,
            toSymbol,
            factor: null
        };
    }

    // Linear — compute the direct conversion factor
    const fromFactor = new Decimal(fromDef.factor);
    const toFactor = new Decimal(toDef.factor);
    const directFactor = fromFactor.dividedBy(toFactor);

    // Determine a clean display of the factor
    const factorDisplay = formatFactorForDisplay(directFactor);
    const latexFactorDisplay = factorDisplay.replace(/e([+-]?\d+)/, ' \\times 10^{$1}');

    // Build the operation description
    let operation, stepsText;
    if (directFactor.greaterThan(1)) {
        operation = 'multiply';
        stepsText = `Multiply the value by ${factorDisplay}`;
    } else {
        operation = 'divide';
        const inverseFactor = formatFactorForDisplay(new Decimal(1).dividedBy(directFactor));
        stepsText = `Divide the value by ${inverseFactor}`;
    }

    return {
        type: 'linear',
        factor: directFactor.toString(),
        factorDisplay,
        operation,
        formulaText: `1 ${fromSymbol} = ${factorDisplay} ${toSymbol}`,
        latexFormula: `1 \\text{ ${fromSymbol}} = ${latexFactorDisplay} \\text{ ${toSymbol}}`,
        stepsText,
        fromSymbol,
        toSymbol
    };
}

/**
 * Format a Decimal factor for human-readable display
 * @param {Decimal} factor - The conversion factor
 * @returns {string} - Formatted string
 */
function formatFactorForDisplay(factor) {
    const abs = factor.abs();

    // Very large or very small numbers use scientific notation
    if (abs.greaterThan(1e12) || (abs.lessThan(1e-6) && abs.greaterThan(0))) {
        return factor.toExponential(6).replace(/\.?0+e/, 'e');
    }

    // Otherwise, show up to 6 significant decimal places, strip trailing zeros
    let str = factor.toFixed(10);
    str = str.replace(/\.?0+$/, '');

    // If it's still very long, truncate
    if (str.length > 15) {
        str = factor.toPrecision(8).replace(/\.?0+$/, '');
    }

    return str;
}

/**
 * Get pre-computed conversion values for a quick reference table
 * @param {string} fromUnit - Source unit key
 * @param {string} toUnit - Target unit key
 * @param {string} category - Unit category
 * @param {number} decimals - Max decimal places (default: 6)
 * @returns {Array} - Array of { input, output } objects
 */
export function getQuickReferenceValues(fromUnit, toUnit, category, decimals = 6) {
    if (!definitions[category]) return [];

    const categoryDef = definitions[category];
    if (!categoryDef.units[fromUnit] || !categoryDef.units[toUnit]) return [];

    const referenceInputs = ['1', '5', '10', '25', '50', '100', '500', '1000'];

    return referenceInputs.map(val => {
        try {
            const converted = convert(val, fromUnit, toUnit, category);
            return {
                input: val,
                output: formatValue(converted, decimals)
            };
        } catch {
            return { input: val, output: 'Error' };
        }
    });
}

const Converter = {
    convert,
    getUnitsForCategory,
    getCategories,
    getConversionInfo,
    getQuickReferenceValues,
    definitions
};

export default Converter;

