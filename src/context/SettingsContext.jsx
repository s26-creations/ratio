import React, { createContext, useContext, useCallback } from 'react';
import { useDarkMode } from '../hooks/useDarkMode.js';
import { useLocalStorage } from '../hooks/useLocalStorage.js';

const SettingsContext = createContext(null);

export function SettingsProvider({ children }) {
    const [darkMode, setDarkMode] = useDarkMode();
    const [decimals, setDecimals] = useLocalStorage('decimalPrecision', 10);

    const toggleDarkMode = useCallback(() => {
        setDarkMode(prev => !prev);
    }, [setDarkMode]);

    const value = {
        darkMode,
        toggleDarkMode,
        decimals,
        setDecimals
    };

    return (
        <SettingsContext.Provider value={value}>
            {children}
        </SettingsContext.Provider>
    );
}

/**
 * Hook to access settings context
 * @returns {{ darkMode: boolean, toggleDarkMode: Function, decimals: number, setDecimals: Function }}
 */
export function useSettings() {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
}

