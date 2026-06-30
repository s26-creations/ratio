import { useLocalStorage } from './useLocalStorage.js';

/**
 * Hook for managing favorite unit conversion pairs
 * @returns {object} - Favorites state and actions
 */
export function useFavorites() {
    const [favorites, setFavorites] = useLocalStorage('ratioFavorites', []);

    /**
     * Add a conversion pair to favorites
     */
    const addFavorite = (category, fromUnit, toUnit, fromSymbol, toSymbol, categoryName) => {
        const id = `${category}-${fromUnit}-${toUnit}`;

        // Don't add duplicates
        if (favorites.some(f => f.id === id)) {
            return false;
        }

        const newFavorite = {
            id,
            category,
            categoryName,
            fromUnit,
            toUnit,
            fromSymbol,
            toSymbol,
            createdAt: new Date().toISOString()
        };

        setFavorites(prev => [newFavorite, ...prev]);
        return true;
    };

    /**
     * Remove a favorite by ID
     */
    const removeFavorite = (id) => {
        setFavorites(prev => prev.filter(f => f.id !== id));
    };

    /**
     * Check if a conversion pair is favorited
     */
    const isFavorite = (category, fromUnit, toUnit) => {
        const id = `${category}-${fromUnit}-${toUnit}`;
        return favorites.some(f => f.id === id);
    };

    /**
     * Toggle favorite status for a conversion pair
     */
    const toggleFavorite = (category, fromUnit, toUnit, fromSymbol, toSymbol, categoryName) => {
        if (isFavorite(category, fromUnit, toUnit)) {
            const id = `${category}-${fromUnit}-${toUnit}`;
            removeFavorite(id);
            return false; // removed
        } else {
            addFavorite(category, fromUnit, toUnit, fromSymbol, toSymbol, categoryName);
            return true; // added
        }
    };

    /**
     * Clear all favorites
     */
    const clearFavorites = () => {
        setFavorites([]);
    };

    return {
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        toggleFavorite,
        clearFavorites
    };
}
