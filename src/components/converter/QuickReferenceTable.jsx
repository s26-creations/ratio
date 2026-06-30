import React, { useMemo } from 'react';
import { ArrowUpRight } from 'lucide-react';
import Converter from '../../engine/core/converter.js';

export function QuickReferenceTable({
    category,
    fromUnit,
    toUnit,
    fromUnitSymbol,
    toUnitSymbol,
    onSelectValue,
    currentInput
}) {
    const rows = useMemo(() => {
        return Converter.getQuickReferenceValues(fromUnit, toUnit, category, 6);
    }, [fromUnit, toUnit, category]);

    if (!rows || rows.length === 0) return null;

    return (
        <section className="relative animate-section-enter border-t border-gray-200/50 dark:border-white/10 pt-12 mt-12" aria-label="Quick reference table">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                <h3 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-[0.15em]">
                    Reference Guide
                </h3>
            </div>
            
            <div className="md:flex md:items-start md:gap-12 lg:gap-20">
                <div className="md:w-1/3 mb-8 md:mb-0">
                    <h2 className="font-grotesk text-3xl font-bold text-gray-900 dark:text-white tracking-tight mb-4">
                        Quick Conversions
                    </h2>
                    <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed">
                        Need a common value quickly? We've pre-calculated the most frequently searched {fromUnit} to {toUnit} conversions. 
                        Our engine processes these values with strict arbitrary-precision, ensuring complete accuracy for professional usage.
                        Click any row to instantly load it into the calculator.
                    </p>
                </div>

                <div className="md:w-2/3 w-full">
                    <div className="border-t border-gray-200 dark:border-white/10">
                        {/* Table Header */}
                        <div className="flex items-center justify-between text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest py-4 border-b border-gray-100 dark:border-white/5">
                            <div className="w-1/2 px-2">{fromUnitSymbol || 'From'}</div>
                            <div className="w-1/2 px-2">{toUnitSymbol || 'To'}</div>
                        </div>

                        {/* Table Rows */}
                        <div className="flex flex-col">
                            {rows.map((row, index) => {
                                const isActive = currentInput === row.input;
                                return (
                                    <button
                                        key={row.input}
                                        onClick={() => onSelectValue(row.input)}
                                        className={`animate-row-enter w-full flex items-center justify-between text-left transition-all duration-300 group py-4 border-b border-gray-100/50 dark:border-white/[0.03] hover:bg-gray-50/50 dark:hover:bg-white/[0.02] ${isActive ? 'bg-indigo-50/30 dark:bg-indigo-900/10' : ''}`}
                                        style={{ animationDelay: `${index * 60}ms` }}
                                        aria-label={`Convert ${row.input} ${fromUnitSymbol} to ${row.output} ${toUnitSymbol}`}
                                    >
                                        <div className={`w-1/2 px-2 font-grotesk text-lg transition-colors duration-300 ${isActive ? 'text-indigo-600 dark:text-indigo-400 font-bold' : 'text-gray-900 dark:text-white'}`}>
                                            {row.input}
                                        </div>
                                        <div className="w-1/2 px-2 flex items-center justify-between">
                                            <span className={`font-grotesk text-lg transition-colors duration-300 ${isActive ? 'text-indigo-600 dark:text-indigo-400 font-bold' : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'}`}>
                                                {row.output}
                                            </span>
                                            <ArrowUpRight
                                                size={16}
                                                className={`transition-all duration-300 flex-shrink-0 ${isActive ? 'text-indigo-500 dark:text-indigo-400 opacity-100' : 'text-gray-300 dark:text-gray-600 opacity-0 group-hover:opacity-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5'}`}
                                            />
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default QuickReferenceTable;
