import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Layout
import Header from './components/layout/Header.jsx';
import Background from './components/layout/Background.jsx';
import FavoritesPanel from './components/panels/FavoritesPanel.jsx';

// Pages
import ConverterPage from './pages/ConverterPage.jsx';
import HistoryPage from './pages/HistoryPage.jsx';
import BatchPage from './pages/BatchPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';

// Context
import { useSettings } from './context/SettingsContext.jsx';
import { useFavoritesContext } from './context/FavoritesContext.jsx';
import { useConverterContext } from './context/ConverterContext.jsx';
import { useHistoryContext } from './context/HistoryContext.jsx';

function App() {
  const { darkMode } = useSettings();
  const { history } = useHistoryContext();
  const {
    favorites,
    removeFavorite,
    clearFavorites,
    showFavorites,
    toggleFavoritesPanel,
    closeFavoritesPanel
  } = useFavoritesContext();

  const {
    categories,
    category,
    setCategory,
    setFromUnit,
    setToUnit
  } = useConverterContext();

  const handleFavoriteSelect = (fav) => {
    setCategory(fav.category);
    setFromUnit(fav.fromUnit);
    setToUnit(fav.toUnit);
    closeFavoritesPanel();
  };

  return (
    <div className={`min-h-screen transition-colors duration-700 relative overflow-x-hidden ${darkMode ? 'dark' : ''}`}>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-white dark:focus:bg-gray-900 focus:text-blue-600 dark:focus:text-blue-400 focus:rounded-br-xl focus:shadow-lg font-medium">
        Skip to content
      </a>
      <Background />

      <Header
        toggleFavorites={toggleFavoritesPanel}
        historyCount={history.length}
        favoritesCount={favorites.length}
        categories={categories}
        selectedCategory={category}
        onSelectCategory={setCategory}
        isPanelOpen={showFavorites}
      />

      <main id="main-content" className="min-h-screen flex flex-col items-center justify-start pt-20 md:pt-32 pb-20 px-4 relative z-10">
        <FavoritesPanel
          isOpen={showFavorites}
          onClose={closeFavoritesPanel}
          favorites={favorites}
          onSelectFavorite={handleFavoriteSelect}
          onRemoveFavorite={removeFavorite}
          onClearFavorites={clearFavorites}
        />

        <Routes>
          <Route path="/" element={<ConverterPage />} />
          <Route path="/convert/:categoryParam/:unitsParam" element={<ConverterPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/batch" element={<BatchPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
