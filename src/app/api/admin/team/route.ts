import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminSession, verifyCsrfOrigin } from '@/lib/server-auth';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';
import { SEED_TEAM_MEMBERS } from '@/data/seed';
import { TeamMember } from '@/types';
import { mapDbTeamMemberToMember } from '@/lib/mappers';

let runtimeTeam: TeamMember[] = [...SEED_TEAM_MEMBERS];

export async function GET(request: NextRequest) {
  if (!verifyAdminSession(request)) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.from('team_members').select('*').order('sort_order', { ascending: true });
      if (!error && data) {
        return NextResponse.json({ success: true, team: data.map(mapDbTeamMemberToMember) });
      }
    } catch {}
  }

  return NextResponse.json({ success: true, team: runtimeTeam });
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
    const { name, role, department, academicYear, photoUrl, bio, linkedinUrl } = body;

    if (!name || !role || !department || !academicYear) {
      return NextResponse.json({ success: false, message: 'Name, role, department, and academic year are required' }, { status: 400 });
    }

    const newMember: TeamMember = {
      id: 'tm-' + Date.now(),
      name: name.trim(),
      role: role.trim(),
      department,
      academicYear,
      photoUrl: photoUrl ? photoUrl.trim() : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      bio: bio ? bio.trim() : undefined,
      linkedinUrl: linkedinUrl ? linkedinUrl.trim() : undefined,
      isCore: Boolean(body.isCore),
      order: body.order || runtimeTeam.length + 1,
    };

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('team_members').insert([
        {
          name: newMember.name,
          role: newMember.role,
          department: newMember.department,
          academic_year: newMember.academicYear,
          photo_url: newMember.photoUrl,
          bio: newMember.bio,
          linkedin_url: newMember.linkedinUrl,
          is_core: newMember.isCore,
          sort_order: newMember.order,
        }
      ]).select().single();

      if (error) {
        return NextResponse.json({ success: false, message: `Database error: ${error.message}` }, { status: 500 });
      }

      return NextResponse.json({
        success: true,
        member: mapDbTeamMemberToMember(data),
        message: 'Team member added to database'
      });
    }

    runtimeTeam = [...runtimeTeam, newMember];
    return NextResponse.json({
      success: true,
      member: newMember,
      message: 'Team member added to preview session',
    });
  } catch {
    return NextResponse.json({ success: false, message: 'Server error creating team member' }, { status: 500 });
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
      return NextResponse.json({ success: false, message: 'Member ID is required' }, { status: 400 });
    }

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('team_members').delete().eq('id', id);
      if (error) {
        return NextResponse.json({ success: false, message: `Database error: ${error.message}` }, { status: 500 });
      }
      return NextResponse.json({ success: true, message: 'Team member removed from database' });
    }

    runtimeTeam = runtimeTeam.filter(m => m.id !== id);
    return NextResponse.json({ success: true, message: 'Team member removed from preview session' });
  } catch {
    return NextResponse.json({ success: false, message: 'Server error deleting team member' }, { status: 500 });
  }
}
