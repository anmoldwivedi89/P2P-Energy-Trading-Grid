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
        <label htmlFor={inputId} className="text-sm font-medium text-[#292824] dark:text-[#F5E8D8] transition-colors">
          {label}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        className={`w-full px-3.5 py-2.5 bg-[#EAE6DE] dark:bg-[#252525] border rounded-xl text-[#292824] dark:text-[#F5E8D8] placeholder-[#77736B]/60 dark:placeholder-[#B5A898]/50 shadow-[inset_2.5px_2.5px_5px_rgba(186,178,166,0.35),inset_-2.5px_-2.5px_5px_rgba(255,255,255,0.85)] dark:shadow-none transition-all
          focus:outline-none focus:ring-2 focus:ring-[#FF6F61] focus:border-transparent
          ${error ? 'border-rose-500 focus:ring-rose-500' : 'border-[#DCD6CB] hover:border-[#FF6F61]/50 dark:border-[#383430] dark:hover:border-[#FF6F61]/50'}
          ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-rose-500 dark:text-rose-400 mt-0.5">{error}</p>}
      {helperText && !error && <p className="text-xs text-[#77736B] dark:text-[#B5A898] mt-0.5">{helperText}</p>}
    </div>
  );
};

export default Input;
