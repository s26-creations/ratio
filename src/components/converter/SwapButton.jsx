import React from 'react';
import { ArrowUpDown } from 'lucide-react';

export function SwapButton({ onClick }) {
    return (
        <div className="relative z-10 group">
            <div className="absolute inset-0 bg-blue-500 dark:bg-indigo-500 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-200"></div>
            <button
                onClick={onClick}
                className="relative p-4 rounded-full transition-all duration-200
                   bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl
                   border border-gray-200 dark:border-gray-700
                   text-gray-600 dark:text-gray-300
                   hover:text-blue-600 dark:hover:text-indigo-400
                   hover:bg-blue-50 dark:hover:bg-indigo-500/10
                   hover:border-blue-300 dark:hover:border-indigo-500
                   active:scale-90 shadow-sm hover:shadow-md"
                title="Swap units"
                aria-label="Swap units"
            >
                <ArrowUpDown className="w-6 h-6" />
            </button>
        </div>
    );
}

export default SwapButton;
