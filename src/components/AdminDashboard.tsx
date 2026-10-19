'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { 
  EventItem, 
  AchievementItem, 
  AchievementCategory,
  GalleryAlbum, 
  TeamMember, 
  ContactEnquiry, 
  JoinApplication,
  EventCategory,
  AcademicYear,
  TeamDepartment 
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
  AlertCircle,
  ExternalLink, 
  LogOut,
  Trash2,
  RefreshCw 
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const [activeTab, setActiveTab] = useState<'overview' | 'events' | 'achievements' | 'gallery' | 'team' | 'applications'>('overview');

  // Server-synced state
  const [events, setEvents] = useState<EventItem[]>(SEED_EVENTS);
  const [achievements, setAchievements] = useState<AchievementItem[]>(SEED_ACHIEVEMENTS);
  const [albums, setAlbums] = useState<GalleryAlbum[]>(SEED_GALLERY_ALBUMS);
  const [team, setTeam] = useState<TeamMember[]>(SEED_TEAM_MEMBERS);
  const [enquiries] = useState<ContactEnquiry[]>(() => {
    if (typeof window !== 'undefined') {
      try { return JSON.parse(localStorage.getItem('ecell_demo_enquiries') || '[]'); } catch { return []; }
    }
    return [];
  });
  const [applications] = useState<JoinApplication[]>(() => {
    if (typeof window !== 'undefined') {
      try { return JSON.parse(localStorage.getItem('ecell_demo_applications') || '[]'); } catch { return []; }
    }
    return [];
  });

  // Modal toggles
  const [showEventModal, setShowEventModal] = useState(false);
  const [showAchievementModal, setShowAchievementModal] = useState(false);
  const [showAlbumModal, setShowAlbumModal] = useState(false);
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  // New Event Form
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

  // New Achievement Form
  const [newAchievement, setNewAchievement] = useState({
    title: '',
    year: '2024',
    category: 'Institutional Milestone' as AchievementCategory,
    description: '',
    metric: '',
    metricLabel: '',
    attribution: 'E-Cell MITAOE Annual Review',
  });

  // New Album Form
  const [newAlbum, setNewAlbum] = useState({
    title: '',
    academicYear: '2024-25' as AcademicYear,
    category: 'Flagship' as EventCategory,
    coverImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
    date: 'Academic Year 2024-25',
    description: '',
  });

  // New Member Form
  const [newMember, setNewMember] = useState({
    name: '',
    role: '',
    department: 'Core Leadership' as TeamDepartment,
    academicYear: '2024-25' as AcademicYear,
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    bio: '',
    linkedinUrl: '',
    isCore: false,
  });

  const loadData = useCallback(async () => {
    try {
      const [evRes, achRes, galRes, tmRes] = await Promise.all([
        fetch('/api/admin/events').then(r => r.json()).catch(() => null),
        fetch('/api/admin/achievements').then(r => r.json()).catch(() => null),
        fetch('/api/admin/gallery').then(r => r.json()).catch(() => null),
        fetch('/api/admin/team').then(r => r.json()).catch(() => null),
      ]);
      if (evRes?.events) setEvents(evRes.events);
      if (achRes?.achievements) setAchievements(achRes.achievements);
      if (galRes?.albums) setAlbums(galRes.albums);
      if (tmRes?.team) setTeam(tmRes.team);
    } catch {
      // Fallback
    }
  }, []);

  useEffect(() => {
    fetch('/api/admin/check')
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated) {
          setIsAuthenticated(true);
          loadData();
        }
      })
      .catch(() => {});
  }, [loadData]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsAuthenticated(true);
        loadData();
      } else {
        setAuthError(data.message || 'Invalid administrator credentials');
      }
    } catch {
      setAuthError('Connection error during server authentication');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
    } catch {
      // Ignore
    }
    setIsAuthenticated(false);
  };

  // Image Upload helper
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, target: 'event' | 'album' | 'member') => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const fd = new FormData();
    fd.append('file', file);

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: fd,
      });
      const data = await res.json();
      if (res.ok && data.url) {
        if (target === 'event') setNewEvent(prev => ({ ...prev, coverImage: data.url }));
        if (target === 'album') setNewAlbum(prev => ({ ...prev, coverImage: data.url }));
        if (target === 'member') setNewMember(prev => ({ ...prev, photoUrl: data.url }));
        setNotification({ type: 'success', message: 'Image uploaded successfully' });
      } else {
        setNotification({ type: 'error', message: data.message || 'Upload failed' });
      }
    } catch {
      setNotification({ type: 'error', message: 'Network error during image upload' });
    } finally {
      setUploadingImage(false);
    }
  };

  // Event handlers
  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEvent),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setEvents(prev => [data.event, ...prev]);
        setShowEventModal(false);
        setNotification({ type: 'success', message: data.message || 'Event created' });
      } else {
        setNotification({ type: 'error', message: data.message || 'Failed to create event' });
      }
    } catch {
      setNotification({ type: 'error', message: 'Failed to communicate with server' });
    }
  };

  const handleDeleteEvent = async (id: string) => {
    if (!confirm('Are you sure you want to remove this event record?')) return;
    try {
      const res = await fetch(`/api/admin/events?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
      const data = await res.json();
      if (res.ok && data.success) {
        setEvents(prev => prev.filter(e => e.id !== id));
        setNotification({ type: 'success', message: data.message || 'Event removed' });
      } else {
        setNotification({ type: 'error', message: data.message || 'Failed to delete event' });
      }
    } catch {
      setNotification({ type: 'error', message: 'Network error deleting event' });
    }
  };

  // Achievement handlers
  const handleCreateAchievement = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/achievements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAchievement),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setAchievements(prev => [data.achievement, ...prev]);
        setShowAchievementModal(false);
        setNotification({ type: 'success', message: data.message || 'Achievement recorded' });
      } else {
        setNotification({ type: 'error', message: data.message || 'Failed to create achievement' });
      }
    } catch {
      setNotification({ type: 'error', message: 'Failed to communicate with server' });
    }
  };

  const handleDeleteAchievement = async (id: string) => {
    if (!confirm('Remove this achievement record?')) return;
    try {
      const res = await fetch(`/api/admin/achievements?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
      const data = await res.json();
      if (res.ok && data.success) {
        setAchievements(prev => prev.filter(a => a.id !== id));
        setNotification({ type: 'success', message: data.message || 'Achievement deleted' });
      } else {
        setNotification({ type: 'error', message: data.message || 'Delete failed' });
      }
    } catch {
      setNotification({ type: 'error', message: 'Network error deleting achievement' });
    }
  };

  // Team member handlers
  const handleCreateMember = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMember),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setTeam(prev => [...prev, data.member]);
        setShowMemberModal(false);
        setNotification({ type: 'success', message: data.message || 'Team member added' });
      } else {
        setNotification({ type: 'error', message: data.message || 'Failed to add member' });
      }
    } catch {
      setNotification({ type: 'error', message: 'Failed to communicate with server' });
    }
  };

  const handleDeleteMember = async (id: string) => {
    if (!confirm('Remove this member from roster?')) return;
    try {
      const res = await fetch(`/api/admin/team?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
      const data = await res.json();
      if (res.ok && data.success) {
        setTeam(prev => prev.filter(m => m.id !== id));
        setNotification({ type: 'success', message: data.message || 'Member removed' });
      } else {
        setNotification({ type: 'error', message: data.message || 'Delete failed' });
      }
    } catch {
      setNotification({ type: 'error', message: 'Network error deleting member' });
    }
  };

  // Gallery album handlers
  const handleCreateAlbum = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAlbum),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setAlbums(prev => [data.album, ...prev]);
        setShowAlbumModal(false);
        setNotification({ type: 'success', message: data.message || 'Album created' });
      } else {
        setNotification({ type: 'error', message: data.message || 'Failed to create album' });
      }
    } catch {
      setNotification({ type: 'error', message: 'Failed to communicate with server' });
    }
  };

  const handleDeleteAlbum = async (id: string) => {
    if (!confirm('Remove this album record?')) return;
    try {
      const res = await fetch(`/api/admin/gallery?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
      const data = await res.json();
      if (res.ok && data.success) {
        setAlbums(prev => prev.filter(a => a.id !== id));
        setNotification({ type: 'success', message: data.message || 'Album removed' });
      } else {
        setNotification({ type: 'error', message: data.message || 'Delete failed' });
      }
    } catch {
      setNotification({ type: 'error', message: 'Network error deleting album' });
    }
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
            Authentication is verified server-side against protected configurations. Enter your authorized passcode to manage club initiatives and view applications.
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
            disabled={authLoading}
            className="w-full py-3 rounded-xl bg-ecell-blue text-white font-bold text-sm shadow-xs hover:bg-ecell-blue-hover transition-colors disabled:opacity-50"
          >
            {authLoading ? 'Verifying Credentials...' : 'Authenticate & Proceed'}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-ecell-border text-center text-[11px] text-ecell-muted">
          Access is verified server-side with cryptographic rate-limited tokens.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {notification && (
        <div
          className={`p-4 rounded-xl text-xs sm:text-sm font-medium flex items-center justify-between gap-3 animate-in fade-in duration-150 ${
            notification.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : 'bg-rose-50 text-rose-800 border border-rose-200'
          }`}
        >
          <div className="flex items-center gap-2">
            {notification.type === 'success' ? (
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            )}
            <span>{notification.message}</span>
          </div>
          <button
            type="button"
            onClick={() => setNotification(null)}
            className="text-xs underline hover:no-underline"
          >
            Dismiss
          </button>
        </div>
      )}

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
                Server Session Active
              </span>
              <span>•</span>
              <span className={`flex items-center gap-1 font-mono ${isSupabaseConfigured ? 'text-emerald-600 font-bold' : 'text-amber-600 font-medium'}`}>
                <Database className="w-3 h-3" />
                {isSupabaseConfigured ? 'Supabase Live Connected' : 'Local Preview / Standby Mode'}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={loadData}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-ecell-border text-xs font-semibold text-ecell-navy hover:bg-ecell-offwhite transition-colors"
            title="Refresh database records"
          >
            <RefreshCw className="w-3.5 h-3.5 text-ecell-blue" />
            <span>Sync</span>
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-ecell-border text-xs font-semibold text-ecell-muted hover:text-ecell-navy hover:bg-ecell-offwhite transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Exit Admin</span>
          </button>
        </div>
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

      {/* Tab 1: Overview */}
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

          <div className="p-6 sm:p-8 bg-white rounded-2xl border border-ecell-border space-y-4">
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-ecell-blue" />
              <h3 className="text-lg font-bold text-ecell-navy">Database & Cloud Persistence Architecture</h3>
            </div>
            <p className="text-sm text-ecell-muted leading-relaxed">
              Every CRUD operation executed through this dashboard connects directly to server-authorized routes.
              Currently operating in: <strong className="text-ecell-navy">{isSupabaseConfigured ? 'Live Supabase Cloud Mode' : 'Local Preview Session Mode'}</strong>.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="p-3.5 rounded-xl bg-ecell-offwhite border border-ecell-border">
                <span className="font-bold text-ecell-navy block mb-1">Server Authorization</span>
                <p className="text-ecell-muted">Timing-safe session cookies and rate-limited endpoints protect all admin routes.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-ecell-offwhite border border-ecell-border">
                <span className="font-bold text-ecell-navy block mb-1">Media Storage</span>
                <p className="text-ecell-muted">Image uploads validate MIME types and file limits before storing in cloud bucket or local uploads.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-ecell-offwhite border border-ecell-border">
                <span className="font-bold text-ecell-navy block mb-1">Database Handshake</span>
                <p className="text-ecell-muted">Add NEXT_PUBLIC_SUPABASE_URL and ANON_KEY to .env.local to activate instant Postgres sync.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Events */}
      {activeTab === 'events' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-ecell-navy">Events Directory</h3>
            <button
              type="button"
              onClick={() => setShowEventModal(true)}
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
                      <td className="p-3.5 text-right space-x-2">
                        <a
                          href={`/events/${ev.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-ecell-blue hover:underline inline-flex items-center gap-0.5"
                        >
                          <span>View</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                        <button
                          type="button"
                          onClick={() => handleDeleteEvent(ev.id)}
                          className="text-rose-600 hover:text-rose-800 p-1 rounded hover:bg-rose-50"
                          title="Delete Event"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Achievements */}
      {activeTab === 'achievements' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-ecell-navy">Achievements & Recognitions</h3>
            <button
              type="button"
              onClick={() => setShowAchievementModal(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-ecell-blue text-white text-xs font-bold hover:bg-ecell-blue-hover transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Achievement</span>
            </button>
          </div>

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
                <div className="flex items-center gap-3 shrink-0">
                  {ach.metric && <span className="font-bold text-xs text-ecell-navy">{ach.metric}</span>}
                  <button
                    type="button"
                    onClick={() => handleDeleteAchievement(ach.id)}
                    className="text-rose-600 hover:text-rose-800 p-1.5 rounded hover:bg-rose-50"
                    title="Delete record"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Gallery Albums */}
      {activeTab === 'gallery' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-ecell-navy">Curated Gallery Albums</h3>
            <button
              type="button"
              onClick={() => setShowAlbumModal(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-ecell-blue text-white text-xs font-bold hover:bg-ecell-blue-hover transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Album</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {albums.map((alb) => (
              <div key={alb.id} className="bg-white p-5 rounded-2xl border border-ecell-border space-y-2 relative group">
                <span className="text-xs font-mono text-ecell-blue uppercase font-bold">{alb.category} • {alb.academicYear}</span>
                <h4 className="font-bold text-ecell-navy text-base">{alb.title}</h4>
                <p className="text-xs text-ecell-muted line-clamp-2">{alb.description}</p>
                <div className="pt-2 flex items-center justify-between text-xs font-semibold text-ecell-navy border-t border-ecell-border">
                  <span>{alb.images?.length || 0} Photographs</span>
                  <button
                    type="button"
                    onClick={() => handleDeleteAlbum(alb.id)}
                    className="text-rose-600 hover:text-rose-800 p-1 rounded"
                    title="Delete Album"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Team Roster */}
      {activeTab === 'team' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-ecell-navy">Committee Roster</h3>
            <button
              type="button"
              onClick={() => setShowMemberModal(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-ecell-blue text-white text-xs font-bold hover:bg-ecell-blue-hover transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Committee Member</span>
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-ecell-border divide-y divide-ecell-border">
            {team.map((m) => (
              <div key={m.id} className="p-4 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-bold text-ecell-navy text-sm">{m.name}</h4>
                  <p className="text-ecell-blue font-medium">{m.role}</p>
                  <p className="text-ecell-muted">{m.department} • {m.academicYear}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[11px] text-ecell-muted px-2 py-0.5 rounded bg-ecell-offwhite border border-ecell-border">
                    {m.isCore ? 'Core Leader' : 'Coordinator'}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleDeleteMember(m.id)}
                    className="text-rose-600 hover:text-rose-800 p-1.5 rounded hover:bg-rose-50"
                    title="Remove member"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
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
                      <span className="font-bold text-sm text-ecell-navy">{app.fullName} ({app.email})</span>
                      <span className="font-mono text-[11px] bg-ecell-blue/10 text-ecell-blue px-2 py-0.5 rounded">
                        PRN: {app.prn}
                      </span>
                    </div>
                    <div className="text-ecell-muted">
                      {app.branch} • {app.yearOfStudy} • Primary: <strong className="text-ecell-navy">{app.primaryDomain}</strong>
                    </div>
                    <div className="p-3 rounded-lg bg-ecell-offwhite text-ecell-navy italic">
                      &ldquo;{app.statementOfPurpose}&rdquo;
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 bg-white rounded-2xl border border-ecell-border text-center text-xs text-ecell-muted">
                No recruitment applications recorded yet.
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
                No contact form enquiries recorded yet.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal: Create Event */}
      {showEventModal && (
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
                  className="w-full px-3 py-2 rounded-lg border border-ecell-border bg-ecell-offwhite text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-ecell-navy mb-1">Category *</label>
                  <select
                    value={newEvent.category}
                    onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value as EventCategory })}
                    className="w-full px-3 py-2 rounded-lg border border-ecell-border bg-ecell-offwhite text-xs"
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
                    onChange={(e) => setNewEvent({ ...newEvent, status: e.target.value as 'upcoming' | 'completed' })}
                    className="w-full px-3 py-2 rounded-lg border border-ecell-border bg-ecell-offwhite text-xs"
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
                    className="w-full px-3 py-2 rounded-lg border border-ecell-border bg-ecell-offwhite text-xs"
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
                    className="w-full px-3 py-2 rounded-lg border border-ecell-border bg-ecell-offwhite text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-ecell-navy mb-1">Upload Event Image</label>
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={(e) => handleFileUpload(e, 'event')}
                    className="w-full text-xs file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:bg-ecell-beige file:text-ecell-navy"
                  />
                  {uploadingImage && <span className="text-xs text-ecell-blue animate-pulse">Uploading...</span>}
                </div>
                <input
                  type="text"
                  value={newEvent.coverImage}
                  onChange={(e) => setNewEvent({ ...newEvent, coverImage: e.target.value })}
                  placeholder="Or enter image URL..."
                  className="w-full mt-1.5 px-3 py-1.5 rounded-lg border border-ecell-border bg-ecell-offwhite text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-ecell-navy mb-1">Short Description *</label>
                <textarea
                  required
                  rows={2}
                  value={newEvent.shortDescription}
                  onChange={(e) => setNewEvent({ ...newEvent, shortDescription: e.target.value })}
                  placeholder="Summary for cards..."
                  className="w-full px-3 py-2 rounded-lg border border-ecell-border bg-ecell-offwhite text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-ecell-navy mb-1">Full Description *</label>
                <textarea
                  required
                  rows={3}
                  value={newEvent.fullDescription}
                  onChange={(e) => setNewEvent({ ...newEvent, fullDescription: e.target.value })}
                  placeholder="Detailed content for page..."
                  className="w-full px-3 py-2 rounded-lg border border-ecell-border bg-ecell-offwhite text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-ecell-border">
                <button
                  type="button"
                  onClick={() => setShowEventModal(false)}
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

      {/* Modal: Create Achievement */}
      {showAchievementModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl border border-ecell-border max-w-lg w-full p-6 space-y-4">
            <h3 className="text-lg font-bold text-ecell-navy">Add Achievement Record</h3>
            <form onSubmit={handleCreateAchievement} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-ecell-navy mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={newAchievement.title}
                  onChange={(e) => setNewAchievement({ ...newAchievement, title: e.target.value })}
                  placeholder="e.g. Winner at State Pitch Fest [Representative Record]"
                  className="w-full px-3 py-2 rounded-lg border border-ecell-border bg-ecell-offwhite text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-ecell-navy mb-1">Year *</label>
                  <input
                    type="text"
                    required
                    value={newAchievement.year}
                    onChange={(e) => setNewAchievement({ ...newAchievement, year: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-ecell-border bg-ecell-offwhite"
                  />
                </div>
                <div>
                  <label className="block font-bold text-ecell-navy mb-1">Category *</label>
                  <select
                    value={newAchievement.category}
                    onChange={(e) => setNewAchievement({ ...newAchievement, category: e.target.value as AchievementCategory })}
                    className="w-full px-3 py-2 rounded-lg border border-ecell-border bg-ecell-offwhite"
                  >
                    <option value="Institutional Milestone">Institutional Milestone</option>
                    <option value="Student Venture">Student Venture</option>
                    <option value="Competition Win">Competition Win</option>
                    <option value="Ecosystem Impact">Ecosystem Impact</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block font-bold text-ecell-navy mb-1">Description *</label>
                <textarea
                  required
                  rows={3}
                  value={newAchievement.description}
                  onChange={(e) => setNewAchievement({ ...newAchievement, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-ecell-border bg-ecell-offwhite"
                />
              </div>
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-ecell-border">
                <button
                  type="button"
                  onClick={() => setShowAchievementModal(false)}
                  className="px-4 py-2 rounded-lg border border-ecell-border text-ecell-muted hover:text-ecell-navy"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-ecell-blue text-white font-bold hover:bg-ecell-blue-hover"
                >
                  Save Achievement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Create Member */}
      {showMemberModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl border border-ecell-border max-w-lg w-full p-6 space-y-4">
            <h3 className="text-lg font-bold text-ecell-navy">Add Committee Member</h3>
            <form onSubmit={handleCreateMember} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-ecell-navy mb-1">Member Name *</label>
                  <input
                    type="text"
                    required
                    value={newMember.name}
                    onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                    placeholder="e.g. Aryan Shinde"
                    className="w-full px-3 py-2 rounded-lg border border-ecell-border bg-ecell-offwhite"
                  />
                </div>
                <div>
                  <label className="block font-bold text-ecell-navy mb-1">Role / Position *</label>
                  <input
                    type="text"
                    required
                    value={newMember.role}
                    onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                    placeholder="e.g. Technical Coordinator"
                    className="w-full px-3 py-2 rounded-lg border border-ecell-border bg-ecell-offwhite"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-ecell-navy mb-1">Department *</label>
                  <select
                    value={newMember.department}
                    onChange={(e) => setNewMember({ ...newMember, department: e.target.value as TeamDepartment })}
                    className="w-full px-3 py-2 rounded-lg border border-ecell-border bg-ecell-offwhite"
                  >
                    <option value="Core Leadership">Core Leadership</option>
                    <option value="Technical & Web Development">Technical & Web Development</option>
                    <option value="Design & Media">Design & Media</option>
                    <option value="Public Relations & Marketing">Public Relations & Marketing</option>
                    <option value="Corporate Relations & Sponsorship">Corporate Relations & Sponsorship</option>
                    <option value="Operations & Logistics">Operations & Logistics</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-ecell-navy mb-1">Academic Year *</label>
                  <select
                    value={newMember.academicYear}
                    onChange={(e) => setNewMember({ ...newMember, academicYear: e.target.value as AcademicYear })}
                    className="w-full px-3 py-2 rounded-lg border border-ecell-border bg-ecell-offwhite"
                  >
                    <option value="2024-25">2024-25</option>
                    <option value="2023-24">2023-24</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block font-bold text-ecell-navy mb-1">Photo Upload</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, 'member')}
                  className="w-full text-xs file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:bg-ecell-beige file:text-ecell-navy"
                />
              </div>
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-ecell-border">
                <button
                  type="button"
                  onClick={() => setShowMemberModal(false)}
                  className="px-4 py-2 rounded-lg border border-ecell-border text-ecell-muted hover:text-ecell-navy"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-ecell-blue text-white font-bold hover:bg-ecell-blue-hover"
                >
                  Save Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Create Album */}
      {showAlbumModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl border border-ecell-border max-w-lg w-full p-6 space-y-4">
            <h3 className="text-lg font-bold text-ecell-navy">Create Gallery Album</h3>
            <form onSubmit={handleCreateAlbum} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-ecell-navy mb-1">Album Title *</label>
                <input
                  type="text"
                  required
                  value={newAlbum.title}
                  onChange={(e) => setNewAlbum({ ...newAlbum, title: e.target.value })}
                  placeholder="e.g. E-Summit 2025 Keynotes"
                  className="w-full px-3 py-2 rounded-lg border border-ecell-border bg-ecell-offwhite text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-ecell-navy mb-1">Category *</label>
                  <select
                    value={newAlbum.category}
                    onChange={(e) => setNewAlbum({ ...newAlbum, category: e.target.value as EventCategory })}
                    className="w-full px-3 py-2 rounded-lg border border-ecell-border bg-ecell-offwhite"
                  >
                    <option value="Flagship">Flagship</option>
                    <option value="Hackathon">Hackathon</option>
                    <option value="Workshop">Workshop</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-ecell-navy mb-1">Academic Year *</label>
                  <select
                    value={newAlbum.academicYear}
                    onChange={(e) => setNewAlbum({ ...newAlbum, academicYear: e.target.value as AcademicYear })}
                    className="w-full px-3 py-2 rounded-lg border border-ecell-border bg-ecell-offwhite"
                  >
                    <option value="2024-25">2024-25</option>
                    <option value="2023-24">2023-24</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block font-bold text-ecell-navy mb-1">Album Cover Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, 'album')}
                  className="w-full text-xs file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:bg-ecell-beige file:text-ecell-navy"
                />
              </div>
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-ecell-border">
                <button
                  type="button"
                  onClick={() => setShowAlbumModal(false)}
                  className="px-4 py-2 rounded-lg border border-ecell-border text-ecell-muted hover:text-ecell-navy"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-ecell-blue text-white font-bold hover:bg-ecell-blue-hover"
                >
                  Save Album
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
