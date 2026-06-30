import React from 'react';

export function BrandDivider() {
    return (
        <div className="relative w-full py-16 md:py-24 my-8 md:my-16 flex items-center justify-center overflow-hidden animate-slide-up">
            {/* Massive background text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
                <span className="font-grotesk font-black text-[8rem] sm:text-[12rem] md:text-[20rem] tracking-tighter text-gray-900/[0.03] dark:text-white/[0.02]">
                    RATIO
                </span>
            </div>
            
            {/* Foreground content */}
            <div className="relative z-10 flex flex-col items-center gap-4">
                <h2 className="font-grotesk text-xl md:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-500 dark:from-white dark:to-gray-400 bg-clip-text text-transparent text-center px-4 max-w-2xl">
                    The Most Precise (and Beautiful) Unit Converter
                </h2>
                <div className="h-px w-24 bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent mt-2"></div>
            </div>
        </div>
    );
}

export default BrandDivider;
