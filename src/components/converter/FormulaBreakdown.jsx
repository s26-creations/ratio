import React, { useMemo } from 'react';
import { Equal, ArrowRight, Sigma, Thermometer, Activity } from 'lucide-react';
import Converter from '../../engine/core/converter.js';

const typeConfig = {
    linear: {
        icon: Sigma,
        label: 'Linear',
        color: 'text-blue-600 dark:text-blue-400',
        bg: 'bg-blue-50 dark:bg-blue-900/20',
        border: 'border-blue-200 dark:border-blue-800/40'
    },
    affine: {
        icon: Thermometer,
        label: 'Affine',
        color: 'text-amber-600 dark:text-amber-400',
        bg: 'bg-amber-50 dark:bg-amber-900/20',
        border: 'border-amber-200 dark:border-amber-800/40'
    },
    logarithmic: {
        icon: Activity,
        label: 'Logarithmic',
        color: 'text-purple-600 dark:text-purple-400',
        bg: 'bg-purple-50 dark:bg-purple-900/20',
        border: 'border-purple-200 dark:border-purple-800/40'
    },
    identity: {
        icon: Equal,
        label: 'Identity',
        color: 'text-gray-500 dark:text-gray-400',
        bg: 'bg-gray-50 dark:bg-gray-800/30',
        border: 'border-gray-200 dark:border-gray-700/40'
    }
};

export function FormulaBreakdown({
    category,
    fromUnit,
    toUnit,
    inputValue,
    result,
    fromUnitSymbol,
    toUnitSymbol
}) {
    const info = useMemo(() => {
        return Converter.getConversionInfo(fromUnit, toUnit, category);
    }, [fromUnit, toUnit, category]);

    if (!info) return null;

    const config = typeConfig[info.type] || typeConfig.linear;
    const TypeIcon = config.icon;

    // Determine if we have a live conversion to show in the visual pipeline
    const hasLiveValues = inputValue && result && inputValue !== '0' && result !== 'Error';

    return (
        <section className="relative overflow-hidden glass-panel rounded-3xl p-6 md:p-8 animate-section-enter border border-gray-200/50 dark:border-white/[0.05] shadow-sm hover:shadow-md transition-shadow duration-300" aria-label="Conversion formula">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-blue-500/10 dark:bg-indigo-500/10 rounded-full blur-3xl pointer-events-none mix-blend-screen"></div>
            
            {/* Header row: Title + Type badge */}
            <div className="relative flex items-center justify-between mb-6">
                <h3 className="text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest flex items-center gap-2">
                    <Sigma size={14} className="opacity-60" />
                    Formula
                </h3>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider ${config.color} ${config.bg} border ${config.border}`}>
                    <TypeIcon size={12} />
                    {config.label}
                </span>
            </div>

            {/* Core formula display */}
            <div className="relative mb-8">
                <p className="font-grotesk text-2xl md:text-3xl font-bold text-gray-900 dark:text-white tracking-tight leading-tight">
                    {info.formulaText}
                </p>
                <p className="mt-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                    {info.stepsText}
                </p>
            </div>

            {/* Visual pipeline: [input] → operation → [output] */}
            {hasLiveValues && (
                <div className="relative flex items-center gap-3 overflow-x-auto no-scrollbar py-2 animate-slide-up">
                    {/* Input pill */}
                    <div className="flex-shrink-0 flex items-baseline gap-1.5 px-5 py-3.5 rounded-2xl bg-gray-50/80 dark:bg-black/20 border border-gray-200/80 dark:border-white/10 shadow-inner backdrop-blur-md">
                        <span className="font-grotesk font-bold text-gray-900 dark:text-white text-lg md:text-xl whitespace-nowrap">
                            {inputValue.length > 12 ? inputValue.slice(0, 12) + '…' : inputValue}
                        </span>
                        <span className="text-sm text-gray-400 dark:text-gray-500 font-medium">
                            {fromUnitSymbol}
                        </span>
                    </div>

                    {/* Operation Badge */}
                    <div className="flex-shrink-0 flex items-center">
                        {info.type === 'linear' && info.factorDisplay ? (
                            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-blue-50/50 dark:bg-indigo-500/10 border border-blue-100/50 dark:border-indigo-500/20 shadow-sm">
                                <span className="text-[11px] md:text-xs font-mono font-medium text-blue-600 dark:text-indigo-400 whitespace-nowrap">
                                    × {info.factorDisplay.length > 10 ? info.factorDisplay.slice(0, 10) + '…' : info.factorDisplay}
                                </span>
                                <ArrowRight size={14} className="text-blue-400 dark:text-indigo-400" />
                            </div>
                        ) : (
                            <div className="flex items-center justify-center w-8">
                                <ArrowRight size={16} className="text-gray-400 dark:text-gray-500" />
                            </div>
                        )}
                    </div>

                    {/* Output pill - Glowing */}
                    <div className="relative flex-shrink-0 flex items-baseline gap-1.5 px-5 py-3.5 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-indigo-500/10 dark:to-purple-500/10 border border-blue-200/50 dark:border-indigo-400/30 shadow-[0_0_15px_rgba(99,102,241,0.05)] dark:shadow-[0_0_20px_rgba(99,102,241,0.15)] backdrop-blur-md group">
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400/0 via-white/40 to-blue-400/0 dark:from-indigo-400/0 dark:via-white/5 dark:to-indigo-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                        <span className="font-grotesk font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-indigo-300 dark:to-purple-300 bg-clip-text text-transparent text-lg md:text-xl whitespace-nowrap drop-shadow-sm">
                            {result.length > 12 ? result.slice(0, 12) + '…' : result}
                        </span>
                        <span className="text-sm text-blue-500 dark:text-indigo-300/70 font-medium">
                            {toUnitSymbol}
                        </span>
                    </div>
                </div>
            )}
        </section>
    );
}

export default FormulaBreakdown;
