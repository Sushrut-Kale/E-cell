'use client';

import React, { useState } from 'react';
import { TeamDepartment } from '@/types';
import { submitJoinApplication } from '@/lib/data-service';
import { 
  Rocket, 
  Briefcase, 
  Code, 
  Palette, 
  Megaphone, 
  DollarSign, 
  CheckCircle2, 
  Sparkles, 
  Clock, 
  Send 
} from 'lucide-react';

const DOMAINS: { name: TeamDepartment; icon: React.ElementType; description: string }[] = [
  {
    name: 'Technical & Web Development',
    icon: Code,
    description: 'Build full-stack web applications, hackathon portals, registration engines, and digital tools for the club.',
  },
  {
    name: 'Design & Media',
    icon: Palette,
    description: 'Lead visual art direction, poster design, motion graphics, video editing, and brand storytelling.',
  },
  {
    name: 'Corporate Relations & Sponsorship',
    icon: DollarSign,
    description: 'Interface with venture funds, angel networks, startup sponsors, and industry keynote speakers.',
  },
  {
    name: 'Public Relations & Marketing',
    icon: Megaphone,
    description: 'Drive high-velocity campus campaigns, social media marketing, inter-college PR, and content writing.',
  },
  {
    name: 'Operations & Logistics',
    icon: Briefcase,
    description: 'Coordinate auditorium setups, summit schedules, vendor coordination, and seamless offline event execution.',
  },
  {
    name: 'Startups & Incubation Support',
    icon: Rocket,
    description: 'Mentor early student founders, organize mock pitch sessions, and liaise with incubation centers.',
  },
];

export const JoinClient: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    prn: '',
    branch: 'Computer Engineering',
    yearOfStudy: 'Second Year' as 'First Year' | 'Second Year' | 'Third Year' | 'Final Year',
    primaryDomain: 'Technical & Web Development' as TeamDepartment,
    secondaryDomain: 'Design & Media' as TeamDepartment,
    portfolioUrl: '',
    statementOfPurpose: '',
  });

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ success: boolean; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);

    const res = await submitJoinApplication({
      ...formData,
      portfolioUrl: formData.portfolioUrl || undefined,
    });

    setLoading(false);
    setFeedback(res);

    if (res.success) {
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        prn: '',
        branch: 'Computer Engineering',
        yearOfStudy: 'Second Year',
        primaryDomain: 'Technical & Web Development',
        secondaryDomain: 'Design & Media',
        portfolioUrl: '',
        statementOfPurpose: '',
      });
    }
  };

  return (
    <div className="space-y-16">
      
      {/* Why Join Section */}
      <section className="space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold tracking-widest uppercase text-ecell-blue">
            Why Join E-Cell MITAOE
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-ecell-navy">
            Gain Real Ownership Before You Even Graduate
          </h2>
          <p className="text-sm sm:text-base text-ecell-muted leading-relaxed">
            Joining E-Cell is not just adding an extracurricular line to your resume. It is an apprenticeship in leadership, execution, and networking with Pune’s thriving startup founders.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-ecell-border space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-ecell-blue/10 flex items-center justify-center text-ecell-blue">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-ecell-navy">Direct Founder Access</h3>
            <p className="text-xs sm:text-sm text-ecell-muted leading-relaxed">
              Work directly alongside founders, VCs, and angel investors who visit campus as speakers and summit judges.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-ecell-border space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-ecell-beige/70 flex items-center justify-center text-ecell-navy">
              <Rocket className="w-5 h-5 text-ecell-blue" />
            </div>
            <h3 className="font-bold text-base text-ecell-navy">Large Scale Execution</h3>
            <p className="text-xs sm:text-sm text-ecell-muted leading-relaxed">
              Manage real budgets, coordinate multi-day hackathons for 600+ students, and deploy software used by hundreds.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-ecell-border space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-ecell-offwhite flex items-center justify-center text-ecell-navy">
              <CheckCircle2 className="w-5 h-5 text-ecell-blue" />
            </div>
            <h3 className="font-bold text-base text-ecell-navy">Lifelong Network</h3>
            <p className="text-xs sm:text-sm text-ecell-muted leading-relaxed">
              Find future co-founders and collaborators across technical, design, and management disciplines.
            </p>
          </div>
        </div>
      </section>

      {/* Domain Cards */}
      <section className="space-y-6">
        <div className="border-b border-ecell-border pb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-ecell-blue">
            Choose Your Focus
          </span>
          <h2 className="text-2xl font-bold text-ecell-navy mt-1">
            Available Recruitment Domains
          </h2>
          <p className="text-sm text-ecell-muted mt-1">
            Students from all departments and years are encouraged to apply based on their strengths and interests.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DOMAINS.map((domain) => {
            const Icon = domain.icon;
            return (
              <div
                key={domain.name}
                className="p-6 rounded-2xl bg-white border border-ecell-border hover:border-ecell-blue/40 transition-colors space-y-3"
              >
                <div className="w-10 h-10 rounded-lg bg-ecell-offwhite border border-ecell-border flex items-center justify-center text-ecell-navy">
                  <Icon className="w-5 h-5 text-ecell-blue" />
                </div>
                <h3 className="font-bold text-base text-ecell-navy">{domain.name}</h3>
                <p className="text-xs sm:text-sm text-ecell-muted leading-relaxed">
                  {domain.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Recruitment Process Timeline */}
      <section className="bg-ecell-beige/30 rounded-2xl border border-ecell-border p-6 sm:p-10 space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-ecell-blue">
            Selection Journey
          </span>
          <h2 className="text-2xl font-bold text-ecell-navy mt-1">
            How Committee Recruitment Works
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-5 rounded-xl border border-ecell-border">
            <span className="text-xs font-mono font-bold text-ecell-blue block">Step 01</span>
            <h4 className="font-bold text-sm text-ecell-navy mt-1">Online Application</h4>
            <p className="text-xs text-ecell-muted mt-1 leading-relaxed">
              Submit your branch details, domain interests, and brief statement of purpose below.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-ecell-border">
            <span className="text-xs font-mono font-bold text-ecell-blue block">Step 02</span>
            <h4 className="font-bold text-sm text-ecell-navy mt-1">Domain Task / Portfolio</h4>
            <p className="text-xs text-ecell-muted mt-1 leading-relaxed">
              A light, practical task testing your domain aptitude (coding, design mock, or pitch draft).
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-ecell-border">
            <span className="text-xs font-mono font-bold text-ecell-blue block">Step 03</span>
            <h4 className="font-bold text-sm text-ecell-navy mt-1">Personal Interview</h4>
            <p className="text-xs text-ecell-muted mt-1 leading-relaxed">
              Conversational interview with current domain leads to assess passion, commitment, and alignment.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-ecell-border">
            <span className="text-xs font-mono font-bold text-ecell-blue block">Step 04</span>
            <h4 className="font-bold text-sm text-ecell-navy mt-1">Onboarding & Induction</h4>
            <p className="text-xs text-ecell-muted mt-1 leading-relaxed">
              Welcome into the secretariat, orientation on internal club tools, and assignment to upcoming projects.
            </p>
          </div>
        </div>
      </section>

      {/* Recruitment Application Form */}
      <section className="bg-white rounded-2xl border border-ecell-border p-6 sm:p-10 shadow-xs max-w-4xl mx-auto" id="application-form">
        <div className="border-b border-ecell-border pb-6 mb-6">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-ecell-blue" />
            <span className="text-xs font-bold uppercase tracking-wider text-ecell-blue">
              Recruitment Intake Form
            </span>
          </div>
          <h2 className="text-2xl font-bold text-ecell-navy">
            Submit Your Application for E-Cell MITAOE
          </h2>
          <p className="text-sm text-ecell-muted mt-1">
            Please fill out all fields accurately with your verified MITAOE academic details.
          </p>
        </div>

        {feedback && (
          <div
            className={`p-4 rounded-xl mb-6 text-sm flex items-start gap-3 ${
              feedback.success
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'bg-rose-50 text-rose-800 border border-rose-200'
            }`}
          >
            <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">{feedback.success ? 'Application Logged' : 'Submission Error'}</p>
              <p className="mt-0.5">{feedback.message}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="fullName" className="block text-xs font-bold text-ecell-navy uppercase tracking-wider mb-2">
                Full Name *
              </label>
              <input
                id="fullName"
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="e.g. Atharva Kulkarni"
                className="w-full px-4 py-2.5 rounded-xl border border-ecell-border bg-ecell-offwhite text-sm focus:bg-white focus:border-ecell-blue focus:ring-1 focus:ring-ecell-blue"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-bold text-ecell-navy uppercase tracking-wider mb-2">
                College / Personal Email *
              </label>
              <input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="student@mitaoe.ac.in"
                className="w-full px-4 py-2.5 rounded-xl border border-ecell-border bg-ecell-offwhite text-sm focus:bg-white focus:border-ecell-blue focus:ring-1 focus:ring-ecell-blue"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label htmlFor="phone" className="block text-xs font-bold text-ecell-navy uppercase tracking-wider mb-2">
                WhatsApp / Phone *
              </label>
              <input
                id="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 98765 43210"
                className="w-full px-4 py-2.5 rounded-xl border border-ecell-border bg-ecell-offwhite text-sm focus:bg-white focus:border-ecell-blue focus:ring-1 focus:ring-ecell-blue"
              />
            </div>

            <div>
              <label htmlFor="prn" className="block text-xs font-bold text-ecell-navy uppercase tracking-wider mb-2">
                MITAOE PRN Number *
              </label>
              <input
                id="prn"
                type="text"
                required
                value={formData.prn}
                onChange={(e) => setFormData({ ...formData, prn: e.target.value })}
                placeholder="e.g. 202201040050"
                className="w-full px-4 py-2.5 rounded-xl border border-ecell-border bg-ecell-offwhite text-sm focus:bg-white focus:border-ecell-blue focus:ring-1 focus:ring-ecell-blue"
              />
            </div>

            <div>
              <label htmlFor="yearOfStudy" className="block text-xs font-bold text-ecell-navy uppercase tracking-wider mb-2">
                Year of Study *
              </label>
              <select
                id="yearOfStudy"
                value={formData.yearOfStudy}
                onChange={(e) => setFormData({ ...formData, yearOfStudy: e.target.value as 'First Year' | 'Second Year' | 'Third Year' | 'Final Year' })}
                className="w-full px-4 py-2.5 rounded-xl border border-ecell-border bg-ecell-offwhite text-sm focus:bg-white focus:border-ecell-blue focus:ring-1 focus:ring-ecell-blue"
              >
                <option value="First Year">First Year (FE)</option>
                <option value="Second Year">Second Year (SE)</option>
                <option value="Third Year">Third Year (TE)</option>
                <option value="Final Year">Final Year (BE)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="branch" className="block text-xs font-bold text-ecell-navy uppercase tracking-wider mb-2">
                Engineering Branch / Department *
              </label>
              <select
                id="branch"
                value={formData.branch}
                onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-ecell-border bg-ecell-offwhite text-sm focus:bg-white focus:border-ecell-blue focus:ring-1 focus:ring-ecell-blue"
              >
                <option value="Computer Engineering">Computer Engineering</option>
                <option value="Information Technology">Information Technology</option>
                <option value="Electronics & Telecommunication">Electronics & Telecommunication</option>
                <option value="Mechanical Engineering">Mechanical Engineering</option>
                <option value="Civil Engineering">Civil Engineering</option>
                <option value="Chemical Engineering">Chemical Engineering</option>
                <option value="Design (B.Des)">School of Design (B.Des)</option>
              </select>
            </div>

            <div>
              <label htmlFor="portfolioUrl" className="block text-xs font-bold text-ecell-navy uppercase tracking-wider mb-2">
                Portfolio / GitHub / LinkedIn (Optional)
              </label>
              <input
                id="portfolioUrl"
                type="url"
                value={formData.portfolioUrl}
                onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                placeholder="https://github.com/yourhandle or portfolio link"
                className="w-full px-4 py-2.5 rounded-xl border border-ecell-border bg-ecell-offwhite text-sm focus:bg-white focus:border-ecell-blue focus:ring-1 focus:ring-ecell-blue"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="primaryDomain" className="block text-xs font-bold text-ecell-navy uppercase tracking-wider mb-2">
                Primary Domain Choice *
              </label>
              <select
                id="primaryDomain"
                value={formData.primaryDomain}
                onChange={(e) => setFormData({ ...formData, primaryDomain: e.target.value as TeamDepartment })}
                className="w-full px-4 py-2.5 rounded-xl border border-ecell-border bg-ecell-offwhite text-sm focus:bg-white focus:border-ecell-blue focus:ring-1 focus:ring-ecell-blue"
              >
                {DOMAINS.map(d => (
                  <option key={d.name} value={d.name}>{d.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="secondaryDomain" className="block text-xs font-bold text-ecell-navy uppercase tracking-wider mb-2">
                Secondary Domain Choice *
              </label>
              <select
                id="secondaryDomain"
                value={formData.secondaryDomain}
                onChange={(e) => setFormData({ ...formData, secondaryDomain: e.target.value as TeamDepartment })}
                className="w-full px-4 py-2.5 rounded-xl border border-ecell-border bg-ecell-offwhite text-sm focus:bg-white focus:border-ecell-blue focus:ring-1 focus:ring-ecell-blue"
              >
                {DOMAINS.map(d => (
                  <option key={d.name} value={d.name}>{d.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="statementOfPurpose" className="block text-xs font-bold text-ecell-navy uppercase tracking-wider mb-2">
              Why do you want to join E-Cell MITAOE? *
            </label>
            <textarea
              id="statementOfPurpose"
              rows={4}
              required
              value={formData.statementOfPurpose}
              onChange={(e) => setFormData({ ...formData, statementOfPurpose: e.target.value })}
              placeholder="Tell us what excites you about startups, what skills you bring, or what project you want to build with us..."
              className="w-full px-4 py-2.5 rounded-xl border border-ecell-border bg-ecell-offwhite text-sm focus:bg-white focus:border-ecell-blue focus:ring-1 focus:ring-ecell-blue"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-ecell-blue text-white font-bold text-sm shadow-xs hover:bg-ecell-blue-hover active:scale-[0.98] transition-all disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{loading ? 'Submitting Application...' : 'Submit Application'}</span>
            </button>
          </div>
        </form>
      </section>

    </div>
  );
};
