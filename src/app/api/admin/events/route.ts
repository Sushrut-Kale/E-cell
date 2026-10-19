import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminSession, verifyCsrfOrigin } from '@/lib/server-auth';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';
import { SEED_EVENTS } from '@/data/seed';
import { EventItem } from '@/types';
import { mapDbEventToEvent } from '@/lib/mappers';

// In-memory runtime store for preview mode session updates
let runtimeEvents: EventItem[] = [...SEED_EVENTS];

export async function GET(request: NextRequest) {
  if (!verifyAdminSession(request)) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.from('events').select('*').order('date', { ascending: false });
      if (!error && data) {
        return NextResponse.json({ success: true, events: data.map(mapDbEventToEvent), source: 'supabase' });
      }
    } catch {
      // Fallback
    }
  }

  return NextResponse.json({ success: true, events: runtimeEvents, source: 'local' });
}

export async function POST(request: NextRequest) {
  if (!verifyAdminSession(request)) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  if (!verifyCsrfOrigin(request)) {
    return NextResponse.json({ success: false, message: 'Cross-origin request rejected' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { title, category, academicYear, status, date, venue, shortDescription, fullDescription, coverImage } = body;

    // Server-side Input Validation
    if (!title || typeof title !== 'string' || title.trim().length < 3) {
      return NextResponse.json({ success: false, message: 'Valid event title (minimum 3 characters) is required' }, { status: 400 });
    }
    if (!category || !date || !venue || !shortDescription) {
      return NextResponse.json({ success: false, message: 'Category, date, venue, and description are required' }, { status: 400 });
    }

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const newEvent: EventItem = {
      id: 'ev-' + Date.now(),
      slug,
      title: title.trim(),
      tagline: body.tagline || '',
      category,
      academicYear: academicYear || '2024-25',
      status: status || 'upcoming',
      date: date.trim(),
      venue: venue.trim(),
      shortDescription: shortDescription.trim(),
      fullDescription: fullDescription ? fullDescription.trim() : shortDescription.trim(),
      coverImage: coverImage || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
      highlights: Array.isArray(body.highlights) ? body.highlights : [],
      outcomes: Array.isArray(body.outcomes) ? body.outcomes : [],
      isFeatured: Boolean(body.isFeatured),
    };

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('events').insert([
        {
          slug: newEvent.slug,
          title: newEvent.title,
          tagline: newEvent.tagline,
          category: newEvent.category,
          academic_year: newEvent.academicYear,
          status: newEvent.status,
          date: newEvent.date,
          venue: newEvent.venue,
          short_description: newEvent.shortDescription,
          full_description: newEvent.fullDescription,
          cover_image: newEvent.coverImage,
          highlights: newEvent.highlights,
          outcomes: newEvent.outcomes,
          is_featured: newEvent.isFeatured,
        }
      ]).select().single();

      if (error) {
        return NextResponse.json({ success: false, message: `Database error: ${error.message}` }, { status: 500 });
      }

      return NextResponse.json({ success: true, event: mapDbEventToEvent(data), message: 'Event successfully created in database' });
    }

    // Local runtime store for preview demonstration
    runtimeEvents = [newEvent, ...runtimeEvents];
    return NextResponse.json({
      success: true,
      event: newEvent,
      message: 'Event recorded in preview store (Supabase credentials pending in .env.local)',
    });
  } catch {
    return NextResponse.json({ success: false, message: 'Server error processing event creation' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  if (!verifyAdminSession(request)) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  if (!verifyCsrfOrigin(request)) {
    return NextResponse.json({ success: false, message: 'Cross-origin request rejected' }, { status: 403 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, message: 'Event ID is required' }, { status: 400 });
    }

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('events').delete().eq('id', id);
      if (error) {
        return NextResponse.json({ success: false, message: `Database error: ${error.message}` }, { status: 500 });
      }
      return NextResponse.json({ success: true, message: 'Event successfully removed from database' });
    }

    runtimeEvents = runtimeEvents.filter(e => e.id !== id);
    return NextResponse.json({ success: true, message: 'Event removed from preview session' });
  } catch {
    return NextResponse.json({ success: false, message: 'Server error deleting event' }, { status: 500 });
  }
}
