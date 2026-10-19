import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calendar, ArrowUpRight, ShieldCheck } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-ecell-offwhite pt-12 pb-16 sm:pt-20 sm:pb-24 border-b border-ecell-border">
      {/* Background subtle editorial grid detail */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] [background-image:linear-gradient(to_right,#142442_1px,transparent_1px),linear-gradient(to_bottom,#142442_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            
            {/* Eyebrow Label */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-ecell-beige/70 border border-ecell-border text-ecell-navy shadow-xs">
              <span className="flex h-2 w-2 rounded-full bg-ecell-blue animate-pulse" />
              <span className="text-xs font-bold tracking-widest uppercase text-ecell-navy">
                ENTREPRENEURSHIP · INNOVATION · COMMUNITY
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-ecell-navy tracking-tight leading-[1.1]">
              Think Beyond the Ordinary.{' '}
              <span className="text-ecell-blue inline-block">
                Build What Comes Next.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-lg sm:text-xl text-ecell-muted leading-relaxed max-w-2xl font-normal">
              A community of curious minds, bold ideas, and aspiring entrepreneurs turning possibilities into reality at MIT Academy of Engineering, Pune.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
              <Link
                href="/events"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-ecell-blue text-white font-bold text-sm sm:text-base shadow-sm hover:bg-ecell-blue-hover active:scale-[0.98] transition-all"
              >
                <span>Discover Our Events</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-ecell-navy font-bold text-sm sm:text-base border border-ecell-border hover:border-ecell-navy/40 hover:bg-ecell-beige/30 transition-all"
              >
                <span>Explore Our Journey</span>
                <ArrowUpRight className="w-4 h-4 text-ecell-blue" />
              </Link>
            </div>

            {/* Footnote / Credibility Strip */}
            <div className="pt-4 border-t border-ecell-border/80 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-ecell-muted">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-ecell-blue" />
                <span className="font-semibold text-ecell-navy">Autonomous Institute</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-ecell-border" />
                <span>Student-Led Initiative</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-ecell-border" />
                <span>Pune Entrepreneurial Circuit</span>
              </div>
            </div>

          </div>

          {/* Right Column: Curated Asymmetric Image Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Primary Main Visual Card */}
              <div className="relative aspect-4/3 rounded-2xl overflow-hidden border border-ecell-border shadow-lg bg-ecell-navy/5">
                <Image
                  src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80"
                  alt="E-Cell MITAOE Flagship Conclave Gathering"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 500px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ecell-navy/90 via-ecell-navy/20 to-transparent" />
                
                {/* Overlay details */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-ecell-blue text-white">
                      Flagship Initiative
                    </span>
                    <span className="text-xs text-ecell-beige/80">
                      MITAOE Campus
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white leading-snug">
                    MITAOE E-Summit: Genesis 2025
                  </h3>
                  <p className="text-xs text-ecell-beige/80 mt-0.5">
                    Connecting young campus builders with venture mentors
                  </p>
                </div>
              </div>

              {/* Floating Bottom Card: Upcoming Event Teaser */}
              <div className="sm:absolute -bottom-8 -left-8 right-8 sm:right-auto sm:w-72 bg-white rounded-xl border border-ecell-border p-4 shadow-xl mt-4 sm:mt-0 flex items-center gap-3.5 group hover:border-ecell-blue transition-colors">
                <div className="w-11 h-11 rounded-lg bg-ecell-beige/70 border border-ecell-border flex items-center justify-center text-ecell-navy shrink-0 group-hover:bg-ecell-blue group-hover:text-white transition-colors">
                  <Calendar className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold tracking-wider uppercase text-ecell-blue">
                      Next Edition
                    </span>
                    <span className="text-[10px] font-mono text-ecell-muted">
                      Apr 2025
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-ecell-navy truncate mt-0.5">
                    Ignite Ideathon & Summit
                  </h4>
                  <p className="text-[11px] text-ecell-muted truncate">
                    Registrations opening soon
                  </p>
                </div>
              </div>

              {/* Decorative accent element */}
              <div className="hidden sm:block absolute -top-4 -right-4 w-20 h-20 rounded-xl bg-ecell-beige/60 border border-ecell-border/80 -z-10 rotate-6" />

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
