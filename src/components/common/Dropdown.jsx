import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Search, ChevronDown } from 'lucide-react';

export function Dropdown({
    label,
    value,
    options,
    onChange,
    placeholder = 'Select...',
    searchable = true,
    className = ''
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const dropdownRef = useRef(null);
    const listboxRef = useRef(null);
    const searchInputRef = useRef(null);

    const filteredOptions = options.filter(opt => {
        if (!search) return true;
        const searchLower = search.toLowerCase();
        return (
            opt.label.toLowerCase().includes(searchLower) ||
            (opt.subLabel && opt.subLabel.toLowerCase().includes(searchLower))
        );
    });

    const selectedOption = options.find(opt => opt.key === value);
    const activeIndex = useRef(-1);

    const closeDropdown = useCallback(() => {
        setIsOpen(false);
        setSearch('');
    }, []);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                closeDropdown();
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [closeDropdown]);

    const handleKeyDown = (e) => {
        if (!isOpen) {
            if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
                e.preventDefault();
                setIsOpen(true);
            }
            return;
        }

        const optionNodes = listboxRef.current?.querySelectorAll('[role="option"]');
        if (!optionNodes || optionNodes.length === 0) return;

        if (e.key === 'Escape') {
            closeDropdown();
            return;
        }

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            activeIndex.current = (activeIndex.current + 1) % optionNodes.length;
            optionNodes[activeIndex.current].focus();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            activeIndex.current = activeIndex.current - 1 < 0 ? optionNodes.length - 1 : activeIndex.current - 1;
            optionNodes[activeIndex.current].focus();
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (activeIndex.current >= 0 && activeIndex.current < filteredOptions.length) {
                onChange(filteredOptions[activeIndex.current].key);
                closeDropdown();
            }
        }
    };

    // Reset active index when dropdown opens or search changes
    useEffect(() => {
        if (isOpen) {
            activeIndex.current = -1;
            if (searchable && searchInputRef.current) {
                searchInputRef.current.focus();
            } else if (listboxRef.current) {
                const optionNodes = listboxRef.current.querySelectorAll('[role="option"]');
                if (optionNodes.length > 0) {
                    activeIndex.current = 0;
                    optionNodes[0].focus();
                }
            }
        }
    }, [isOpen, search, searchable]);

    return (
        <div 
            className={`relative ${className}`} 
            ref={dropdownRef} 
            onKeyDown={handleKeyDown}
        >
            {label && (
                <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2 ml-1">
                    {label}
                </label>
            )}

            <button
                type="button"
                role="combobox"
                aria-expanded={isOpen}
                aria-haspopup="listbox"
                aria-label={label || placeholder}
                onClick={() => setIsOpen(!isOpen)}
                className="group w-full px-4 py-3 rounded-2xl flex items-center justify-between transition-all duration-300 active:scale-[0.98] transition-spring
                   bg-gray-100/50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10
                   backdrop-blur-sm border border-transparent hover:border-gray-200 dark:hover:border-white/10
                   text-gray-900 dark:text-white focus:outline-none focus-glow"
            >
                <span className="flex items-center gap-3 truncate">
                    {selectedOption ? (
                        <>
                            {selectedOption.icon && <span className="text-xl transition-transform duration-300 group-hover:scale-110" aria-hidden="true">{selectedOption.icon}</span>}
                            <span className="font-semibold">{selectedOption.label}</span>
                            {selectedOption.subLabel && (
                                <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                                    {selectedOption.subLabel}
                                </span>
                            )}
                        </>
                    ) : (
                        <span className="text-gray-400">{placeholder}</span>
                    )}
                </span>
                <ChevronDown
                    className={`w-4 h-4 text-gray-400 transition-all duration-300 ${isOpen ? 'rotate-180 text-blue-500 dark:text-indigo-400' : ''}`}
                    aria-hidden="true"
                />
            </button>

            {isOpen && (
                <div 
                    className="absolute z-50 w-full mt-2 p-1 rounded-2xl shadow-2xl overflow-hidden animate-slide-down
                        bg-white/90 dark:bg-[#0f172a]/95 backdrop-blur-xl border border-gray-200/50 dark:border-white/10"
                >
                    {searchable && (
                        <div className="p-2 border-b border-gray-100 dark:border-white/5">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" aria-hidden="true" />
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    role="searchbox"
                                    aria-label="Search options"
                                    placeholder="Search..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full pl-9 pr-3 py-2 bg-transparent rounded-lg text-base font-medium
                             text-gray-900 dark:text-white placeholder-gray-400
                             focus:outline-none focus:bg-gray-50 dark:focus:bg-white/5 transition-colors duration-300"
                                />
                            </div>
                        </div>
                    )}

                    <div 
                        ref={listboxRef}
                        role="listbox"
                        className="overflow-y-auto max-h-64 no-scrollbar p-1"
                    >
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((opt, index) => (
                                <button
                                    key={opt.key}
                                    role="option"
                                    aria-selected={value === opt.key}
                                    tabIndex={-1}
                                    title={opt.tooltip}
                                    onClick={() => {
                                        onChange(opt.key);
                                        closeDropdown();
                                    }}
                                    className={`animate-option-cascade w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 active:scale-[0.98] focus:outline-none focus:bg-blue-50 focus:dark:bg-indigo-500/20
                    ${value === opt.key
                                            ? 'bg-blue-50 dark:bg-indigo-500/20 text-blue-600 dark:text-indigo-300'
                                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5'
                                        }`}
                                    style={{ animationDelay: `${index * 30}ms` }}
                                >
                                    {opt.icon && <span className="text-lg transition-transform duration-200 hover:scale-110" aria-hidden="true">{opt.icon}</span>}
                                    <div className="flex-1 min-w-0">
                                        <div className="font-medium truncate">
                                            {opt.label}
                                        </div>
                                        {opt.subLabel && (
                                            <div className={`text-xs truncate transition-colors duration-200 ${value === opt.key ? 'text-blue-400 dark:text-indigo-300' : 'text-gray-400'}`}>
                                                {opt.subLabel}
                                            </div>
                                        )}
                                    </div>
                                    {value === opt.key && (
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-indigo-400 animate-check-bounce"></div>
                                    )}
                                </button>
                            ))
                        ) : (
                            <div className="px-4 py-8 text-center text-gray-500 dark:text-gray-400 text-sm">
                                No results found
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Dropdown;
