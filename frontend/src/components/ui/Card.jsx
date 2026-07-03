import React from 'react';

export default function Card({ children, className = '', hoverable = true, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`bg-brand-card border border-brand-border rounded-xl p-5 overflow-hidden transition-all duration-200 ${
        hoverable ? 'hover:border-zinc-700/60 hover:-translate-y-[1px]' : ''
      } ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </div>
  );
}
