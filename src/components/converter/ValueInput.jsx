import React from 'react';

export function ValueInput({
    id,
    value,
    onChange,
    darkMode
}) {
    return (
        <div className="relative group w-full">
            <input
                id={id}
                type="text"
                inputMode="decimal"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="0"
                className={`w-full bg-transparent text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-grotesk font-bold tracking-tight leading-tight
                   placeholder-gray-300 dark:placeholder-gray-600
                   focus:outline-none transition-colors duration-200
                   overflow-hidden
                   ${darkMode ? 'text-white' : 'text-gray-900'}`}
                style={{ minHeight: '1.2em' }}
            />
            {/* Subtle underline that appears on focus */}
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                <div className="w-full h-full bg-blue-600 dark:bg-indigo-500 transform -translate-x-full group-focus-within:translate-x-0 transition-transform duration-200 ease-out"></div>
            </div>
        </div>
    );
}

export default ValueInput;
