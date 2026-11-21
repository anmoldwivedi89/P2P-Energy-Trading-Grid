import React, { useEffect } from 'react';

export const Modal = ({ isOpen, onClose, title, children, maxWidth = 'max-w-lg' }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 dark:bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div
        className={`w-full ${maxWidth} bg-white dark:bg-slate-900 border border-[#DDE8E1] dark:border-slate-800 rounded-2xl shadow-2xl p-6 relative text-[#12372A] dark:text-slate-100 transition-colors`}
      >
        <div className="flex items-center justify-between pb-4 border-b border-[#DDE8E1] dark:border-slate-800">
          <h3 className="text-lg font-semibold text-[#12372A] dark:text-white">{title}</h3>
          <button
            onClick={onClose}
            className="text-[#475569] hover:text-[#12372A] hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800 p-1 rounded-lg transition"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
