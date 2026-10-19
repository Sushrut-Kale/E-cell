import { 
  EventItem, 
  AchievementItem, 
  GalleryAlbum, 
  TeamMember, 
  HomepageStats,
  ContactEnquiry,
  JoinApplication,
  AcademicYear,
  EventCategory
} from '@/types';
import { 
  SEED_EVENTS, 
  SEED_ACHIEVEMENTS, 
  SEED_GALLERY_ALBUMS, 
  SEED_TEAM_MEMBERS, 
  SEED_HOMEPAGE_STATS 
} from '@/data/seed';
import { supabase, isSupabaseConfigured } from './supabase';

export async function getHomepageStats(): Promise<HomepageStats> {
  return SEED_HOMEPAGE_STATS;
}

export async function getEvents(filters?: {
  academicYear?: AcademicYear | 'all';
  category?: EventCategory | 'all';
  status?: 'upcoming' | 'completed' | 'all';
  search?: string;
}): Promise<EventItem[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      let query = supabase.from('events').select('*').order('date', { ascending: false });
      if (filters?.academicYear && filters.academicYear !== 'all') {
        query = query.eq('academic_year', filters.academicYear);
      }
      if (filters?.category && filters.category !== 'all') {
        query = query.eq('category', filters.category);
      }
      if (filters?.status && filters.status !== 'all') {
        query = query.eq('status', filters.status);
      }
      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        return data as EventItem[];
      }
    } catch {
      // Fallback to seed data
    }
  }

  let items = [...SEED_EVENTS];

  if (filters?.academicYear && filters.academicYear !== 'all') {
    items = items.filter(e => e.academicYear === filters.academicYear);
  }
  if (filters?.category && filters.category !== 'all') {
    items = items.filter(e => e.category === filters.category);
  }
  if (filters?.status && filters.status !== 'all') {
    items = items.filter(e => e.status === filters.status);
  }
  if (filters?.search && filters.search.trim().length > 0) {
    const q = filters.search.toLowerCase();
    items = items.filter(e => 
      e.title.toLowerCase().includes(q) || 
      e.tagline.toLowerCase().includes(q) ||
      e.shortDescription.toLowerCase().includes(q) ||
      e.venue.toLowerCase().includes(q)
    );
  }

  return items;
}

export async function getEventBySlug(slug: string): Promise<EventItem | null> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('slug', slug)
        .single();
      if (!error && data) return data as EventItem;
    } catch {
      // Fallback
    }
  }

  return SEED_EVENTS.find(e => e.slug === slug) || null;
}

export async function getFeaturedEvents(): Promise<EventItem[]> {
  const events = await getEvents();
  return events.filter(e => e.isFeatured);
}

export async function getAchievements(filters?: {
  year?: string;
  category?: string;
}): Promise<AchievementItem[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      let query = supabase.from('achievements').select('*').order('year', { ascending: false });
      if (filters?.year && filters.year !== 'all') {
        query = query.eq('year', filters.year);
      }
      if (filters?.category && filters.category !== 'all') {
        query = query.eq('category', filters.category);
      }
      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        return data as AchievementItem[];
      }
    } catch {
      // Fallback
    }
  }

  let items = [...SEED_ACHIEVEMENTS];
  if (filters?.year && filters.year !== 'all') {
    items = items.filter(a => a.year === filters.year);
  }
  if (filters?.category && filters.category !== 'all') {
    items = items.filter(a => a.category === filters.category);
  }
  return items;
}

export async function getGalleryAlbums(filters?: {
  academicYear?: AcademicYear | 'all';
  category?: EventCategory | 'all';
}): Promise<GalleryAlbum[]> {
  let albums = [...SEED_GALLERY_ALBUMS];
  if (filters?.academicYear && filters.academicYear !== 'all') {
    albums = albums.filter(a => a.academicYear === filters.academicYear);
  }
  if (filters?.category && filters.category !== 'all') {
    albums = albums.filter(a => a.category === filters.category);
  }
  return albums;
}

export async function getTeamMembers(filters?: {
  academicYear?: AcademicYear | 'all';
  department?: string;
}): Promise<TeamMember[]> {
  let members = [...SEED_TEAM_MEMBERS];
  if (filters?.academicYear && filters.academicYear !== 'all') {
    members = members.filter(m => m.academicYear === filters.academicYear);
  }
  if (filters?.department && filters.department !== 'all') {
    members = members.filter(m => m.department === filters.department);
  }
  return members.sort((a, b) => a.order - b.order);
}

export async function submitContactEnquiry(data: Omit<ContactEnquiry, 'id' | 'createdAt' | 'status'>): Promise<{ success: boolean; message: string }> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from('contact_enquiries').insert([
        {
          full_name: data.fullName,
          email: data.email,
          subject: data.subject,
          category: data.category,
          message: data.message,
        }
      ]);
      if (error) {
        return { success: false, message: error.message };
      }
      return { success: true, message: 'Your enquiry has been successfully transmitted to the E-Cell MITAOE coordination team.' };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Database submission failed';
      return { success: false, message: msg };
    }
  }

  // Fallback demo/preview mode:
  // We clearly communicate that this was stored in local demonstration session
  if (typeof window !== 'undefined') {
    try {
      const stored = JSON.parse(localStorage.getItem('ecell_demo_enquiries') || '[]');
      stored.push({
        id: 'enq-' + Date.now(),
        ...data,
        createdAt: new Date().toISOString(),
        status: 'new'
      });
      localStorage.setItem('ecell_demo_enquiries', JSON.stringify(stored));
    } catch {
      // Ignore storage errors
    }
  }

  return {
    success: true,
    message: 'Enquiry received in preview demonstration mode. Once production database is connected, this dispatches directly to the student relations desk.'
  };
}

export async function submitJoinApplication(data: Omit<JoinApplication, 'id' | 'createdAt' | 'status'>): Promise<{ success: boolean; message: string }> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from('join_applications').insert([
        {
          full_name: data.fullName,
          email: data.email,
          phone: data.phone,
          prn: data.prn,
          branch: data.branch,
          year_of_study: data.yearOfStudy,
          primary_domain: data.primaryDomain,
          secondary_domain: data.secondaryDomain,
          portfolio_url: data.portfolioUrl || null,
          statement_of_purpose: data.statementOfPurpose,
        }
      ]);
      if (error) {
        return { success: false, message: error.message };
      }
      return { success: true, message: 'Application submitted successfully! Check your email for next round updates.' };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Application submission failed';
      return { success: false, message: msg };
    }
  }

  // Demo fallback
  if (typeof window !== 'undefined') {
    try {
      const stored = JSON.parse(localStorage.getItem('ecell_demo_applications') || '[]');
      stored.push({
        id: 'app-' + Date.now(),
        ...data,
        createdAt: new Date().toISOString(),
        status: 'pending'
      });
      localStorage.setItem('ecell_demo_applications', JSON.stringify(stored));
    } catch {
      // Ignore
    }
  }

  return {
    success: true,
    message: 'Recruitment application received in preview mode! Seed records will transition to live committee database upon activation.'
  };
}
