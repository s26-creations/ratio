import React, { useMemo } from 'react';
import { ArrowRight, Sigma, Thermometer, Activity, Equal } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';
import Converter from '../../engine/core/converter.js';

const typeConfig = {
    linear: {
        icon: Sigma,
        label: 'Linear',
        accent: 'text-indigo-600 dark:text-indigo-400',
        dotColor: 'bg-indigo-500',
    },
    affine: {
        icon: Thermometer,
        label: 'Affine',
        accent: 'text-amber-600 dark:text-amber-400',
        dotColor: 'bg-amber-500',
    },
    logarithmic: {
        icon: Activity,
        label: 'Logarithmic',
        accent: 'text-purple-600 dark:text-purple-400',
        dotColor: 'bg-purple-500',
    },
    identity: {
        icon: Equal,
        label: 'Identity',
        accent: 'text-gray-500 dark:text-gray-400',
        dotColor: 'bg-gray-400',
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
    const hasLiveValues = inputValue && result && inputValue !== '0' && result !== 'Error';

    return (
        <section className="relative animate-section-enter" aria-label="Conversion formula">
            {/* Section header */}
            <div className="flex items-center gap-3 mb-6">
                <div className={`w-1.5 h-1.5 rounded-full ${config.dotColor}`}></div>
                <h3 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-[0.15em]">
                    How it works
                </h3>
                <span className={`inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider ${config.accent}`}>
                    <TypeIcon size={10} />
                    {config.label}
                </span>
            </div>

            {/* Title */}
            <h2 className="font-grotesk text-3xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight leading-[1.1] mb-6">
                The Formula
            </h2>

            {/* Main formula — rendered with KaTeX */}
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 md:p-8 mb-6 border border-gray-100 dark:border-gray-700 shadow-sm overflow-x-auto no-scrollbar">
                <div className="text-xl md:text-2xl lg:text-3xl text-gray-800 dark:text-gray-100 min-w-max flex justify-center katex-wrapper">
                    <BlockMath math={info.latexFormula || info.formulaText} />
                </div>
            </div>

            <p className="text-base md:text-lg text-gray-500 dark:text-gray-400 leading-relaxed max-w-xl mb-2">
                {info.stepsText}
            </p>

            {/* SEO-rich explanatory copy */}
            <p className="text-sm text-gray-400 dark:text-gray-500 leading-relaxed max-w-xl">
                This conversion uses a {info.type} transformation. Ratio computes every result with arbitrary-precision
                decimal arithmetic, eliminating the floating-point rounding errors that plague most converters — so you can trust
                every digit.
            </p>

            {/* Live conversion pipeline */}
            {hasLiveValues && (
                <div className="mt-8 flex items-center gap-4 overflow-x-auto no-scrollbar animate-slide-up">
                    {/* Input */}
                    <div className="flex-shrink-0 flex items-baseline gap-1.5">
                        <span className="font-grotesk text-2xl md:text-3xl font-bold text-gray-900 dark:text-white whitespace-nowrap">
                            {inputValue.length > 12 ? inputValue.slice(0, 12) + '…' : inputValue}
                        </span>
                        <span className="text-sm text-gray-400 dark:text-gray-500 font-medium">
                            {fromUnitSymbol}
                        </span>
                    </div>

                    {/* Operator */}
                    <div className="flex-shrink-0 flex items-center gap-2">
                        {info.type === 'linear' && info.factorDisplay ? (
                            <span className="text-xs font-mono font-medium text-gray-400 dark:text-gray-500 whitespace-nowrap">
                                × {info.factorDisplay.length > 10 ? info.factorDisplay.slice(0, 10) + '…' : info.factorDisplay}
                            </span>
                        ) : null}
                        <ArrowRight size={16} className="text-gray-300 dark:text-gray-600" />
                    </div>

                    {/* Output */}
                    <div className="flex-shrink-0 flex items-baseline gap-1.5">
                        <span className="font-grotesk text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent whitespace-nowrap">
                            {result.length > 12 ? result.slice(0, 12) + '…' : result}
                        </span>
                        <span className="text-sm text-indigo-500/70 dark:text-indigo-400/60 font-medium">
                            {toUnitSymbol}
                        </span>
                    </div>
                </div>
            )}
        </section>
    );
}

export default FormulaBreakdown;
