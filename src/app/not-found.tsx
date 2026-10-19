import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Home, Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 bg-ecell-offwhite">
      <div className="max-w-md w-full bg-white rounded-2xl border border-ecell-border p-8 text-center space-y-6 shadow-xs">
        <div className="w-14 h-14 rounded-2xl bg-ecell-beige/60 border border-ecell-border flex items-center justify-center text-ecell-navy mx-auto">
          <Compass className="w-7 h-7 text-ecell-blue" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-ecell-blue">
            404 Error
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-ecell-navy">
            Page Not Found
          </h1>
          <p className="text-xs sm:text-sm text-ecell-muted leading-relaxed">
            The link you followed may have been updated, moved, or is part of a previous session archive.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-ecell-blue text-white font-bold text-xs shadow-xs hover:bg-ecell-blue-hover transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>
          <Link
            href="/events"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-ecell-offwhite border border-ecell-border text-ecell-navy font-bold text-xs hover:bg-ecell-beige/50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Browse Events</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
