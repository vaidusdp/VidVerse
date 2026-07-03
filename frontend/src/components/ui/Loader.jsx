import React from 'react';

export default function Loader({ size = 'md', className = '' }) {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-6 h-6 border-2',
    lg: 'w-8 h-8 border-3',
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div 
        className={`${sizes[size]} border-zinc-700 border-t-brand-accent rounded-full animate-spin`}
        role="status"
        aria-label="loading"
      />
    </div>
  );
}
