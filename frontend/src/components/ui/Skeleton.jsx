import React from 'react';

export default function Skeleton({ variant = 'rectangle', className = '', ...props }) {
  const baseStyle = 'bg-zinc-800 animate-pulse';
  
  const variants = {
    circle: 'rounded-full',
    text: 'h-4 rounded',
    rectangle: 'rounded-lg',
  };

  return (
    <div 
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
