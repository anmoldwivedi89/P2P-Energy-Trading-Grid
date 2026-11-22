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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-[#1C1C1C]/80 backdrop-blur-sm animate-fadeIn">
      <div
        className={`w-full ${maxWidth} bg-[#EAE6DE] dark:bg-[#242424] border border-[#DCD6CB] dark:border-[#383430] rounded-2xl shadow-[12px_12px_28px_rgba(186,178,166,0.45),-12px_-12px_28px_rgba(255,255,255,0.95)] dark:shadow-2xl p-6 relative text-[#292824] dark:text-[#F5E8D8] transition-colors`}
      >
        <div className="flex items-center justify-between pb-4 border-b border-[#DCD6CB] dark:border-[#383430]">
          <h3 className="text-lg font-semibold text-[#292824] dark:text-[#F5E8D8]">{title}</h3>
          <button
            onClick={onClose}
            className="text-[#77736B] hover:text-[#292824] hover:bg-[#F0E8DE] dark:text-[#B5A898] dark:hover:text-[#F5E8D8] dark:hover:bg-[#2A2A2A] hover:text-[#FF4500] p-1 rounded-lg transition"
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
