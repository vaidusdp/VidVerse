import React from 'react';

export default function Badge({ children, variant = 'gray', className = '' }) {
  const variants = {
    accent: 'bg-brand-accent/15 text-brand-accent border-brand-accent/30',
    gray: 'bg-zinc-800 text-zinc-300 border-zinc-700/50',
    green: 'bg-green-500/10 text-green-400 border-green-500/20',
    blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  };

  return (
    <span 
      className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] sm:text-xs font-semibold tracking-wide border uppercase select-none ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
