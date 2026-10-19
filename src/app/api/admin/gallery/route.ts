import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminSession, verifyCsrfOrigin } from '@/lib/server-auth';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';
import { SEED_GALLERY_ALBUMS } from '@/data/seed';
import { GalleryAlbum } from '@/types';
import { mapDbAlbumToAlbum } from '@/lib/mappers';

let runtimeAlbums: GalleryAlbum[] = [...SEED_GALLERY_ALBUMS];

export async function GET(request: NextRequest) {
  if (!verifyAdminSession(request)) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.from('gallery_albums').select('*, gallery_images(*)');
      if (!error && data) {
        return NextResponse.json({ success: true, albums: data.map(mapDbAlbumToAlbum) });
      }
    } catch {}
  }

  return NextResponse.json({ success: true, albums: runtimeAlbums });
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
    const { title, academicYear, category, coverImage, date, description } = body;

    if (!title || !academicYear || !category || !coverImage) {
      return NextResponse.json({ success: false, message: 'Title, academic year, category, and cover image are required' }, { status: 400 });
    }

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const newAlbum: GalleryAlbum = {
      id: 'alb-' + Date.now(),
      slug,
      title: title.trim(),
      academicYear,
      category,
      coverImage: coverImage.trim(),
      imageCount: Array.isArray(body.images) ? body.images.length : 0,
      date: date ? date.trim() : 'Academic Session ' + academicYear,
      description: description ? description.trim() : 'Curated event archive from ' + title,
      images: Array.isArray(body.images) ? body.images : [],
    };

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('gallery_albums').insert([
        {
          slug: newAlbum.slug,
          title: newAlbum.title,
          academic_year: newAlbum.academicYear,
          category: newAlbum.category,
          cover_image: newAlbum.coverImage,
          date: newAlbum.date,
          description: newAlbum.description,
        }
      ]).select().single();

      if (error) {
        return NextResponse.json({ success: false, message: `Database error: ${error.message}` }, { status: 500 });
      }

      return NextResponse.json({
        success: true,
        album: mapDbAlbumToAlbum(data),
        message: 'Album recorded in database'
      });
    }

    runtimeAlbums = [newAlbum, ...runtimeAlbums];
    return NextResponse.json({
      success: true,
      album: newAlbum,
      message: 'Album recorded in preview session',
    });
  } catch {
    return NextResponse.json({ success: false, message: 'Server error creating gallery album' }, { status: 500 });
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
      return NextResponse.json({ success: false, message: 'Album ID is required' }, { status: 400 });
    }

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('gallery_albums').delete().eq('id', id);
      if (error) {
        return NextResponse.json({ success: false, message: `Database error: ${error.message}` }, { status: 500 });
      }
      return NextResponse.json({ success: true, message: 'Album removed from database' });
    }

    runtimeAlbums = runtimeAlbums.filter(a => a.id !== id);
    return NextResponse.json({ success: true, message: 'Album removed from preview session' });
  } catch {
    return NextResponse.json({ success: false, message: 'Server error deleting album' }, { status: 500 });
  }
}
