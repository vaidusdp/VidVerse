import React, { forwardRef } from 'react';

const Input = forwardRef(({
  label,
  error,
  type = 'text',
  placeholder,
  className = '',
  ...props
}, ref) => {
  return (
    <div className="w-full flex flex-col gap-1.5 font-sans">
      {label && (
        <label className="text-xs font-semibold text-zinc-400 select-none">
          {label}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        placeholder={placeholder}
        className={`w-full bg-brand-surface border rounded-lg px-3.5 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none transition-colors ${
          error ? 'border-red-500 focus:border-red-500' : 'border-brand-border focus:border-brand-accent'
        } ${className}`}
        {...props}
      />
      {error && (
        <span className="text-xs font-medium text-red-500 mt-0.5 animate-in fade-in duration-100">
          {error}
        </span>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
