import React, { useMemo } from 'react';
import { Table, ArrowUpRight } from 'lucide-react';
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
        <section className="relative overflow-hidden glass-panel rounded-3xl animate-section-enter animation-delay-1 border border-gray-200/50 dark:border-white/[0.05] shadow-sm hover:shadow-md transition-shadow duration-300" aria-label="Quick reference table">
            {/* Ambient Glow */}
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-64 h-64 bg-purple-500/10 dark:bg-purple-500/10 rounded-full blur-3xl pointer-events-none mix-blend-screen"></div>

            {/* Header */}
            <div className="px-5 md:px-7 pt-5 md:pt-7 pb-4">
                <h3 className="text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest flex items-center gap-2">
                    <Table size={14} className="opacity-60" />
                    Quick Reference
                </h3>
                <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                    Click any row to use that value
                </p>
            </div>

            {/* Table */}
            <div className="px-3 md:px-5 pb-3 md:pb-5">
                <div className="rounded-xl overflow-hidden border border-gray-200/50 dark:border-white/5">
                    {/* Table Header */}
                    <div className="grid grid-cols-2 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider bg-gray-50/80 dark:bg-white/[0.03] border-b border-gray-200/50 dark:border-white/5">
                        <div className="px-4 md:px-5 py-3">
                            {fromUnitSymbol || 'From'}
                        </div>
                        <div className="px-4 md:px-5 py-3">
                            {toUnitSymbol || 'To'}
                        </div>
                    </div>

                    {/* Table Rows */}
                    <div className="flex flex-col">
                        {rows.map((row, index) => {
                            const isActive = currentInput === row.input;
                            return (
                                <button
                                    key={row.input}
                                    onClick={() => onSelectValue(row.input)}
                                    className={`relative w-full grid grid-cols-2 text-left transition-all duration-200 group
                                        ${isActive
                                            ? 'bg-gradient-to-r from-blue-50/80 to-transparent dark:from-indigo-500/10 dark:to-transparent'
                                            : 'hover:bg-gray-50 dark:hover:bg-white/[0.03]'
                                        }
                                    `}
                                aria-label={`Convert ${row.input} ${fromUnitSymbol} to ${row.output} ${toUnitSymbol}`}
                            >
                                    <div className={`px-4 md:px-5 py-2.5 md:py-3.5 font-grotesk font-medium text-sm transition-colors ${isActive ? 'text-blue-600 dark:text-indigo-400 font-semibold' : 'text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white'}`}>
                                        {row.input}
                                    </div>
                                    <div className={`px-4 md:px-5 py-2.5 md:py-3.5 font-grotesk font-semibold text-sm flex items-center gap-2 transition-colors ${isActive ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'}`}>
                                        <span className={row.output === 'Error' ? 'text-red-500' : ''}>
                                            {row.output}
                                        </span>
                                        <ArrowUpRight
                                            size={12}
                                            className={`transition-all duration-200 flex-shrink-0 ${isActive ? 'text-blue-500 dark:text-indigo-400 opacity-100' : 'text-gray-400 opacity-0 group-hover:opacity-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5'}`}
                                        />
                                    </div>
                                    
                                    {/* Active state neon border */}
                                    {isActive && (
                                        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-blue-500 dark:bg-indigo-400 shadow-[0_0_10px_rgba(59,130,246,0.5)] dark:shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default QuickReferenceTable;
