import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Settings, History, Table2, Star } from 'lucide-react';
import Button from '../common/Button.jsx';
import CategorySelector from '../converter/CategorySelector.jsx';

export function Header({
    toggleFavorites,
    historyCount,
    favoritesCount,
    categories,
    selectedCategory,
    onSelectCategory,
    isPanelOpen
}) {
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;

    const handleNavigation = (path) => {
        if (currentPath === path) {
            navigate('/');
        } else {
            navigate(path);
        }
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-40 px-3 md:px-6 py-3 md:py-6 flex items-center justify-between pointer-events-none">

            <div className={`flex items-center gap-2 md:gap-3 pointer-events-auto transition-opacity duration-200 ${isPanelOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                <div onClick={() => navigate('/')} className="cursor-pointer group">
                    <h1 className="text-lg font-bold text-gray-900 dark:text-white leading-none tracking-wider group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        RATIO
                    </h1>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium tracking-wide hidden sm:block">
                        The Most Precise (and Beautiful) Unit Converter
                    </p>
                </div>
            </div>

            {/* Center: Category Selector */}
            <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto w-64 hidden md:block transition-all duration-200 ${currentPath !== '/' && !currentPath.startsWith('/convert') ? 'opacity-0 pointer-events-none scale-95' : 'opacity-100'}`}>
                <div className="glass-panel rounded-2xl p-1 shadow-lg">
                    <CategorySelector
                        categories={categories}
                        selectedCategory={selectedCategory}
                        onSelectCategory={onSelectCategory}
                    />
                </div>
            </div>

            <div className="flex items-center gap-1.5 md:gap-2 pointer-events-auto glass-panel p-1 md:p-1.5 rounded-2xl min-w-[120px] md:min-w-[140px] justify-end">
                {/* Favorites Button (Overlay) */}
                <div className="relative">
                    <Button
                        variant="icon"
                        onClick={toggleFavorites}
                        title="Favorites"
                        className="hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl"
                    >
                        <Star size={18} className={favoritesCount > 0 ? "text-amber-500" : ""} fill={favoritesCount > 0 ? "currentColor" : "none"} />
                    </Button>
                    {favoritesCount > 0 && (
                        <span className="absolute top-1 right-1 w-2 h-2 bg-amber-500 rounded-full ring-2 ring-white dark:ring-black"></span>
                    )}
                </div>

                {/* History Button (View) */}
                <div className="relative">
                    <Button
                        variant="icon"
                        onClick={() => handleNavigation('/history')}
                        title="View history"
                        className={`rounded-xl transition-all ${currentPath === '/history'
                            ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                            }`}
                    >
                        <History size={18} />
                    </Button>
                    {historyCount > 0 && currentPath !== '/history' && (
                        <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full ring-2 ring-white dark:ring-black"></span>
                    )}
                </div>


                {/* Batch Convert Button (View) */}
                <Button
                    variant="icon"
                    onClick={() => handleNavigation('/batch')}
                    title="Batch Convert"
                    className={`rounded-xl transition-all ${currentPath === '/batch'
                        ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                >
                    <Table2 size={18} />
                </Button>

                <div className="w-px h-4 bg-gray-200 dark:bg-gray-700 mx-1"></div>

                {/* Settings Button (View) */}
                <Button
                    variant="icon"
                    onClick={() => handleNavigation('/settings')}
                    title="Settings"
                    className={`rounded-xl transition-all ${currentPath === '/settings'
                        ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                >
                    <Settings size={18} />
                </Button>
            </div>
        </header>
    );
}

export default Header;
