import { useState, useEffect, useCallback } from 'react';

/**
 * Hook for localStorage persistence
 * @param {string} key - Storage key
 * @param {any} initialValue - Default value
 * @returns {Array} - [storedValue, setValue]
 */
export function useLocalStorage(key, initialValue) {
    // Get from local storage then parse stored json or return initialValue
    const readValue = () => {
        if (typeof window === 'undefined') {
            return initialValue;
        }

        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.warn(`Error reading localStorage key "${key}":`, error);
            return initialValue;
        }
    };

    const [storedValue, setStoredValue] = useState(readValue);

    // Return a wrapped version of useState's setter function that ...
    // ... persists the new value to localStorage.
    const setValue = useCallback((value) => {
        try {
            setStoredValue((prevStoredValue) => {
                // Allow value to be a function so we have same API as useState
                const valueToStore = value instanceof Function ? value(prevStoredValue) : value;
                
                if (typeof window !== 'undefined') {
                    window.localStorage.setItem(key, JSON.stringify(valueToStore));
                }
                
                return valueToStore;
            });
        } catch (error) {
            console.warn(`Error setting localStorage key "${key}":`, error);
        }
    }, [key]);

    useEffect(() => {
        setStoredValue(readValue());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return [storedValue, setValue];
}
