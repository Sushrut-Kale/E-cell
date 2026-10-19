import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminSession, verifyCsrfOrigin } from '@/lib/server-auth';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';
import { mapDbEnquiryToEnquiry } from '@/lib/mappers';

export async function GET(request: NextRequest) {
  if (!verifyAdminSession(request)) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('contact_enquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        return NextResponse.json({
          success: true,
          enquiries: data.map(mapDbEnquiryToEnquiry),
          source: 'supabase',
        });
      }
    } catch {
      // Fallback
    }
  }

  return NextResponse.json({
    success: true,
    enquiries: [],
    source: 'local',
  });
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
      return NextResponse.json({ success: false, message: 'Enquiry ID is required' }, { status: 400 });
    }

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('contact_enquiries').delete().eq('id', id);
      if (error) {
        return NextResponse.json({ success: false, message: `Database error: ${error.message}` }, { status: 500 });
      }
      return NextResponse.json({ success: true, message: 'Enquiry record removed from database' });
    }

    return NextResponse.json({ success: true, message: 'Enquiry removed from local session' });
  } catch {
    return NextResponse.json({ success: false, message: 'Server error processing deletion' }, { status: 500 });
  }
}
