'use client';

import React, { useState } from 'react';
import { submitContactEnquiry } from '@/lib/data-service';
import { MITAOE_OFFICIAL_INFO } from '@/data/seed';
import { 
  MapPin, 
  Mail, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Building2 
} from 'lucide-react';
import { 
  LinkedinIcon, 
  InstagramIcon, 
  TwitterIcon, 
  YoutubeIcon, 
  GithubIcon 
} from './SocialIcons';

export const ContactClient: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    category: 'collaboration' as 'collaboration' | 'speaker' | 'sponsorship' | 'general' | 'student',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ success: boolean; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);

    const res = await submitContactEnquiry(formData);
    setLoading(false);
    setFeedback(res);

    if (res.success) {
      setFormData({
        fullName: '',
        email: '',
        subject: '',
        category: 'collaboration',
        message: '',
      });
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
      
      {/* Left Column: Contact Information & Location */}
      <div className="lg:col-span-5 space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-ecell-blue">
            Direct Coordination
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-ecell-navy mt-1">
            Let’s Build Something Together
          </h2>
          <p className="text-sm text-ecell-muted mt-2 leading-relaxed">
            Whether you represent a startup seeking student tech interns, an angel fund looking to judge our pitch arena, or a student club proposing a joint hackathon — our team responds within 48 hours.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-white border border-ecell-border flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-ecell-blue/10 flex items-center justify-center text-ecell-blue shrink-0 mt-0.5">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-ecell-navy uppercase tracking-wider">Email Communications</span>
              <a
                href={`mailto:${MITAOE_OFFICIAL_INFO.email}`}
                className="text-sm font-semibold text-ecell-blue hover:underline block mt-0.5"
              >
                {MITAOE_OFFICIAL_INFO.email}
              </a>
              <span className="text-[11px] text-ecell-muted mt-0.5 block">Official Student Secretariat Desk</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-ecell-border flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-ecell-beige/70 flex items-center justify-center text-ecell-navy shrink-0 mt-0.5">
              <MapPin className="w-5 h-5 text-ecell-blue" />
            </div>
            <div>
              <span className="text-xs font-bold text-ecell-navy uppercase tracking-wider">Campus Address</span>
              <address className="not-italic text-sm text-ecell-muted mt-0.5 leading-relaxed">
                {MITAOE_OFFICIAL_INFO.address}
              </address>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-ecell-border flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-ecell-offwhite flex items-center justify-center text-ecell-navy shrink-0 mt-0.5">
              <Building2 className="w-5 h-5 text-ecell-blue" />
            </div>
            <div>
              <span className="text-xs font-bold text-ecell-navy uppercase tracking-wider">Affiliation Note</span>
              <p className="text-xs text-ecell-muted mt-0.5 leading-relaxed">
                MIT Academy of Engineering is an autonomous institute affiliated to SPPU. E-Cell MITAOE is an independent student club on campus.
              </p>
            </div>
          </div>
        </div>

        {/* Social Channels */}
        <div className="pt-2">
          <span className="text-xs font-bold uppercase tracking-wider text-ecell-navy block mb-3">
            Official Social Channels
          </span>
          <div className="flex items-center gap-3">
            <a
              href={MITAOE_OFFICIAL_INFO.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-white border border-ecell-border hover:bg-[#0077b5] hover:text-white hover:border-[#0077b5] flex items-center justify-center text-ecell-navy transition-colors shadow-xs"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href={MITAOE_OFFICIAL_INFO.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-white border border-ecell-border hover:bg-gradient-to-tr hover:from-[#f09433] hover:to-[#bc1888] hover:text-white flex items-center justify-center text-ecell-navy transition-colors shadow-xs"
              aria-label="Instagram"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
            <a
              href={MITAOE_OFFICIAL_INFO.socials.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-white border border-ecell-border hover:bg-black hover:text-white hover:border-black flex items-center justify-center text-ecell-navy transition-colors shadow-xs"
              aria-label="Twitter / X"
            >
              <TwitterIcon className="w-4 h-4" />
            </a>
            <a
              href={MITAOE_OFFICIAL_INFO.socials.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-white border border-ecell-border hover:bg-[#ff0000] hover:text-white hover:border-[#ff0000] flex items-center justify-center text-ecell-navy transition-colors shadow-xs"
              aria-label="YouTube"
            >
              <YoutubeIcon className="w-4 h-4" />
            </a>
            <a
              href={MITAOE_OFFICIAL_INFO.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-white border border-ecell-border hover:bg-black hover:text-white hover:border-black flex items-center justify-center text-ecell-navy transition-colors shadow-xs"
              aria-label="GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>

      {/* Right Column: Interactive Enquiry Form */}
      <div className="lg:col-span-7">
        <div className="bg-white rounded-2xl border border-ecell-border p-6 sm:p-10 shadow-xs">
          <div className="border-b border-ecell-border pb-6 mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-ecell-blue">
              Online Dispatch
            </span>
            <h3 className="text-2xl font-bold text-ecell-navy mt-1">
              Send an Enquiry or Proposal
            </h3>
            <p className="text-sm text-ecell-muted mt-1">
              Please choose the relevant category so your message is routed directly to the appropriate domain coordinator.
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
              {feedback.success ? (
                <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              )}
              <div>
                <p className="font-bold">{feedback.success ? 'Message Received' : 'Error'}</p>
                <p className="mt-0.5">{feedback.message}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="contactFullName" className="block text-xs font-bold text-ecell-navy uppercase tracking-wider mb-2">
                  Your Full Name *
                </label>
                <input
                  id="contactFullName"
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-4 py-2.5 rounded-xl border border-ecell-border bg-ecell-offwhite text-sm focus:bg-white focus:border-ecell-blue focus:ring-1 focus:ring-ecell-blue"
                />
              </div>

              <div>
                <label htmlFor="contactEmail" className="block text-xs font-bold text-ecell-navy uppercase tracking-wider mb-2">
                  Email Address *
                </label>
                <input
                  id="contactEmail"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@organization.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-ecell-border bg-ecell-offwhite text-sm focus:bg-white focus:border-ecell-blue focus:ring-1 focus:ring-ecell-blue"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="category" className="block text-xs font-bold text-ecell-navy uppercase tracking-wider mb-2">
                  Category of Enquiry *
                </label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as 'collaboration' | 'speaker' | 'sponsorship' | 'general' | 'student' })}
                  className="w-full px-4 py-2.5 rounded-xl border border-ecell-border bg-ecell-offwhite text-sm focus:bg-white focus:border-ecell-blue focus:ring-1 focus:ring-ecell-blue"
                >
                  <option value="collaboration">Startup / Ecosystem Collaboration</option>
                  <option value="sponsorship">Sponsorship & Summit Partnership</option>
                  <option value="speaker">Keynote Speaker or Mentor Proposition</option>
                  <option value="student">Student Inquiry / Campus Question</option>
                  <option value="general">General Inquiry</option>
                </select>
              </div>

              <div>
                <label htmlFor="subject" className="block text-xs font-bold text-ecell-navy uppercase tracking-wider mb-2">
                  Subject Line *
                </label>
                <input
                  id="subject"
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Brief summary of your inquiry"
                  className="w-full px-4 py-2.5 rounded-xl border border-ecell-border bg-ecell-offwhite text-sm focus:bg-white focus:border-ecell-blue focus:ring-1 focus:ring-ecell-blue"
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-xs font-bold text-ecell-navy uppercase tracking-wider mb-2">
                Detailed Message / Proposal *
              </label>
              <textarea
                id="message"
                rows={5}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Please describe how you wish to collaborate, event dates if applicable, or questions for our coordinators..."
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
                <span>{loading ? 'Transmitting Message...' : 'Send Message'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>

    </div>
  );
};
