import { useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage.js';

/**
 * Hook for Dark Mode management
 * @returns {Array} - [isDarkMode, setIsDarkMode]
 */
export function useDarkMode() {
    const [darkMode, setDarkMode] = useLocalStorage('darkMode', true);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    return [darkMode, setDarkMode];
}
