import React, { createContext, useContext } from 'react';
import { useHistory as useHistoryHook } from '../hooks/useHistory.js';

const HistoryContext = createContext(null);

export function HistoryProvider({ children }) {
    const {
        history,
        addToHistory,
        clearHistory,
        deleteHistoryEntry
    } = useHistoryHook();

    const value = {
        history,
        addToHistory,
        clearHistory,
        deleteHistoryEntry
    };

    return (
        <HistoryContext.Provider value={value}>
            {children}
        </HistoryContext.Provider>
    );
}

/**
 * Hook to access history context
 * @returns {{ history: Array, addToHistory: Function, clearHistory: Function, deleteHistoryEntry: Function }}
 */
export function useHistoryContext() {
    const context = useContext(HistoryContext);
    if (!context) {
        throw new Error('useHistoryContext must be used within a HistoryProvider');
    }
    return context;
}

