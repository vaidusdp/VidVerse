import React from 'react';
import Card from '../ui/Card';

// TODO: Backend Integration
export default function DashboardCard({ title, value, description, icon: Icon }) {
  return (
    <Card hoverable={false} className="flex items-start justify-between gap-4 font-sans bg-brand-surface">
      <div className="flex flex-col gap-1">
        <span className="text-xs font-semibold text-zinc-400 select-none uppercase tracking-wider">
          {title}
        </span>
        <span className="text-2xl font-bold text-white mt-1.5 tabular-nums">
          {value !== undefined ? value : '—'}
        </span>
        {description && (
          <span className="text-xs text-zinc-500 font-medium mt-1">
            {description}
          </span>
        )}
      </div>

      {Icon && (
        <div className="bg-brand-bg p-2.5 rounded-lg border border-brand-border text-zinc-400">
          <Icon size={18} />
        </div>
      )}
    </Card>
  );
}
