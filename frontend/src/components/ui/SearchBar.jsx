import React from 'react';
import { Search } from 'lucide-react';

export default function SearchBar({
  value = '',
  onChange,
  onSubmit,
  placeholder = 'Search...',
  className = '',
}) {
  return (
    <form onSubmit={onSubmit} className={`relative flex items-center w-full max-w-md ${className}`}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full bg-brand-surface border border-brand-border rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-brand-accent transition-colors"
      />
      <Search size={16} className="absolute left-3.5 text-zinc-500" />
    </form>
  );
}
