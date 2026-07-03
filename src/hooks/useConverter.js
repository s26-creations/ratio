import { useState, useEffect, useMemo, useCallback } from 'react';
import Converter from '../engine/core/converter.js';
import { isValidNumberFormat } from '../engine/utils/validators.js';
import { formatValue } from '../engine/utils/formatters.js';
import { getDefaultUnits } from '../constants/categoryDefaults.js';
import { useLocalStorage } from './useLocalStorage.js';
import { useSettings } from '../context/SettingsContext.jsx';

/**
 * Main hook for conversion logic
 * @returns {object} - Converter state and actions
 */
export function useConverter() {
    // State
    const [category, setCategory] = useLocalStorage('lastCategory', 'length');
    const [fromUnit, setFromUnit] = useState('kilometer');
    const [toUnit, setToUnit] = useState('mile');
    const [inputValue, setInputValue] = useState('100');
    const [result, setResult] = useState('');
    const { decimals } = useSettings();
    const [error, setError] = useState(null);

    // Validate category on mount/change
    useEffect(() => {
        if (!Converter.definitions[category]) {
            setCategory('length');
        }
    }, [category, setCategory]);

    // Safe category setter that updates units synchronously if needed
    const handleSetCategory = useCallback((newCategory) => {
        if (newCategory === category) return;
        
        const categoryDef = Converter.definitions[newCategory];
        if (!categoryDef) return;

        const fromExists = categoryDef.units[fromUnit];
        const toExists = categoryDef.units[toUnit];

        setCategory(newCategory);

        // If current units don't exist in new category, update them in the same batch
        if (!(fromExists && toExists && fromUnit !== toUnit)) {
            const defaults = getDefaultUnits(newCategory);
            setFromUnit(defaults.from);
            setToUnit(defaults.to);
        }
    }, [category, fromUnit, toUnit, setCategory]);

    // Batch setter for all three to prevent intermediate renders
    const setConversion = useCallback((newCategory, newFrom, newTo) => {
        const categoryDef = Converter.definitions[newCategory];
        
        if (!categoryDef) {
            setCategory('length');
            const defaults = getDefaultUnits('length');
            setFromUnit(defaults.from);
            setToUnit(defaults.to);
            return;
        }

        const fromExists = categoryDef.units[newFrom];
        const toExists = categoryDef.units[newTo];

        setCategory(newCategory);
        
        if (fromExists && toExists) {
            setFromUnit(newFrom);
            setToUnit(newTo);
        } else {
            const defaults = getDefaultUnits(newCategory);
            setFromUnit(defaults.from);
            setToUnit(defaults.to);
        }
    }, [setCategory]);

    // Perform conversion when inputs change
    useEffect(() => {
        if (!inputValue) {
            setResult('');
            setError(null);
            return;
        }

        // Validate input format
        if (!isValidNumberFormat(inputValue)) {
            setError('Invalid number format');
            return;
        }

        // Safety check: Ensure units belong to current category
        // This prevents race conditions where category updates before units
        const categoryDef = Converter.definitions[category];
        if (!categoryDef || !categoryDef.units[fromUnit] || !categoryDef.units[toUnit]) {
            return;
        }

        try {
            // Perform conversion
            const converted = Converter.convert(inputValue, fromUnit, toUnit, category);
            const formattedResult = formatValue(converted, decimals);

            setResult(formattedResult);
            setError(null);
        } catch (e) {
            console.error('Conversion error:', e);
            setError(e.message);
            setResult('');
        }
    }, [inputValue, fromUnit, toUnit, category, decimals]);

    // Actions
    const swapUnits = useCallback(() => {
        setFromUnit(toUnit);
        setToUnit(fromUnit);
        // Optional: set input to result to chain conversions
        if (result && !error) {
            setInputValue(result);
        }
    }, [fromUnit, toUnit, result, error]);

    // Memoized lists
    const categories = useMemo(() => Converter.getCategories(), []);

    const units = useMemo(() => {
        try {
            return Converter.getUnitsForCategory(category);
        } catch {
            return [];
        }
    }, [category]);

    const currentCategoryDef = useMemo(() => Converter.definitions[category], [category]);
    const fromUnitSymbol = useMemo(() => currentCategoryDef?.units[fromUnit]?.symbol || '', [currentCategoryDef, fromUnit]);
    const toUnitSymbol = useMemo(() => currentCategoryDef?.units[toUnit]?.symbol || '', [currentCategoryDef, toUnit]);

    return {
        // State
        category,
        fromUnit,
        toUnit,
        inputValue,
        result,
        decimals,
        error,

        // Derived state
        categories,
        units,
        fromUnitSymbol,
        toUnitSymbol,

        // Setters
        setCategory: handleSetCategory,
        setFromUnit,
        setToUnit,
        setInputValue,
        setConversion,

        // Actions
        swapUnits
    };
}
