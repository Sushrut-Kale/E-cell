'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface BrandLogoProps {
  logoSrc?: string;
  variant?: 'header' | 'footer' | 'contrast';
  showSubtitle?: boolean;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  logoSrc,
  variant = 'header',
  showSubtitle = true,
  className = '',
}) => {
  // If actual logo asset is provided and exists:
  const hasSuppliedLogo = Boolean(logoSrc);

  const isFooter = variant === 'footer';

  return (
    <Link 
      href="/" 
      className={`group flex items-center gap-3 transition-opacity duration-200 hover:opacity-90 ${className}`}
      aria-label="E-Cell MITAOE Homepage"
    >
      {hasSuppliedLogo && logoSrc ? (
        <div className="relative h-10 w-auto flex items-center">
          <Image
            src={logoSrc}
            alt="E-Cell MITAOE Official Logo"
            width={160}
            height={44}
            className="h-10 w-auto object-contain"
            priority
          />
        </div>
      ) : (
        /* Explicit replaceable temporary brand mark */
        <div className="flex items-center gap-2.5">
          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-ecell-navy text-white shadow-xs font-black tracking-tighter text-lg border border-ecell-navy/10 group-hover:bg-ecell-blue transition-colors">
            <span className="font-bold text-ecell-white">E</span>
            <span className="text-ecell-blue group-hover:text-ecell-beige text-xs ml-0.5 font-mono">/</span>
          </div>

          <div className="flex flex-col leading-none">
            <div className="flex items-center gap-1.5">
              <span className={`font-bold tracking-tight text-lg ${isFooter ? 'text-white' : 'text-ecell-navy'}`}>
                E-CELL
              </span>
              <span className="text-[11px] font-semibold tracking-wider text-ecell-blue uppercase px-1.5 py-0.5 rounded bg-ecell-blue/10">
                MITAOE
              </span>
            </div>
            {showSubtitle && (
              <span className={`text-[10px] tracking-widest uppercase mt-0.5 font-medium ${isFooter ? 'text-ecell-beige/80' : 'text-ecell-muted'}`}>
                Entrepreneurship Cell
              </span>
            )}
          </div>
        </div>
      )}
    </Link>
  );
};
