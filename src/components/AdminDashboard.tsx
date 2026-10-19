'use client';

import React, { useState } from 'react';
import { 
  EventItem, 
  ContactEnquiry, 
  JoinApplication,
  EventCategory,
  AcademicYear 
} from '@/types';
import { 
  SEED_EVENTS, 
  SEED_ACHIEVEMENTS, 
  SEED_GALLERY_ALBUMS, 
  SEED_TEAM_MEMBERS 
} from '@/data/seed';
import { isSupabaseConfigured } from '@/lib/supabase';
import { 
  ShieldCheck, 
  Lock, 
  Database, 
  Plus, 
  CheckCircle, 
  ExternalLink, 
  LogOut 
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('ecell_admin_auth') === 'true';
    }
    return false;
  });

  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');

  const [activeTab, setActiveTab] = useState<'overview' | 'events' | 'achievements' | 'gallery' | 'team' | 'applications'>('overview');

  // Local state for management
  const [events, setEvents] = useState<EventItem[]>(SEED_EVENTS);
  const achievements = SEED_ACHIEVEMENTS;
  const albums = SEED_GALLERY_ALBUMS;
  const team = SEED_TEAM_MEMBERS;
  
  const [enquiries] = useState<ContactEnquiry[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        return JSON.parse(localStorage.getItem('ecell_demo_enquiries') || '[]');
      } catch {
        return [];
      }
    }
    return [];
  });

  const [applications] = useState<JoinApplication[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        return JSON.parse(localStorage.getItem('ecell_demo_applications') || '[]');
      } catch {
        return [];
      }
    }
    return [];
  });

  // Simple new event form state
  const [showNewEventModal, setShowNewEventModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    tagline: '',
    category: 'Workshop' as EventCategory,
    academicYear: '2024-25' as AcademicYear,
    status: 'upcoming' as 'upcoming' | 'completed' | 'ongoing',
    date: '',
    venue: '',
    shortDescription: '',
    fullDescription: '',
    coverImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === 'ecell-mitaoe-admin-2025' || passcode === 'admin') {
      setIsAuthenticated(true);
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('ecell_admin_auth', 'true');
      }
      setAuthError('');
    } else {
      setAuthError('Invalid committee passcode. (Hint: Use default key "ecell-mitaoe-admin-2025" or check .env.example)');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('ecell_admin_auth');
    }
  };

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    const created: EventItem = {
      id: 'ev-' + Date.now(),
      slug: newEvent.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      ...newEvent,
    };
    setEvents([created, ...events]);
    setShowNewEventModal(false);
    setNewEvent({
      title: '',
      tagline: '',
      category: 'Workshop',
      academicYear: '2024-25',
      status: 'upcoming',
      date: '',
      venue: '',
      shortDescription: '',
      fullDescription: '',
      coverImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto my-16 p-8 bg-white rounded-2xl border border-ecell-border shadow-xs">
        <div className="text-center space-y-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-ecell-blue/10 flex items-center justify-center text-ecell-blue mx-auto">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-ecell-navy">Committee Portal Access</h2>
          <p className="text-xs text-ecell-muted leading-relaxed">
            Enter the authorized administrator passcode to manage event archives, team rosters, and application records.
          </p>
        </div>

        {authError && (
          <div className="p-3 mb-4 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium">
            {authError}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="passcode" className="block text-xs font-bold uppercase tracking-wider text-ecell-navy mb-1.5">
              Admin Passcode
            </label>
            <input
              id="passcode"
              type="password"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              placeholder="Enter passcode..."
              required
              className="w-full px-4 py-2.5 rounded-xl border border-ecell-border bg-ecell-offwhite text-sm focus:bg-white focus:border-ecell-blue focus:ring-1 focus:ring-ecell-blue"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-ecell-blue text-white font-bold text-sm shadow-xs hover:bg-ecell-blue-hover transition-colors"
          >
            Authenticate & Proceed
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-ecell-border text-center text-[11px] text-ecell-muted">
          Development Default: <code className="font-mono bg-ecell-beige px-1.5 py-0.5 rounded text-ecell-navy">ecell-mitaoe-admin-2025</code>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Top Bar with Status and Logout */}
      <div className="bg-white rounded-2xl border border-ecell-border p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-ecell-navy text-white flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5 text-ecell-blue" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-ecell-navy">E-Cell Content Management Portal</h2>
            <div className="flex items-center gap-2 text-xs">
              <span className="flex items-center gap-1 font-semibold text-emerald-600">
                <CheckCircle className="w-3.5 h-3.5" />
                Session Authenticated
              </span>
              <span>•</span>
              <span className={`flex items-center gap-1 font-mono ${isSupabaseConfigured ? 'text-emerald-600 font-bold' : 'text-amber-600'}`}>
                <Database className="w-3 h-3" />
                {isSupabaseConfigured ? 'Supabase Live Connected' : 'Local Demo Layer (No API keys yet)'}
              </span>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-ecell-border text-xs font-semibold text-ecell-muted hover:text-ecell-navy hover:bg-ecell-offwhite transition-colors self-start sm:self-auto"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Exit Admin</span>
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-ecell-border text-xs font-semibold">
        <button
          type="button"
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-xl transition-colors whitespace-nowrap ${
            activeTab === 'overview'
              ? 'bg-ecell-navy text-white'
              : 'bg-white text-ecell-navy border border-ecell-border hover:bg-ecell-beige/50'
          }`}
        >
          Overview & System Status
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('events')}
          className={`px-4 py-2 rounded-xl transition-colors whitespace-nowrap ${
            activeTab === 'events'
              ? 'bg-ecell-navy text-white'
              : 'bg-white text-ecell-navy border border-ecell-border hover:bg-ecell-beige/50'
          }`}
        >
          Events ({events.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('achievements')}
          className={`px-4 py-2 rounded-xl transition-colors whitespace-nowrap ${
            activeTab === 'achievements'
              ? 'bg-ecell-navy text-white'
              : 'bg-white text-ecell-navy border border-ecell-border hover:bg-ecell-beige/50'
          }`}
        >
          Achievements ({achievements.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('gallery')}
          className={`px-4 py-2 rounded-xl transition-colors whitespace-nowrap ${
            activeTab === 'gallery'
              ? 'bg-ecell-navy text-white'
              : 'bg-white text-ecell-navy border border-ecell-border hover:bg-ecell-beige/50'
          }`}
        >
          Gallery Albums ({albums.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('team')}
          className={`px-4 py-2 rounded-xl transition-colors whitespace-nowrap ${
            activeTab === 'team'
              ? 'bg-ecell-navy text-white'
              : 'bg-white text-ecell-navy border border-ecell-border hover:bg-ecell-beige/50'
          }`}
        >
          Team Roster ({team.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('applications')}
          className={`px-4 py-2 rounded-xl transition-colors whitespace-nowrap ${
            activeTab === 'applications'
              ? 'bg-ecell-navy text-white'
              : 'bg-white text-ecell-navy border border-ecell-border hover:bg-ecell-beige/50'
          }`}
        >
          Submissions ({applications.length + enquiries.length})
        </button>
      </div>

      {/* Tab 1: Overview & System Status */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 bg-white rounded-2xl border border-ecell-border">
              <span className="text-xs text-ecell-muted">Registered Events</span>
              <div className="text-3xl font-black text-ecell-navy mt-1">{events.length}</div>
            </div>
            <div className="p-5 bg-white rounded-2xl border border-ecell-border">
              <span className="text-xs text-ecell-muted">Achievements Documented</span>
              <div className="text-3xl font-black text-ecell-navy mt-1">{achievements.length}</div>
            </div>
            <div className="p-5 bg-white rounded-2xl border border-ecell-border">
              <span className="text-xs text-ecell-muted">Gallery Albums</span>
              <div className="text-3xl font-black text-ecell-navy mt-1">{albums.length}</div>
            </div>
            <div className="p-5 bg-white rounded-2xl border border-ecell-border">
              <span className="text-xs text-ecell-muted">Recruitment Applications</span>
              <div className="text-3xl font-black text-ecell-navy mt-1">{applications.length}</div>
            </div>
          </div>

          {/* Database & Cloud Setup Status Box */}
          <div className="p-6 sm:p-8 bg-white rounded-2xl border border-ecell-border space-y-4">
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-ecell-blue" />
              <h3 className="text-lg font-bold text-ecell-navy">Supabase Cloud Integration Guide</h3>
            </div>
            <p className="text-sm text-ecell-muted leading-relaxed">
              The website is designed with a resilient data layer. Currently running in 
              <strong className="text-ecell-navy"> {isSupabaseConfigured ? 'Live Supabase Mode' : 'Local Seed/Demonstration Mode'}</strong>. 
              To activate full cloud persistence, storage bucket uploads, and multi-user committee accounts, follow the documented steps below:
            </p>

            <div className="space-y-3 pt-2">
              <div className="p-3.5 rounded-xl bg-ecell-offwhite border border-ecell-border text-xs space-y-1">
                <span className="font-bold text-ecell-navy block">Step 1: Execute Schema</span>
                <p className="text-ecell-muted">
                  Run the supplied <code className="font-mono bg-ecell-beige px-1 rounded">supabase-schema.sql</code> file in your Supabase SQL Editor.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-ecell-offwhite border border-ecell-border text-xs space-y-1">
                <span className="font-bold text-ecell-navy block">Step 2: Add Keys to .env.local</span>
                <p className="text-ecell-muted">
                  Provide <code className="font-mono bg-ecell-beige px-1 rounded">NEXT_PUBLIC_SUPABASE_URL</code> and <code className="font-mono bg-ecell-beige px-1 rounded">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> as documented in <code className="font-mono bg-ecell-beige px-1 rounded">.env.example</code>.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-ecell-offwhite border border-ecell-border text-xs space-y-1">
                <span className="font-bold text-ecell-navy block">Step 3: Seamless Switch</span>
                <p className="text-ecell-muted">
                  The application automatically switches all queries from local seed arrays to live Postgres queries without touching application source code.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Events Management */}
      {activeTab === 'events' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-ecell-navy">Events Directory</h3>
            <button
              type="button"
              onClick={() => setShowNewEventModal(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-ecell-blue text-white text-xs font-bold hover:bg-ecell-blue-hover transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Event</span>
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-ecell-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-ecell-offwhite border-b border-ecell-border text-ecell-navy uppercase font-bold tracking-wider">
                  <tr>
                    <th className="p-3.5">Event Title</th>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5">Academic Year</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5">Date</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ecell-border">
                  {events.map((ev) => (
                    <tr key={ev.id} className="hover:bg-ecell-beige/20 transition-colors">
                      <td className="p-3.5 font-bold text-ecell-navy max-w-xs truncate">{ev.title}</td>
                      <td className="p-3.5 text-ecell-muted">{ev.category}</td>
                      <td className="p-3.5 font-mono">{ev.academicYear}</td>
                      <td className="p-3.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          ev.status === 'upcoming' ? 'bg-ecell-blue text-white' : 'bg-ecell-beige text-ecell-navy'
                        }`}>
                          {ev.status}
                        </span>
                      </td>
                      <td className="p-3.5 text-ecell-muted">{ev.date}</td>
                      <td className="p-3.5 text-right">
                        <a
                          href={`/events/${ev.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-ecell-blue hover:underline inline-flex items-center gap-1"
                        >
                          <span>View</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Achievements Management */}
      {activeTab === 'achievements' && (
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-ecell-navy">Achievements & Recognitions</h3>
          <div className="bg-white rounded-2xl border border-ecell-border divide-y divide-ecell-border">
            {achievements.map((ach) => (
              <div key={ach.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-ecell-beige text-ecell-navy font-bold">
                      {ach.year}
                    </span>
                    <span className="text-xs font-bold text-ecell-blue">{ach.category}</span>
                  </div>
                  <h4 className="font-bold text-ecell-navy text-sm mt-1">{ach.title}</h4>
                  <p className="text-xs text-ecell-muted mt-0.5 line-clamp-1">{ach.description}</p>
                </div>
                <div className="text-xs font-mono text-ecell-muted shrink-0">
                  {ach.metric && <span className="font-bold text-ecell-navy">{ach.metric}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Gallery Albums */}
      {activeTab === 'gallery' && (
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-ecell-navy">Curated Gallery Albums</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {albums.map((alb) => (
              <div key={alb.id} className="bg-white p-5 rounded-2xl border border-ecell-border space-y-2">
                <span className="text-xs font-mono text-ecell-blue uppercase font-bold">{alb.category} • {alb.academicYear}</span>
                <h4 className="font-bold text-ecell-navy text-base">{alb.title}</h4>
                <p className="text-xs text-ecell-muted line-clamp-2">{alb.description}</p>
                <div className="pt-2 text-xs font-semibold text-ecell-navy">
                  {alb.images.length} Curated Images
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Team Roster */}
      {activeTab === 'team' && (
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-ecell-navy">Committee Roster (Seed & Configured)</h3>
          <div className="bg-white rounded-2xl border border-ecell-border divide-y divide-ecell-border">
            {team.map((m) => (
              <div key={m.id} className="p-4 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-bold text-ecell-navy text-sm">{m.name}</h4>
                  <p className="text-ecell-blue font-medium">{m.role}</p>
                  <p className="text-ecell-muted">{m.department} • {m.academicYear}</p>
                </div>
                <span className="font-mono text-[11px] text-ecell-muted px-2 py-0.5 rounded bg-ecell-offwhite border border-ecell-border">
                  {m.isCore ? 'Core Leader' : 'Coordinator'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 6: Applications & Enquiries */}
      {activeTab === 'applications' && (
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-bold text-ecell-navy mb-3">Recruitment Applications Received</h3>
            {applications.length > 0 ? (
              <div className="bg-white rounded-2xl border border-ecell-border divide-y divide-ecell-border">
                {applications.map((app) => (
                  <div key={app.id} className="p-4 sm:p-5 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-ecell-navy">{app.fullName}</span>
                      <span className="font-mono text-[11px] bg-ecell-blue/10 text-ecell-blue px-2 py-0.5 rounded">
                        PRN: {app.prn}
                      </span>
                    </div>
                    <div className="text-ecell-muted">
                      {app.branch} • {app.yearOfStudy} • Preferred: <strong className="text-ecell-navy">{app.primaryDomain}</strong>
                    </div>
                    <div className="p-3 rounded-lg bg-ecell-offwhite text-ecell-navy italic">
                      &ldquo;{app.statementOfPurpose}&rdquo;
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 bg-white rounded-2xl border border-ecell-border text-center text-xs text-ecell-muted">
                No recruitment applications stored in current session yet.
              </div>
            )}
          </div>

          <div>
            <h3 className="text-lg font-bold text-ecell-navy mb-3">Contact & Collaboration Enquiries</h3>
            {enquiries.length > 0 ? (
              <div className="bg-white rounded-2xl border border-ecell-border divide-y divide-ecell-border">
                {enquiries.map((enq) => (
                  <div key={enq.id} className="p-4 sm:p-5 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-ecell-navy">{enq.fullName} ({enq.email})</span>
                      <span className="font-bold uppercase text-[10px] bg-ecell-beige text-ecell-navy px-2 py-0.5 rounded">
                        {enq.category}
                      </span>
                    </div>
                    <h5 className="font-bold text-ecell-navy">{enq.subject}</h5>
                    <p className="text-ecell-muted">{enq.message}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 bg-white rounded-2xl border border-ecell-border text-center text-xs text-ecell-muted">
                No contact form enquiries stored in current session yet.
              </div>
            )}
          </div>
        </div>
      )}

      {/* New Event Modal */}
      {showNewEventModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl border border-ecell-border max-w-xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-ecell-navy">Create New Event Entry</h3>
            <form onSubmit={handleCreateEvent} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-ecell-navy mb-1">Event Title *</label>
                <input
                  type="text"
                  required
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  placeholder="e.g. Venture Sprint 2025"
                  className="w-full px-3 py-2 rounded-lg border border-ecell-border bg-ecell-offwhite"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-ecell-navy mb-1">Category *</label>
                  <select
                    value={newEvent.category}
                    onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value as EventCategory })}
                    className="w-full px-3 py-2 rounded-lg border border-ecell-border bg-ecell-offwhite"
                  >
                    <option value="Flagship">Flagship</option>
                    <option value="Hackathon">Hackathon</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Speaker Session">Speaker Session</option>
                    <option value="Pitch Competition">Pitch Competition</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-ecell-navy mb-1">Status *</label>
                  <select
                    value={newEvent.status}
                    onChange={(e) => setNewEvent({ ...newEvent, status: e.target.value as 'upcoming' | 'completed' | 'ongoing' })}
                    className="w-full px-3 py-2 rounded-lg border border-ecell-border bg-ecell-offwhite"
                  >
                    <option value="upcoming">Upcoming</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-ecell-navy mb-1">Date String *</label>
                  <input
                    type="text"
                    required
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    placeholder="e.g. May 12, 2025"
                    className="w-full px-3 py-2 rounded-lg border border-ecell-border bg-ecell-offwhite"
                  />
                </div>
                <div>
                  <label className="block font-bold text-ecell-navy mb-1">Venue *</label>
                  <input
                    type="text"
                    required
                    value={newEvent.venue}
                    onChange={(e) => setNewEvent({ ...newEvent, venue: e.target.value })}
                    placeholder="e.g. MITAOE Auditorium"
                    className="w-full px-3 py-2 rounded-lg border border-ecell-border bg-ecell-offwhite"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-ecell-navy mb-1">Short Description *</label>
                <textarea
                  required
                  rows={2}
                  value={newEvent.shortDescription}
                  onChange={(e) => setNewEvent({ ...newEvent, shortDescription: e.target.value })}
                  placeholder="Summary for card displays..."
                  className="w-full px-3 py-2 rounded-lg border border-ecell-border bg-ecell-offwhite"
                />
              </div>

              <div>
                <label className="block font-bold text-ecell-navy mb-1">Full Description *</label>
                <textarea
                  required
                  rows={4}
                  value={newEvent.fullDescription}
                  onChange={(e) => setNewEvent({ ...newEvent, fullDescription: e.target.value })}
                  placeholder="Detailed narrative for the event detail page..."
                  className="w-full px-3 py-2 rounded-lg border border-ecell-border bg-ecell-offwhite"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewEventModal(false)}
                  className="px-4 py-2 rounded-lg border border-ecell-border text-ecell-muted hover:text-ecell-navy"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-ecell-blue text-white font-bold hover:bg-ecell-blue-hover"
                >
                  Save Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
