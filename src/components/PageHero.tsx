import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description: string;
  badge?: string;
  breadcrumbs?: { label: string; href?: string }[];
  children?: React.ReactNode;
}

export const PageHero: React.FC<PageHeroProps> = ({
  eyebrow,
  title,
  description,
  badge,
  breadcrumbs,
  children,
}) => {
  return (
    <div className="relative border-b border-ecell-border bg-ecell-beige/25 pt-10 pb-12 sm:pt-14 sm:pb-16 overflow-hidden">
      {/* Subtle decorative geometric lines */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute -top-24 right-0 w-96 h-96 rounded-full bg-ecell-blue/5 blur-3xl" />
        <div className="absolute bottom-0 left-10 w-72 h-72 rounded-full bg-ecell-beige blur-2xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-1.5 text-xs text-ecell-muted mb-4 font-medium" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-ecell-blue transition-colors">Home</Link>
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={idx}>
                <ChevronRight className="w-3 h-3 text-ecell-border" />
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-ecell-blue transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-ecell-navy font-semibold">{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}

        <div className="max-w-3xl">
          {/* Eyebrow or Badge */}
          <div className="flex items-center gap-2 mb-3">
            {eyebrow && (
              <span className="text-xs font-bold tracking-widest uppercase text-ecell-blue">
                {eyebrow}
              </span>
            )}
            {badge && (
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-white text-ecell-navy border border-ecell-border">
                {badge}
              </span>
            )}
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-ecell-navy tracking-tight leading-tight">
            {title}
          </h1>

          {/* Description */}
          <p className="mt-4 text-base sm:text-lg text-ecell-muted leading-relaxed font-normal">
            {description}
          </p>

          {children && (
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {children}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
