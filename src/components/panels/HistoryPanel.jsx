
import React, { useState } from 'react';
import { Trash2, ArrowRight, Clock } from 'lucide-react';
import { formatTimestamp } from '../../engine/utils/formatters.js';
import ConfirmModal from '../common/ConfirmModal.jsx';

export function HistoryPanel({
    history,
    onSelectEntry,
    onClearHistory,
    onDeleteEntry
}) {
    const [isClearModalOpen, setIsClearModalOpen] = useState(false);

    return (
        <div className="w-full max-w-2xl mx-auto animate-slide-up pb-20">
            {/* Header */}
            <div className="glass-panel rounded-2xl p-4 md:p-6 mb-4 md:mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl">
                        <Clock size={20} />
                    </div>
                    <div>
                        <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">History</h2>
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Recent conversions</p>
                    </div>
                </div>
                {history.length > 0 && (
                    <button
                        onClick={() => setIsClearModalOpen(true)}
                        className="flex items-center gap-2 px-3 py-1.5 bg-red-50 hover:bg-red-100 dark:bg-red-900/10 dark:hover:bg-red-900/20 text-red-500 rounded-lg transition-colors text-sm font-medium"
                        title="Clear all"
                        aria-label="Clear history"
                    >
                        <Trash2 size={16} />
                        <span>Clear All</span>
                    </button>
                )}
            </div>

            <div className="space-y-4">
                {history.length === 0 ? (
                    <div className="glass-panel rounded-2xl p-12 text-center text-gray-500 dark:text-gray-400 flex flex-col items-center">
                        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                            <Clock size={32} className="opacity-50" />
                        </div>
                        <p className="font-medium text-lg mb-1">No recent conversions</p>
                        <p className="text-sm opacity-70">Your calculation history will appear here</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {history.map((entry) => (
                            <div
                                key={entry.id}
                                className="group glass-panel rounded-xl p-4 hover:border-blue-200 dark:hover:border-blue-700 transition-all cursor-pointer relative overflow-hidden"
                                onClick={() => onSelectEntry(entry)}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-[10px] uppercase font-bold tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2 py-0.5 rounded-full">
                                        {entry.category}
                                    </span>
                                    <span className="text-[10px] text-gray-500 dark:text-gray-400 font-mono">
                                        {formatTimestamp(entry.timestamp)}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2 md:gap-3 text-gray-900 dark:text-gray-100">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-baseline gap-1">
                                            <span className="font-mono text-base md:text-lg font-medium truncate">{entry.from.value}</span>
                                            <span className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[40px] md:max-w-[50px]">{entry.from.symbol}</span>
                                        </div>
                                    </div>
                                    <ArrowRight size={16} className="text-gray-400 dark:text-gray-500 flex-shrink-0" />
                                    <div className="flex-1 min-w-0 text-right">
                                        <div className="flex items-baseline gap-1 justify-end">
                                            <span className="font-mono text-base md:text-lg font-bold truncate">{entry.to.value}</span>
                                            <span className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[40px] md:max-w-[50px]">{entry.to.symbol}</span>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onDeleteEntry(entry.id);
                                    }}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-100 dark:hover:bg-red-900/40 shadow-sm"
                                    title="Delete entry"
                                    aria-label="Delete entry"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <ConfirmModal
                isOpen={isClearModalOpen}
                onClose={() => setIsClearModalOpen(false)}
                onConfirm={onClearHistory}
                title="Clear History"
                message="Are you sure you want to clear your entire conversion history? This action cannot be undone."
                confirmText="Clear History"
                isDestructive={true}
            />
        </div>
    );
}

export default HistoryPanel;
