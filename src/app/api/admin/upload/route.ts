import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminSession, verifyCsrfOrigin } from '@/lib/server-auth';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

export async function POST(request: NextRequest) {
  // 1. Strict Server-Side Authorization
  if (!verifyAdminSession(request)) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized: Administrative session required' },
      { status: 401 }
    );
  }

  // 2. CSRF Origin Verification
  if (!verifyCsrfOrigin(request)) {
    return NextResponse.json(
      { success: false, message: 'Cross-origin request rejected' },
      { status: 403 }
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, message: 'No file provided in upload' },
        { status: 400 }
      );
    }

    // 2. File Size Validation
    if (file.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json(
        { success: false, message: 'File size exceeds maximum 5MB limit' },
        { status: 400 }
      );
    }

    // 3. MIME Type Validation
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        { success: false, message: 'Invalid file format. Only JPEG, PNG, and WebP are permitted' },
        { status: 400 }
      );
    }

    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const fileExt = file.name.split('.').pop()?.toLowerCase() || 'png';
    const safeRandomName = `${Date.now()}-${crypto.randomBytes(8).toString('hex')}.${fileExt}`;

    // 4. Supabase Storage Upload if configured
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.storage
          .from('ecell-media')
          .upload(safeRandomName, fileBuffer, {
            contentType: file.type,
            upsert: false,
          });

        if (!error && data) {
          const { data: publicUrlData } = supabase.storage
            .from('ecell-media')
            .getPublicUrl(safeRandomName);

          return NextResponse.json({
            success: true,
            url: publicUrlData.publicUrl,
            storage: 'supabase',
          });
        }
      } catch {
        // Fallback to local storage if bucket or network fails
      }
    }

    // 5. Local Storage in public/uploads/ (Local / Preview Mode)
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const filePath = path.join(uploadsDir, safeRandomName);
    fs.writeFileSync(filePath, fileBuffer);

    return NextResponse.json({
      success: true,
      url: `/uploads/${safeRandomName}`,
      storage: 'local',
      message: 'Image uploaded locally in preview demonstration mode',
    });
  } catch {
    return NextResponse.json(
      { success: false, message: 'Image upload processing failed' },
      { status: 500 }
    );
  }
}
