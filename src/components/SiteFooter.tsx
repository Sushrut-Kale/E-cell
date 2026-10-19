import React from 'react';
import Link from 'next/link';
import { BrandLogo } from './BrandLogo';
import { MITAOE_OFFICIAL_INFO } from '@/data/seed';
import { MapPin, Mail, ArrowUpRight } from 'lucide-react';
import { 
  LinkedinIcon, 
  InstagramIcon, 
  TwitterIcon, 
  YoutubeIcon, 
  GithubIcon 
} from './SocialIcons';

export const SiteFooter: React.FC = () => {
  return (
    <footer className="bg-ecell-navy text-white pt-16 pb-12 border-t border-ecell-navy-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-white/10">
          
          {/* Brand & Identity Column */}
          <div className="lg:col-span-5 space-y-4">
            <BrandLogo variant="footer" />
            <p className="text-sm text-ecell-beige/90 leading-relaxed max-w-md pt-2">
              Entrepreneurship Cell, MIT Academy of Engineering is an independent student-led organization cultivating curiosity, startup culture, and technical innovation across the campus.
            </p>
            <div className="pt-2 text-xs text-ecell-beige/70 space-y-1">
              <p className="font-semibold text-white/90">Institutional Association:</p>
              <p>{MITAOE_OFFICIAL_INFO.institutionName}</p>
              <p>{MITAOE_OFFICIAL_INFO.affiliation}</p>
            </div>
            
            {/* Social Channels */}
            <div className="flex items-center gap-3 pt-3">
              <a
                href={MITAOE_OFFICIAL_INFO.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-md bg-white/10 hover:bg-ecell-blue flex items-center justify-center text-white transition-colors"
                aria-label="E-Cell MITAOE on LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={MITAOE_OFFICIAL_INFO.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-md bg-white/10 hover:bg-ecell-blue flex items-center justify-center text-white transition-colors"
                aria-label="E-Cell MITAOE on Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href={MITAOE_OFFICIAL_INFO.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-md bg-white/10 hover:bg-ecell-blue flex items-center justify-center text-white transition-colors"
                aria-label="E-Cell MITAOE on X"
              >
                <TwitterIcon className="w-4 h-4" />
              </a>
              <a
                href={MITAOE_OFFICIAL_INFO.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-md bg-white/10 hover:bg-ecell-blue flex items-center justify-center text-white transition-colors"
                aria-label="E-Cell MITAOE on YouTube"
              >
                <YoutubeIcon className="w-4 h-4" />
              </a>
              <a
                href={MITAOE_OFFICIAL_INFO.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-md bg-white/10 hover:bg-ecell-blue flex items-center justify-center text-white transition-colors"
                aria-label="E-Cell MITAOE GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs font-bold tracking-widest text-ecell-beige uppercase">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-white/80 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/about" className="text-white/80 hover:text-white transition-colors">About the Club</Link>
              </li>
              <li>
                <Link href="/events" className="text-white/80 hover:text-white transition-colors">Events & Initiatives</Link>
              </li>
              <li>
                <Link href="/achievements" className="text-white/80 hover:text-white transition-colors">Achievements & Impact</Link>
              </li>
              <li>
                <Link href="/gallery" className="text-white/80 hover:text-white transition-colors">Photo Archive</Link>
              </li>
              <li>
                <Link href="/team" className="text-white/80 hover:text-white transition-colors">Executive Committee</Link>
              </li>
            </ul>
          </div>

          {/* Opportunities & Community */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs font-bold tracking-widest text-ecell-beige uppercase">Engagement</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/join" className="text-white/80 hover:text-white flex items-center gap-1 transition-colors">
                  <span>Student Recruitment</span>
                  <ArrowUpRight className="w-3 h-3 text-ecell-blue" />
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/80 hover:text-white transition-colors">Startup Collaboration</Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/80 hover:text-white transition-colors">Sponsor or Mentor</Link>
              </li>
              <li>
                <Link href="/events#upcoming" className="text-white/80 hover:text-white transition-colors">Upcoming Conclaves</Link>
              </li>
              <li>
                <Link href="/admin" className="text-white/60 hover:text-white text-xs pt-2 flex items-center gap-1 transition-colors">
                  <span>Committee Access</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Campus Location & Institutional Note */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-bold tracking-widest text-ecell-beige uppercase">Contact & Campus</h3>
            <div className="space-y-3 text-xs text-white/85">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-ecell-blue shrink-0 mt-0.5" />
                <address className="not-italic leading-relaxed text-ecell-beige/90">
                  {MITAOE_OFFICIAL_INFO.address}
                </address>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-ecell-blue shrink-0" />
                <a 
                  href={`mailto:${MITAOE_OFFICIAL_INFO.email}`}
                  className="hover:text-ecell-blue transition-colors text-white font-medium"
                >
                  {MITAOE_OFFICIAL_INFO.email}
                </a>
              </div>
              <p className="text-[11px] text-white/50 pt-2 border-t border-white/10 leading-tight">
                * Note: This is an independent student club website and does not replace the official institutional portal of MITAOE / EDF.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/60 gap-4">
          <p>© 2025 E-Cell MITAOE. All rights reserved.</p>
          <p className="text-ecell-beige/60">
            Crafted for student innovators, founders, and community builders.
          </p>
        </div>
      </div>
    </footer>
  );
};
