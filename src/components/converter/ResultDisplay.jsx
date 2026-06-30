import React from 'react';
import { Copy, Check } from 'lucide-react';

export function ResultDisplay({
    result,
    unitSymbol,
    onCopy,
    copied,
    id
}) {
    if (!result) return null;

    return (
        <output id={id} aria-live="polite" className="block relative group animate-slide-up">
            <div className="flex items-baseline gap-2 md:gap-4 flex-wrap">
                <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-grotesk font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent tracking-tight break-all leading-tight">
                    {result}
                </span>
                <span className="text-2xl sm:text-3xl lg:text-4xl text-gray-400 dark:text-gray-400 font-medium">
                    {unitSymbol}
                </span>
            </div>

            {/* Floating Actions */}
            <div className="mt-2 md:mt-0 md:absolute md:-right-12 md:top-1/2 md:-translate-y-1/2 flex md:flex-col gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-200 md:translate-x-4 md:group-hover:translate-x-0">
                <button
                    onClick={onCopy}
                    className="p-3 hover:bg-white/50 dark:hover:bg-gray-700/50 rounded-full text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 active:scale-90 backdrop-blur-md shadow-sm"
                    title="Copy result"
                    aria-label="Copy result"
                >
                    {copied ? <Check size={20} className="text-green-500" /> : <Copy size={20} />}
                </button>
            </div>
        </output>
    );
}

export default ResultDisplay;
