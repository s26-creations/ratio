import React, { useEffect, useRef } from 'react';
import { X, AlertTriangle } from 'lucide-react';
import Button from './Button.jsx';

export function ConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    isDestructive = false
}) {
    const modalRef = useRef(null);

    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose();
                return;
            }

            if (e.key === 'Tab') {
                const focusableElements = modalRef.current?.querySelectorAll(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                );
                
                if (!focusableElements || focusableElements.length === 0) return;

                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];

                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        lastElement.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        firstElement.focus();
                        e.preventDefault();
                    }
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        
        // Initial focus on the cancel button to prevent accidental destructive actions
        const cancelBtn = modalRef.current?.querySelector('[data-cancel-btn="true"]');
        if (cancelBtn) cancelBtn.focus();

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop with animated blur */}
            <div 
                className="absolute inset-0 bg-gray-900/40 animate-backdrop"
                onClick={onClose}
                aria-hidden="true"
            />
            
            {/* Modal with bounce entrance */}
            <div 
                ref={modalRef}
                className="relative w-full max-w-sm glass-panel bg-white/90 dark:bg-gray-900/90 rounded-2xl shadow-2xl p-6 animate-modal-bounce"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
            >
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                        {isDestructive && (
                            <div className="p-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl animate-alert-shake">
                                <AlertTriangle size={20} />
                            </div>
                        )}
                        <h2 id="modal-title" className="text-lg font-bold text-gray-900 dark:text-white">
                            {title}
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-lg transition-all duration-200 nav-btn-hover focus-glow"
                        aria-label="Close dialog"
                    >
                        <X size={16} />
                    </button>
                </div>
                
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    {message}
                </p>
                
                <div className="flex items-center justify-end gap-3">
                    <Button 
                        variant="secondary" 
                        onClick={onClose}
                        data-cancel-btn="true"
                        className="px-4 py-2 nav-btn-hover"
                    >
                        {cancelText}
                    </Button>
                    <Button 
                        variant={isDestructive ? 'primary' : 'primary'}
                        className={`px-4 py-2 nav-btn-hover ${isDestructive ? 'bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white shadow-red-500/25' : ''}`}
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                    >
                        {confirmText}
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmModal;
