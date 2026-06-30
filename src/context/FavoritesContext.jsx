import React, { createContext, useContext, useState, useCallback } from 'react';
import { useFavorites as useFavoritesHook } from '../hooks/useFavorites.js';

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
    const {
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        toggleFavorite,
        clearFavorites
    } = useFavoritesHook();

    // UI state for the favorites overlay panel
    const [showFavorites, setShowFavorites] = useState(false);

    const toggleFavoritesPanel = useCallback(() => {
        setShowFavorites(prev => !prev);
    }, []);

    const closeFavoritesPanel = useCallback(() => {
        setShowFavorites(false);
    }, []);

    const value = {
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        toggleFavorite,
        clearFavorites,
        showFavorites,
        setShowFavorites,
        toggleFavoritesPanel,
        closeFavoritesPanel
    };

    return (
        <FavoritesContext.Provider value={value}>
            {children}
        </FavoritesContext.Provider>
    );
}

/**
 * Hook to access favorites context
 * @returns {object} Favorites state and actions
 */
export function useFavoritesContext() {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('useFavoritesContext must be used within a FavoritesProvider');
    }
    return context;
}

