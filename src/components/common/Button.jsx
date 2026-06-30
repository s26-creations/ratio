import React from 'react';

export function Button({
    children,
    onClick,
    variant = 'primary',
    className = '',
    title,
    'aria-label': ariaLabel,
    disabled = false,
    icon: Icon,
    ...rest
}) {
    const baseStyles = "transition-all duration-300 rounded-lg flex items-center justify-center gap-2 transition-spring";

    const variants = {
        primary: "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-premium hover:shadow-2xl hover:scale-105 active:scale-[0.97]",
        secondary: "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:border-blue-500 dark:hover:border-blue-500 active:scale-[0.97]",
        ghost: "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-400 active:scale-[0.97]",
        icon: "p-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 active:scale-[0.93]"
    };

    return (
        <button
            onClick={onClick}
            className={`${baseStyles} ${variants[variant]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            title={title}
            aria-label={ariaLabel || title}
            disabled={disabled}
            {...rest}
        >
            {Icon && <Icon size={20} className="transition-transform duration-300" />}
            {children}
        </button>
    );
}

export default Button;
