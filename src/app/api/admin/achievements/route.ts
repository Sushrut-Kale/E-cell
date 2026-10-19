import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminSession } from '@/lib/server-auth';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';
import { SEED_ACHIEVEMENTS } from '@/data/seed';
import { AchievementItem } from '@/types';

let runtimeAchievements: AchievementItem[] = [...SEED_ACHIEVEMENTS];

export async function GET(request: NextRequest) {
  if (!verifyAdminSession(request)) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.from('achievements').select('*').order('year', { ascending: false });
      if (!error && data) {
        return NextResponse.json({ success: true, achievements: data });
      }
    } catch {}
  }

  return NextResponse.json({ success: true, achievements: runtimeAchievements });
}

export async function POST(request: NextRequest) {
  if (!verifyAdminSession(request)) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, year, category, description, metric, metricLabel, attribution } = body;

    if (!title || !year || !category || !description) {
      return NextResponse.json({ success: false, message: 'Title, year, category, and description are required' }, { status: 400 });
    }

    const newAchievement: AchievementItem = {
      id: 'ach-' + Date.now(),
      title: title.trim(),
      year: String(year).trim(),
      category,
      description: description.trim(),
      metric: metric ? String(metric).trim() : undefined,
      metricLabel: metricLabel ? String(metricLabel).trim() : undefined,
      attribution: attribution ? String(attribution).trim() : 'E-Cell MITAOE Secretariat',
      isFeatured: Boolean(body.isFeatured),
    };

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('achievements').insert([
        {
          title: newAchievement.title,
          year: newAchievement.year,
          category: newAchievement.category,
          description: newAchievement.description,
          metric: newAchievement.metric,
          metric_label: newAchievement.metricLabel,
          attribution: newAchievement.attribution,
          is_featured: newAchievement.isFeatured,
        }
      ]).select().single();

      if (error) {
        return NextResponse.json({ success: false, message: `Database error: ${error.message}` }, { status: 500 });
      }

      return NextResponse.json({ success: true, achievement: data, message: 'Achievement recorded in database' });
    }

    runtimeAchievements = [newAchievement, ...runtimeAchievements];
    return NextResponse.json({
      success: true,
      achievement: newAchievement,
      message: 'Achievement recorded in preview session',
    });
  } catch {
    return NextResponse.json({ success: false, message: 'Server error creating achievement' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  if (!verifyAdminSession(request)) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, message: 'Achievement ID is required' }, { status: 400 });
    }

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('achievements').delete().eq('id', id);
      if (error) {
        return NextResponse.json({ success: false, message: `Database error: ${error.message}` }, { status: 500 });
      }
      return NextResponse.json({ success: true, message: 'Achievement removed from database' });
    }

    runtimeAchievements = runtimeAchievements.filter(a => a.id !== id);
    return NextResponse.json({ success: true, message: 'Achievement removed from preview session' });
  } catch {
    return NextResponse.json({ success: false, message: 'Server error deleting achievement' }, { status: 500 });
  }
}
