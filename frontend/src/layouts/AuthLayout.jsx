import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Play } from 'lucide-react';

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-brand-bg text-white flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 font-sans">
      {/* Brand logo header */}
      <div className="flex items-center gap-2 mb-8 select-none">
        <div className="bg-brand-accent p-2.5 rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(255,61,61,0.2)]">
          <Play size={20} fill="currentColor" className="text-white" />
        </div>
        <span className="text-2xl font-extrabold tracking-tight font-display text-white">
          Vid<span className="text-brand-accent">Verse</span>
        </span>
      </div>

      {/* Auth Card container */}
      <div className="w-full max-w-md bg-brand-surface border border-brand-border rounded-xl p-6 sm:p-8 shadow-2xl">
        <Outlet />
      </div>

      {/* Minimal Footer */}
      <p className="text-xs text-zinc-400 mt-8 font-medium">
        &copy; {new Date().getFullYear()} VidVerse. All rights reserved.
      </p>
    </div>
  );
}
