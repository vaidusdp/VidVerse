import React from 'react';

export default function Avatar({ src, name = 'U', size = 'md', className = '' }) {
  const getInitials = (n) => {
    return n
      .split(' ')
      .map((part) => part[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  const sizes = {
    xs: 'w-6 h-6 text-[10px]',
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm font-semibold',
    lg: 'w-16 h-16 text-lg font-bold',
    xl: 'w-24 h-24 text-2xl font-extrabold',
  };

  return (
    <div 
      className={`rounded-full shrink-0 flex items-center justify-center border border-brand-border bg-zinc-800 text-zinc-300 overflow-hidden select-none ${sizes[size]} ${className}`}
    >
      {src ? (
        <img 
          src={src} 
          alt={name} 
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      ) : (
        <span>{getInitials(name)}</span>
      )}
    </div>
  );
}
