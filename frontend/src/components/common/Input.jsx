import React from 'react';

export const Input = ({
  label,
  error,
  helperText,
  className = '',
  id,
  type = 'text',
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-[#12372A] dark:text-slate-300 transition-colors">
          {label}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        className={`w-full px-3.5 py-2.5 bg-white dark:bg-slate-800/80 border rounded-lg text-[#12372A] dark:text-slate-100 placeholder-[#94A3B8] dark:placeholder-slate-500 transition-all
          focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent
          ${error ? 'border-rose-500 focus:ring-rose-500' : 'border-[#DDE8E1] hover:border-[#16A34A]/50 dark:border-slate-700 dark:hover:border-slate-600'}
          ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-rose-500 dark:text-rose-400 mt-0.5">{error}</p>}
      {helperText && !error && <p className="text-xs text-[#475569] dark:text-slate-400 mt-0.5">{helperText}</p>}
    </div>
  );
};

export default Input;
