import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage.js';

/**
 * Hook for managing conversion history
 * @returns {object} - History state and actions
 */
export function useHistory() {
    const [history, setHistory] = useLocalStorage('conversionHistory', []);

    /**
     * Add entry to history
     * @param {object} entry - History entry
     */
    const addToHistory = useCallback((entry) => {
        // Prevent duplicates
        setHistory(prev => {
            const isDuplicate = prev.some(h =>
                h.category === entry.category &&
                h.from.unit === entry.from.unit &&
                h.to.unit === entry.to.unit &&
                h.from.value === entry.from.value
            );

            if (isDuplicate) return prev;

            // Add new entry and limit to 20 items
            return [entry, ...prev].slice(0, 20);
        });
    }, [setHistory]);

    /**
     * Clear all history
     */
    const clearHistory = useCallback(() => {
        setHistory([]);
    }, [setHistory]);

    /**
     * Delete specific history entry
     * @param {number} id - Entry ID
     */
    const deleteHistoryEntry = useCallback((id) => {
        setHistory(prev => prev.filter(h => h.id !== id));
    }, [setHistory]);

    return {
        history,
        addToHistory,
        clearHistory,
        deleteHistoryEntry
    };
}
