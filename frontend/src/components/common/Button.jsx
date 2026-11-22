import React from 'react';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  className = '',
  type = 'button',
  onClick,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#F7FAF8] disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]';

  const variants = {
    primary: 'bg-[#FF6F61] hover:bg-[#E85D50] dark:bg-[#FF6F61] dark:hover:bg-[#FF4500] text-white shadow-[4px_4px_10px_rgba(232,93,80,0.35),-3px_-3px_8px_rgba(255,255,255,0.7)] active:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.25)] focus:ring-[#FF6F61] dark:focus:ring-[#FF6F61] dark:shadow-[0_2px_12px_rgba(255,111,97,0.25)]',
    secondary: 'bg-[#EAE6DE] hover:bg-[#F0E8DE] text-[#292824] border border-[#DCD6CB] shadow-[4px_4px_10px_rgba(186,178,166,0.38),-4px_-4px_10px_rgba(255,255,255,0.9)] active:shadow-[inset_2px_2px_5px_rgba(186,178,166,0.4)] dark:bg-[#2A2A2A] dark:hover:bg-[#333333] dark:text-[#F5E8D8] dark:border-[#383430] dark:hover:border-[#FF6F61]/40 dark:shadow-none focus:ring-[#FF6F61]',
    soft: 'bg-[#F0E8DE] hover:bg-[#EAE6DE] text-[#FF6F61] shadow-[2px_2px_6px_rgba(186,178,166,0.3),-2px_-2px_6px_rgba(255,255,255,0.8)] active:shadow-[inset_2px_2px_4px_rgba(186,178,166,0.35)] dark:bg-[#FF6F61]/15 dark:hover:bg-[#FF6F61]/25 dark:text-[#FF6F61] focus:ring-[#FF6F61]',
    outline: 'border border-[#DCD6CB] hover:border-[#FF6F61] text-[#292824] hover:text-[#FF6F61] bg-[#EAE6DE] shadow-[3px_3px_8px_rgba(186,178,166,0.3),-3px_-3px_8px_rgba(255,255,255,0.8)] active:shadow-[inset_2px_2px_4px_rgba(186,178,166,0.35)] dark:border-[#FF6F61] dark:text-[#FF6F61] dark:bg-transparent dark:hover:bg-[#FF6F61]/15 focus:ring-[#FF6F61]',
    danger: 'bg-rose-600 hover:bg-rose-500 text-white focus:ring-rose-500',
    ghost: 'text-[#77736B] dark:text-[#B5A898] hover:text-[#292824] dark:hover:text-[#F5E8D8] hover:bg-[#F0E8DE] dark:hover:bg-[#2A2A2A] focus:ring-[#FF6F61]',
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2 gap-2',
    lg: 'text-base px-6 py-3 gap-2.5',
  };

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
      {...props}
    >
      {isLoading ? (
        <span className="inline-flex items-center gap-2">
          <svg className="animate-spin h-4 w-4 text-current" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
