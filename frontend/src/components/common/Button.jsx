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
    primary: 'bg-[#16A34A] hover:bg-[#15803D] text-white shadow-sm hover:shadow focus:ring-[#16A34A]',
    secondary: 'bg-[#FFFFFF] dark:bg-slate-800 hover:bg-[#ECFDF3] dark:hover:bg-slate-700 text-[#12372A] dark:text-slate-100 border border-[#DDE8E1] dark:border-slate-700 hover:border-[#16A34A]/40 shadow-sm focus:ring-[#16A34A]',
    soft: 'bg-[#ECFDF3] dark:bg-emerald-950/40 hover:bg-[#dcfce7] dark:hover:bg-emerald-900/40 text-[#16A34A] dark:text-emerald-400 focus:ring-[#16A34A]',
    outline: 'border border-[#16A34A] text-[#16A34A] dark:text-emerald-400 hover:bg-[#ECFDF3] dark:hover:bg-emerald-950/30 focus:ring-[#16A34A]',
    danger: 'bg-rose-600 hover:bg-rose-500 text-white focus:ring-rose-500',
    ghost: 'text-[#475569] dark:text-slate-300 hover:text-[#12372A] dark:hover:text-white hover:bg-[#ECFDF3] dark:hover:bg-slate-800 focus:ring-[#16A34A]',
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
