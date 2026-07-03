import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      <h2 className="text-4xl font-extrabold text-brand-accent mb-4 font-display">404</h2>
      <p className="text-zinc-400 mb-6 font-sans">The page you are looking for does not exist.</p>
      <Link to="/" className="text-white hover:text-brand-accent transition-colors underline font-medium">
        Go back home
      </Link>
    </div>
  );
}
