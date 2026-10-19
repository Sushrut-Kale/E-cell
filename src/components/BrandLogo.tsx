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
  const isFooter = variant === 'footer';
  // Use supplied official logo asset (dark bg for footer, light bg for header)
  const effectiveLogo = logoSrc || (isFooter ? '/images/logo-dark-bg.png' : '/images/logo-light-bg.png');

  return (
    <Link 
      href="/" 
      className={`group flex items-center gap-3 transition-opacity duration-200 hover:opacity-90 ${className}`}
      aria-label="E-Cell MITAOE Homepage"
    >
      {/* Official Supplied Logo Badge */}
      <div 
        className={`relative h-11 w-11 shrink-0 overflow-hidden rounded-xl border shadow-xs flex items-center justify-center transition-transform group-hover:scale-105 ${
          isFooter 
            ? 'bg-black border-white/20' 
            : 'bg-white border-ecell-border'
        }`}
      >
        <Image
          src={effectiveLogo}
          alt="E-Cell MITAOE Official Logo"
          width={44}
          height={44}
          className="h-10 w-10 object-contain p-0.5"
          priority
        />
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
    </Link>
  );
};
