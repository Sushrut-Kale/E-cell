import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  linkHref?: string;
  linkLabel?: string;
  align?: 'left' | 'center';
  dark?: boolean;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  description,
  linkHref,
  linkLabel,
  align = 'left',
  dark = false,
  className = '',
}) => {
  const isCentered = align === 'center';

  return (
    <div className={`mb-10 md:mb-14 ${isCentered ? 'text-center max-w-3xl mx-auto' : 'max-w-4xl'} ${className}`}>
      {eyebrow && (
        <div className="flex items-center gap-2 mb-2.5">
          {isCentered && <div className="h-px w-6 bg-ecell-blue" />}
          <span className="text-xs font-bold tracking-widest uppercase text-ecell-blue">
            {eyebrow}
          </span>
          <div className="h-px w-6 bg-ecell-blue" />
        </div>
      )}

      <div className={`flex flex-col md:flex-row md:items-end justify-between gap-4 ${isCentered ? 'items-center' : ''}`}>
        <div>
          <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight ${dark ? 'text-white' : 'text-ecell-navy'}`}>
            {title}
          </h2>
          {description && (
            <p className={`mt-3 text-base sm:text-lg leading-relaxed ${dark ? 'text-ecell-beige/80' : 'text-ecell-muted'}`}>
              {description}
            </p>
          )}
        </div>

        {linkHref && linkLabel && (
          <Link
            href={linkHref}
            className={`inline-flex items-center gap-1.5 text-sm font-semibold shrink-0 group transition-colors ${
              dark ? 'text-ecell-beige hover:text-white' : 'text-ecell-blue hover:text-ecell-blue-hover'
            }`}
          >
            <span>{linkLabel}</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        )}
      </div>
    </div>
  );
};
