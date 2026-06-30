import React, { useState } from 'react';

export function ValueInput({
    id,
    value,
    onChange,
    darkMode
}) {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className="relative group w-full">
            <input
                id={id}
                type="text"
                inputMode="decimal"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="0"
                className={`w-full bg-transparent text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-grotesk font-bold tracking-tight leading-tight
                   placeholder-gray-300 dark:placeholder-gray-600
                   focus:outline-none transition-all duration-300
                   overflow-hidden
                   ${darkMode ? 'text-white' : 'text-gray-900'}`}
                style={{ minHeight: '1.2em' }}
            />
            {/* Animated underline with shimmer on focus */}
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                <div
                    className={`w-full h-full rounded-full transform transition-transform duration-500 ease-out
                        ${isFocused ? 'translate-x-0 underline-shimmer-active' : '-translate-x-full bg-blue-600 dark:bg-indigo-500'}`}
                ></div>
            </div>
            {/* Subtle glow beneath input on focus */}
            <div
                className={`absolute -bottom-2 left-1/4 right-1/4 h-4 rounded-full blur-xl transition-opacity duration-500
                    bg-gradient-to-r from-blue-500/20 to-indigo-500/20 dark:from-indigo-500/30 dark:to-purple-500/30
                    ${isFocused ? 'opacity-100' : 'opacity-0'}`}
            ></div>
        </div>
    );
}

export default ValueInput;
