import React from 'react';
import { SettingsProvider } from './SettingsContext.jsx';
import { HistoryProvider } from './HistoryContext.jsx';
import { FavoritesProvider } from './FavoritesContext.jsx';
import { ConverterProvider } from './ConverterContext.jsx';

/**
 * Composes all application context providers in the correct dependency order.
 * 
 * Order matters:
 * - Settings is independent (outermost)
 * - History is independent
 * - Converter depends on History (for auto-save)
 * - Favorites is independent but sits inside for access
 */
export function AppProviders({ children }) {
    return (
        <SettingsProvider>
            <HistoryProvider>
                <ConverterProvider>
                    <FavoritesProvider>
                        {children}
                    </FavoritesProvider>
                </ConverterProvider>
            </HistoryProvider>
        </SettingsProvider>
    );
}

export default AppProviders;
