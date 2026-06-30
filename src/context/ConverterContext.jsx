import React, { createContext, useContext, useEffect, useCallback, useState } from 'react';
import { useConverter as useConverterHook } from '../hooks/useConverter.js';
import { useHistoryContext } from './HistoryContext.jsx';

const ConverterContext = createContext(null);

export function ConverterProvider({ children }) {
    const converter = useConverterHook();
    const { addToHistory } = useHistoryContext();

    const {
        category,
        fromUnit,
        toUnit,
        inputValue,
        result,
        fromUnitSymbol,
        toUnitSymbol
    } = converter;

    // Clipboard state
    const [copied, setCopied] = useState(false);

    // Add to history when we have a valid result (debounced)
    useEffect(() => {
        if (result && inputValue && result !== '0' && result !== 'Error') {
            const timer = setTimeout(() => {
                addToHistory({
                    id: Date.now(),
                    category,
                    from: {
                        value: inputValue,
                        unit: fromUnit,
                        symbol: fromUnitSymbol
                    },
                    to: {
                        value: result,
                        unit: toUnit,
                        symbol: toUnitSymbol
                    },
                    timestamp: new Date().toISOString()
                });
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [result, inputValue, category, fromUnit, toUnit, fromUnitSymbol, toUnitSymbol, addToHistory]);

    // Copy result to clipboard
    const handleCopy = useCallback(() => {
        if (result) {
            try {
                navigator.clipboard.writeText(result);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            } catch (err) {
                console.error('Failed to copy to clipboard', err);
            }
        }
    }, [result]);

    const value = {
        ...converter,
        copied,
        handleCopy
    };

    return (
        <ConverterContext.Provider value={value}>
            {children}
        </ConverterContext.Provider>
    );
}

/**
 * Hook to access converter context
 * @returns {object} Converter state and actions
 */
export function useConverterContext() {
    const context = useContext(ConverterContext);
    if (!context) {
        throw new Error('useConverterContext must be used within a ConverterProvider');
    }
    return context;
}

