import React, { useEffect, useRef, useState } from 'react';
import { X, Star, Trash2, ArrowRight } from 'lucide-react';
import ConfirmModal from '../common/ConfirmModal.jsx';

export function FavoritesPanel({
    isOpen,
    onClose,
    favorites,
    onSelectFavorite,
    onRemoveFavorite,
    onClearFavorites
}) {
    const panelRef = useRef(null);
    const [isClearModalOpen, setIsClearModalOpen] = useState(false);

    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose();
                return;
            }

            if (e.key === 'Tab') {
                const focusableElements = panelRef.current?.querySelectorAll(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                );
                
                if (!focusableElements || focusableElements.length === 0) return;

                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];

                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        lastElement.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        firstElement.focus();
                        e.preventDefault();
                    }
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        
        // Initial focus
        const closeBtn = panelRef.current?.querySelector('[aria-label="Close favorites"]');
        if (closeBtn) closeBtn.focus();

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div 
            ref={panelRef}
            className="fixed inset-x-4 top-24 md:absolute md:top-20 md:right-16 md:w-80 md:inset-x-auto glass-panel rounded-2xl shadow-2xl overflow-hidden z-50 animate-scale-in origin-top-right backdrop-blur-xl"
            role="dialog"
            aria-modal="true"
            aria-label="Favorites"
        >
            <div className="p-4 border-b border-gray-200/50 dark:border-gray-700/50 flex items-center justify-between bg-white/50 dark:bg-gray-800/50">
                <div className="flex items-center gap-2">
                    <Star size={18} className="text-amber-500" fill="currentColor" />
                    <h3 className="font-semibold text-gray-900 dark:text-white">Favorites</h3>
                    {favorites.length > 0 && (
                        <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-full">
                            {favorites.length}
                        </span>
                    )}
                </div>
                <div className="flex items-center gap-1">
                    {favorites.length > 0 && (
                        <button
                            onClick={() => setIsClearModalOpen(true)}
                            className="p-1.5 hover:bg-red-100 dark:hover:bg-red-900/30 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 rounded-lg transition-colors"
                            title="Clear all favorites"
                            aria-label="Clear all favorites"
                        >
                            <Trash2 size={14} />
                        </button>
                    )}
                    <button
                        onClick={onClose}
                        className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-lg transition-colors"
                        aria-label="Close favorites"
                    >
                        <X size={16} />
                    </button>
                </div>
            </div>

            <div className="max-h-80 overflow-y-auto no-scrollbar">
                {favorites.length === 0 ? (
                    <div className="p-8 text-center">
                        <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                            <Star size={24} className="text-gray-400 dark:text-gray-600" />
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">No favorites yet</p>
                        <p className="text-xs text-gray-500 dark:text-gray-500">
                            Click the ★ button after converting to save your favorite pairs
                        </p>
                    </div>
                ) : (
                    <div className="p-2 space-y-1">
                        {favorites.map((fav) => (
                            <button
                                key={fav.id}
                                className="w-full group flex items-center gap-2 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onClick={() => onSelectFavorite(fav)}
                            >
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-white">
                                        <span className="truncate">{fav.fromSymbol}</span>
                                        <ArrowRight size={12} className="text-gray-500 dark:text-gray-400 flex-shrink-0" />
                                        <span className="truncate">{fav.toSymbol}</span>
                                    </div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                        {fav.categoryName || fav.category}
                                    </div>
                                </div>
                                <div
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onRemoveFavorite(fav.id);
                                    }}
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            onRemoveFavorite(fav.id);
                                        }
                                    }}
                                    className="p-1.5 opacity-0 group-hover:opacity-100 hover:bg-red-100 dark:hover:bg-red-900/30 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 rounded-lg transition-all focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                                    title="Remove favorite"
                                    aria-label={`Remove ${fav.fromSymbol} to ${fav.toSymbol} from favorites`}
                                >
                                    <X size={14} />
                                </div>
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <ConfirmModal
                isOpen={isClearModalOpen}
                onClose={() => setIsClearModalOpen(false)}
                onConfirm={onClearFavorites}
                title="Clear Favorites"
                message="Are you sure you want to remove all your favorite conversions? This action cannot be undone."
                confirmText="Clear Favorites"
                isDestructive={true}
            />
        </div>
    );
}

export default FavoritesPanel;
