
import React, { useState, useEffect, useMemo } from 'react';
import { X, Copy, FileText, ArrowRight, Table2 } from 'lucide-react';
import Converter from '../../engine/core/converter.js';
import { formatValue } from '../../engine/utils/formatters.js';
import { getDefaultUnits } from '../../constants/categoryDefaults.js';
import UnitSelector from '../converter/UnitSelector.jsx';
import CategorySelector from '../converter/CategorySelector.jsx';

export function BatchConvertPanel({
    category: initialCategory,
    units: initialUnits,
    defaultFrom,
    defaultTo
}) {
    // Local state for category and units
    const [activeCategory, setActiveCategory] = useState(initialCategory);
    const [activeUnits, setActiveUnits] = useState(initialUnits);

    const [input, setInput] = useState('');
    const [fromUnit, setFromUnit] = useState(defaultFrom);
    const [toUnit, setToUnit] = useState(defaultTo);
    const [results, setResults] = useState([]);
    const [copied, setCopied] = useState(false);

    // Get all categories for the selector
    const categories = useMemo(() => Converter.getCategories(), []);

    // Sync with props when panel opens or props change
    useEffect(() => {
        setActiveCategory(initialCategory);
        setActiveUnits(initialUnits);
        setFromUnit(defaultFrom);
        setToUnit(defaultTo);
    }, [initialCategory, initialUnits, defaultFrom, defaultTo]);

    // Update units and defaults when local category changes
    useEffect(() => {
        if (activeCategory === initialCategory) return; // Skip if it matches props (handled above)

        try {
            const newUnits = Converter.getUnitsForCategory(activeCategory);
            setActiveUnits(newUnits);

            const defaults = getDefaultUnits(activeCategory);
            setFromUnit(defaults.from);
            setToUnit(defaults.to);
        } catch (e) {
            console.error('Error updating category:', e);
        }
    }, [activeCategory, initialCategory]);

    // Process conversions whenever input or units change
    useEffect(() => {
        if (!input.trim()) {
            setResults([]);
            return;
        }

        // Safety check: Ensure units belong to current category
        const categoryDef = Converter.definitions[activeCategory];
        if (!categoryDef || !categoryDef.units[fromUnit] || !categoryDef.units[toUnit]) {
            return;
        }

        const lines = input.split(/\n|,/).map(s => s.trim()).filter(s => s !== '');

        const newResults = lines.map(val => {
            // Basic validation: check if it's a number
            if (isNaN(val) || val === '') {
                return { input: val, output: 'Invalid', error: true };
            }

            try {
                const converted = Converter.convert(val, fromUnit, toUnit, activeCategory);
                return {
                    input: val,
                    output: formatValue(converted, 6), // 6 decimals for batch seems reasonable
                    error: false
                };
            } catch {
                return { input: val, output: 'Error', error: true };
            }
        });

        setResults(newResults);
    }, [input, fromUnit, toUnit, activeCategory]);

    const handleCopy = () => {
        const text = results
            .map(r => `${r.input} ${getSymbol(fromUnit)} = ${r.output} ${getSymbol(toUnit)} `)
            .join('\n');

        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const getSymbol = (unitKey) => {
        const unit = activeUnits.find(u => u.key === unitKey);
        return unit ? unit.symbol : '';
    };

    return (
        <div className="w-full max-w-7xl mx-auto animate-slide-up pb-6 px-1">
            {/* Header */}
            <div className="flex items-center justify-between mb-6 px-2 shrink-0">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-xl">
                        <Table2 size={22} />
                    </div>
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">Batch Convert</h2>
                        <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-medium">Convert multiple values at once</p>
                    </div>
                </div>
            </div>

            {/* Split Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">

                {/* Left Column: Controls & Input */}
                <div className="flex flex-col gap-4">

                    {/* Controls Panel */}
                    <div className="glass-panel rounded-2xl p-4 md:p-6 space-y-4">
                        <div className="flex items-center justify-between">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Category</label>
                        </div>
                        <CategorySelector
                            categories={categories}
                            selectedCategory={activeCategory}
                            onSelectCategory={setActiveCategory}
                        />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 relative">
                            {/* Arrow indicator - desktop only */}
                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-600 pointer-events-none z-10 hidden sm:block">
                                <ArrowRight size={16} />
                            </div>

                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">From</label>
                                <UnitSelector
                                    units={activeUnits}
                                    selectedUnit={fromUnit}
                                    onSelectUnit={setFromUnit}
                                />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">To</label>
                                <UnitSelector
                                    units={activeUnits}
                                    selectedUnit={toUnit}
                                    onSelectUnit={setToUnit}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Input Panel */}
                    <div className="glass-panel rounded-2xl p-4 md:p-6 flex flex-col">
                        <div className="flex justify-between items-center mb-3">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                                Input Values
                            </label>
                            <span className="text-xs text-slate-400 font-medium">
                                One per line or comma separated
                            </span>
                        </div>
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="e.g.&#10;10&#10;25.5&#10;100"
                            className="w-full min-h-[200px] p-4 rounded-xl bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-gray-800/50 focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-y text-base font-mono transition-shadow duration-200"
                            autoFocus
                        />
                    </div>
                </div>

                {/* Results Column */}
                <div className="glass-panel rounded-2xl overflow-hidden flex flex-col min-h-[250px] md:min-h-0">
                    <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-white/50 dark:bg-gray-900/20 backdrop-blur-sm">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                            <span>Results</span>
                            <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 px-2 py-0.5 rounded-full text-[10px]">
                                {results.length}
                            </span>
                        </label>

                        {results.length > 0 && (
                            <button
                                onClick={handleCopy}
                                className="flex items-center gap-1.5 text-xs font-bold text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors uppercase tracking-wide bg-purple-50 dark:bg-purple-900/20 px-3 py-1.5 rounded-lg"
                            >
                                {copied ? (
                                    <>Copied!</>
                                ) : (
                                    <>
                                        <Copy size={14} />
                                        Copy All
                                    </>
                                )}
                            </button>
                        )}
                    </div>

                    <div className="flex-1 overflow-y-auto custom-scrollbar bg-white/30 dark:bg-gray-900/10">
                        {results.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-gray-400 text-center p-6 py-12">
                                <div className="w-14 h-14 rounded-full bg-gray-50 dark:bg-gray-800/50 flex items-center justify-center mb-3">
                                    <FileText size={22} className="opacity-40" />
                                </div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">No results yet</p>
                                <p className="text-xs text-gray-400 mt-1">Enter values above to convert</p>
                            </div>
                        ) : (
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-gray-500 bg-gray-50/80 dark:bg-gray-800/50 sticky top-0 backdrop-blur-sm z-10 border-b border-gray-100 dark:border-gray-800">
                                    <tr>
                                        <th className="px-6 py-3 font-medium w-1/2">Input ({getSymbol(fromUnit)})</th>
                                        <th className="px-6 py-3 font-medium w-1/2">Result ({getSymbol(toUnit)})</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-gray-800/50">
                                    {results.map((r, i) => (
                                        <tr key={i} className="group hover:bg-purple-50/50 dark:hover:bg-purple-900/10 transition-colors duration-150">
                                            <td className="px-6 py-3 font-mono text-gray-600 dark:text-gray-400">
                                                {r.input}
                                            </td>
                                            <td className={`px-6 py-3 font-mono font-medium ${r.error ? 'text-red-500' : 'text-gray-900 dark:text-gray-200'}`}>
                                                {r.output}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BatchConvertPanel;
