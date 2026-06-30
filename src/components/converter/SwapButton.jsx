import React, { useState, useCallback } from 'react';
import { ArrowUpDown } from 'lucide-react';

export function SwapButton({ onClick }) {
    const [isRotating, setIsRotating] = useState(false);
    const [rotationCount, setRotationCount] = useState(0);

    const handleClick = useCallback(() => {
        setIsRotating(true);
        setRotationCount(prev => prev + 1);
        onClick();
        // Reset after animation completes
        setTimeout(() => setIsRotating(false), 500);
    }, [onClick]);

    return (
        <div className="relative z-10 group">
            <div className="absolute inset-0 bg-blue-500 dark:bg-indigo-500 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
            <button
                onClick={handleClick}
                className="relative p-4 rounded-full transition-all duration-300
                   bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl
                   border border-gray-200 dark:border-gray-700
                   text-gray-600 dark:text-gray-300
                   hover:text-blue-600 dark:hover:text-indigo-400
                   hover:bg-blue-50 dark:hover:bg-indigo-500/10
                   hover:border-blue-300 dark:hover:border-indigo-500
                   hover:shadow-[0_0_20px_rgba(99,102,241,0.15)] dark:hover:shadow-[0_0_20px_rgba(99,102,241,0.25)]
                   active:scale-90 shadow-sm hover:shadow-md
                   focus-glow"
                title="Swap units"
                aria-label="Swap units"
            >
                <ArrowUpDown
                    className="w-6 h-6 transition-transform duration-500"
                    style={{
                        transform: `rotate(${rotationCount * 180}deg)`,
                        transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
                    }}
                />
            </button>
        </div>
    );
}

export default SwapButton;
