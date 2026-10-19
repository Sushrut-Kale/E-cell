import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { PageHero } from '@/components/PageHero';
import { SectionHeading } from '@/components/SectionHeading';
import { MITAOE_OFFICIAL_INFO } from '@/data/seed';
import { 
  Compass, 
  Target, 
  Lightbulb, 
  ShieldCheck, 
  Users, 
  Zap, 
  CheckCircle, 
  Building2, 
  ArrowRight 
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us | E-Cell MITAOE',
  description:
    'Discover the mission, vision, operational structure, and journey of the Entrepreneurship Cell at MIT Academy of Engineering, Pune.',
};

export default function AboutPage() {
  const coreValues = [
    {
      title: 'First-Principles Execution',
      description: 'We encourage students to decompose daunting problems into foundational truths rather than copying trendy templates.',
      icon: Zap,
    },
    {
      title: 'Radical Ownership',
      description: 'Every committee member and student founder takes complete responsibility for their initiative, from whiteboard to delivery.',
      icon: Target,
    },
    {
      title: 'Ecosystem Inclusivity',
      description: 'Entrepreneurship is not confined to computer science; we actively bridge mechanical, civil, chemical, and design engineering disciplines.',
      icon: Users,
    },
    {
      title: 'Ethical Building',
      description: 'We champion sustainable innovation, student intellectual honesty, and lasting community impact over superficial hype.',
      icon: ShieldCheck,
    },
  ];

  const structuralDomains = [
    {
      domain: 'Core Secretariat & Strategy',
      focus: 'Institutional coordination, strategic vision, external alliances, and annual summit governance.',
    },
    {
      domain: 'Technical & Web Architecture',
      focus: 'Developing digital platforms, hackathon portals, event ticketing systems, and community tools.',
    },
    {
      domain: 'Design & Visual Narrative',
      focus: 'Brand identity, creative art direction, video production, and editorial collateral.',
    },
    {
      domain: 'Corporate Relations & Sponsorship',
      focus: 'Industry outreach, sponsor partnerships, angel investor liaisons, and ecosystem grants.',
    },
    {
      domain: 'Public Relations & Campus Outreach',
      focus: 'Multi-channel marketing, cross-college alliances, student community mobilization, and press releases.',
    },
    {
      domain: 'Startups & Incubation Support',
      focus: 'Pre-incubation guidance, pitch deck clinics, and liaising with regional incubators and EDF.',
    },
  ];

  return (
    <div>
      {/* Editorial Header */}
      <PageHero
        eyebrow="Identity & Purpose"
        title="Building a Ground-Up Culture of Student Venture Creation"
        description="The Entrepreneurship Cell at MIT Academy of Engineering is an independent, student-run organization dedicated to sparking curiosity and accelerating student-led technological ventures."
        breadcrumbs={[{ label: 'About' }]}
        badge="Autonomous Institute Student Body"
      />

      {/* Main Narrative & Origins */}
      <section className="py-16 sm:py-24 bg-white border-b border-ecell-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Narrative Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2">
                <Compass className="w-4 h-4 text-ecell-blue" />
                <span className="text-xs font-bold tracking-widest uppercase text-ecell-blue">
                  The Story & Philosophy
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-ecell-navy tracking-tight leading-tight">
                From Campus Classroom Projects to Viable Real-World Ventures.
              </h2>

              <div className="space-y-4 text-base text-ecell-muted leading-relaxed font-normal">
                <p>
                  Every year, hundreds of innovative ideas and research projects are conceived within the classrooms and labs of MIT Academy of Engineering. However, translating technical curiosity into a sustainable business requires skills rarely taught in traditional engineering syllabi — customer validation, unit economics, regulatory navigation, and persuasive storytelling.
                </p>
                <p>
                  E-Cell MITAOE was organized by visionary student leaders to fill this critical bridge. As an independent student club, we operate with entrepreneurial agility: organizing hands-on ideathons, weekend bootcamps, and high-caliber founder conclaves that expose students to the realities of building from scratch.
                </p>
                <p>
                  Our community serves as an active sandbox where students are free to experiment, fail safely, iterate rapidly, and find like-minded co-founders across various engineering branches.
                </p>
              </div>

              {/* Quote Block */}
              <div className="p-6 rounded-xl bg-ecell-beige/50 border-l-4 border-ecell-blue my-6">
                <p className="text-sm font-semibold text-ecell-navy italic leading-relaxed">
                  &ldquo;We don’t just train students to write business plans. We empower them to talk to real customers, build working prototypes, and take pride in ownership.&rdquo;
                </p>
                <span className="block mt-2 text-xs font-bold uppercase tracking-wider text-ecell-blue">
                  — E-Cell MITAOE Secretariat
                </span>
              </div>
            </div>

            {/* Right Column: Mission and Vision Cards */}
            <div className="lg:col-span-5 space-y-6">
              {/* Mission Card */}
              <div className="p-6 sm:p-8 rounded-2xl bg-ecell-offwhite border border-ecell-border shadow-xs">
                <div className="w-12 h-12 rounded-xl bg-ecell-blue/10 flex items-center justify-center text-ecell-blue mb-4">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-ecell-navy">Our Mission</h3>
                <p className="mt-2 text-sm text-ecell-muted leading-relaxed">
                  To inspire, educate, and empower undergraduate students at MIT Academy of Engineering to develop entrepreneurial mindsets, create socially impactful ventures, and contribute meaningfully to the national startup ecosystem.
                </p>
              </div>

              {/* Vision Card */}
              <div className="p-6 sm:p-8 rounded-2xl bg-ecell-navy text-white shadow-md">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-ecell-beige mb-4">
                  <Lightbulb className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Our Vision</h3>
                <p className="mt-2 text-sm text-ecell-beige/85 leading-relaxed">
                  To position MITAOE as one of Maharashtra’s premier collegiate hubs for student entrepreneurship, celebrated for cultivating resilient founders, technical patents, and job-creating enterprises.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16 sm:py-24 bg-ecell-offwhite border-b border-ecell-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Operating Principles"
            title="The Values That Guide Our Culture"
            description="Our ethos shapes everything from how we curate speaker panels to how we evaluate student pitch decks."
            align="center"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-xl border border-ecell-border hover:border-ecell-blue/40 hover:shadow-xs transition-all duration-200"
                >
                  <div className="w-10 h-10 rounded-lg bg-ecell-beige/70 border border-ecell-border flex items-center justify-center text-ecell-navy mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-ecell-navy">{val.title}</h3>
                  <p className="mt-2 text-xs sm:text-sm text-ecell-muted leading-relaxed">
                    {val.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Institutional Relationship & Autonomy (Carefully Preserved) */}
      <section className="py-16 sm:py-24 bg-white border-b border-ecell-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-ecell-border bg-ecell-beige/30 p-8 sm:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ecell-blue">
                  <Building2 className="w-4 h-4" />
                  <span>Institutional Context & Alignment</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-ecell-navy">
                  An Independent Student Body with Campus-Wide Synergy
                </h3>
                <p className="text-sm sm:text-base text-ecell-muted leading-relaxed">
                  E-Cell MITAOE is an independent student club created by and for the student community of 
                  <strong> {MITAOE_OFFICIAL_INFO.institutionName}</strong>. 
                  While we collaborate constructively with faculty advisors, department heads, and regional incubation networks, we maintain a dedicated student-led character to ensure genuine peer-to-peer inspiration and swift program execution.
                </p>
                <div className="pt-2 flex flex-wrap gap-x-6 gap-y-2 text-xs text-ecell-navy font-medium">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-ecell-blue" />
                    Student Executive Leadership
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-ecell-blue" />
                    Autonomous Decision Making
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-ecell-blue" />
                    Inter-Department Representation
                  </span>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col justify-center gap-3">
                <div className="p-4 rounded-xl bg-white border border-ecell-border text-center">
                  <span className="text-xs text-ecell-muted font-medium block">Parent Institute</span>
                  <span className="text-sm font-bold text-ecell-navy block mt-0.5">
                    MIT Academy of Engineering
                  </span>
                  <span className="text-[11px] text-ecell-muted block mt-0.5">
                    Alandi (D), Pune, Maharashtra
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-white border border-ecell-border text-center">
                  <span className="text-xs text-ecell-muted font-medium block">Academic Body Status</span>
                  <span className="text-sm font-bold text-ecell-navy block mt-0.5">
                    Autonomous Institute
                  </span>
                  <span className="text-[11px] text-ecell-blue font-semibold block mt-0.5">
                    Affiliated to SPPU
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Committee Structure Overview */}
      <section className="py-16 sm:py-24 bg-ecell-offwhite border-b border-ecell-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Organization"
            title="How Our Committee Is Structured"
            description="Our operations are distributed across specialized student domains, allowing members to develop professional skills in management, development, and marketing."
            linkHref="/team"
            linkLabel="Meet the Current Team"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {structuralDomains.map((domain, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-xl border border-ecell-border hover:border-ecell-blue/40 transition-colors"
              >
                <div className="text-xs font-mono font-bold text-ecell-blue uppercase tracking-wider mb-2">
                  Domain 0{idx + 1}
                </div>
                <h3 className="text-base font-bold text-ecell-navy">
                  {domain.domain}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-ecell-muted leading-relaxed">
                  {domain.focus}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-ecell-navy">
            Want to Be Part of the Next Chapter?
          </h2>
          <p className="text-sm sm:text-base text-ecell-muted max-w-xl mx-auto">
            Whether you want to join our organizing committee or pitch your startup idea at our upcoming summit, we want to hear from you.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/join"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-ecell-blue text-white font-semibold text-sm hover:bg-ecell-blue-hover transition-colors shadow-xs"
            >
              <span>Recruitment Information</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-ecell-beige/50 text-ecell-navy font-semibold text-sm border border-ecell-border hover:bg-ecell-beige transition-colors"
            >
              <span>Get in Touch</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
