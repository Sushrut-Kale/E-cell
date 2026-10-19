import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center bg-ecell-offwhite">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-ecell-navy border border-ecell-blue/30 flex items-center justify-center text-white font-bold animate-pulse">
          <span className="text-sm font-mono text-ecell-blue">E/</span>
        </div>
        <p className="text-xs font-mono tracking-wider text-ecell-muted uppercase animate-pulse">
          Loading Content...
        </p>
      </div>
    </div>
  );
}
