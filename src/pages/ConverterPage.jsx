import React, { useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useConverterContext } from '../context/ConverterContext.jsx';
import { useFavoritesContext } from '../context/FavoritesContext.jsx';
import { useSettings } from '../context/SettingsContext.jsx';

import CategorySelector from '../components/converter/CategorySelector.jsx';
import UnitSelector from '../components/converter/UnitSelector.jsx';
import ValueInput from '../components/converter/ValueInput.jsx';
import SwapButton from '../components/converter/SwapButton.jsx';
import ResultDisplay from '../components/converter/ResultDisplay.jsx';
import FormulaBreakdown from '../components/converter/FormulaBreakdown.jsx';
import QuickReferenceTable from '../components/converter/QuickReferenceTable.jsx';
import PopularConversions from '../components/converter/PopularConversions.jsx';
import { Star } from 'lucide-react';

export function ConverterPage() {
    const {
        category,
        fromUnit,
        toUnit,
        inputValue,
        result,
        error,
        categories,
        units,
        fromUnitSymbol,
        toUnitSymbol,
        setCategory,
        setFromUnit,
        setToUnit,
        setInputValue,
        swapUnits,
        copied,
        handleCopy
    } = useConverterContext();

    const { darkMode } = useSettings();
    const { toggleFavorite, isFavorite } = useFavoritesContext();

    const getCategoryName = () => {
        const cat = categories.find(c => c.key === category);
        return cat ? cat.name : category;
    };

    const { categoryParam, unitsParam } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    // Sync URL -> State (runs when location changes)
    useEffect(() => {
        if (!categoryParam || !unitsParam) return;
        
        const [urlFrom, urlTo] = unitsParam.split('-to-');
        if (!urlFrom || !urlTo) return;

        // Only update state if it differs from the URL to avoid loops
        // React 18 batches these synchronously
        if (category !== categoryParam) setCategory(categoryParam);
        if (fromUnit !== urlFrom) setFromUnit(urlFrom);
        if (toUnit !== urlTo) setToUnit(urlTo);
        
    }, [categoryParam, unitsParam, category, fromUnit, toUnit, setCategory, setFromUnit, setToUnit, location.pathname]);

    // Sync State -> URL
    useEffect(() => {
        if (!category || !fromUnit || !toUnit) return;
        const expectedPath = `/convert/${category}/${fromUnit}-to-${toUnit}`;
        if (location.pathname !== expectedPath) {
            navigate(expectedPath, { replace: true });
        }
    }, [category, fromUnit, toUnit, navigate, location.pathname]);

    const categoryName = getCategoryName();
    const title = `Convert ${fromUnit} to ${toUnit} - Ratio`;
    const description = `Easily convert ${fromUnit} to ${toUnit} in the ${categoryName} category with precision. Ratio is the most beautiful and accurate unit converter.`;
    const canonicalUrl = `https://ratioconverter.vercel.app/convert/${category}/${fromUnit}-to-${toUnit}`;

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": `Ratio - ${title}`,
        "applicationCategory": "UtilityApplication",
        "description": description,
        "offers": { "@type": "Offer", "price": "0" }
    };

    return (
        <div className="w-full max-w-2xl animate-slide-up">
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
                <link rel="canonical" href={canonicalUrl} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:url" content={canonicalUrl} />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={description} />
                <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
            </Helmet>

            {/* Category Selector - Mobile Only */}
            <div className="mb-6 md:mb-12 flex justify-center md:hidden relative z-50">
                <div className="w-full max-w-xs glass-panel rounded-2xl p-1">
                    <CategorySelector
                        categories={categories}
                        selectedCategory={category}
                        onSelectCategory={setCategory}
                    />
                </div>
            </div>

            <div className="space-y-2 sm:space-y-4 md:space-y-8">
                {/* FROM Section */}
                <div className="relative group">
                    <label htmlFor="value-input-from" className="block text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-2 ml-1">
                        From
                    </label>
                    <ValueInput
                        id="value-input-from"
                        value={inputValue}
                        onChange={setInputValue}
                        darkMode={darkMode}
                    />
                    <div className="mt-4 w-full md:w-64">
                        <UnitSelector
                            units={units}
                            selectedUnit={fromUnit}
                            onSelectUnit={setFromUnit}
                        />
                    </div>
                </div>

                {/* Swap Button */}
                <div className="flex justify-center py-1 sm:py-2 md:py-4">
                    <SwapButton onClick={swapUnits} />
                </div>

                {/* TO Section */}
                <div className="relative group">
                    <label htmlFor="result-display-to" className="block text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest mb-2 ml-1">
                        To
                    </label>
                    <ResultDisplay
                        id="result-display-to"
                        result={result}
                        unitSymbol={toUnitSymbol}
                        onCopy={handleCopy}
                        copied={copied}
                    />
                    {error && (
                        <div className="mt-3 flex items-center gap-2 text-red-500 dark:text-red-400 animate-slide-up">
                            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            <span className="text-sm font-medium">{error}</span>
                        </div>
                    )}

                    <div className="mt-4 w-full md:w-64">
                        <UnitSelector
                            units={units}
                            selectedUnit={toUnit}
                            onSelectUnit={setToUnit}
                        />
                    </div>

                    {/* Add to Favorites Button */}
                    <div className="absolute -bottom-4 right-0 translate-y-full flex gap-2 animate-slide-down">
                        {result && !error && (
                            <button
                                onClick={() => toggleFavorite(category, fromUnit, toUnit, fromUnitSymbol, toUnitSymbol, getCategoryName())}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all shadow-sm ${
                                    isFavorite(category, fromUnit, toUnit)
                                    ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 hover:bg-amber-200 dark:hover:bg-amber-900/50' 
                                    : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                                }`}
                            >
                                <Star size={14} className={isFavorite(category, fromUnit, toUnit) ? "fill-amber-500" : ""} />
                                {isFavorite(category, fromUnit, toUnit) ? 'Saved' : 'Save Pair'}
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* === Contextual Content Sections === */}
            <div className="mt-12 md:mt-24 space-y-4 sm:space-y-6 md:space-y-8">

                {/* Section 1: Formula Breakdown */}
                <FormulaBreakdown
                    category={category}
                    fromUnit={fromUnit}
                    toUnit={toUnit}
                    inputValue={inputValue}
                    result={result}
                    fromUnitSymbol={fromUnitSymbol}
                    toUnitSymbol={toUnitSymbol}
                />

                {/* Section 2: Quick Reference Table */}
                <QuickReferenceTable
                    category={category}
                    fromUnit={fromUnit}
                    toUnit={toUnit}
                    fromUnitSymbol={fromUnitSymbol}
                    toUnitSymbol={toUnitSymbol}
                    onSelectValue={setInputValue}
                    currentInput={inputValue}
                />

                {/* Section 3: Popular Conversions */}
                <PopularConversions
                    onSelectConversion={(cat, from, to) => {
                        setCategory(cat);
                        setTimeout(() => {
                            setFromUnit(from);
                            setToUnit(to);
                        }, 0);
                    }}
                />

            </div>

        </div>
    );
}

export default ConverterPage;
