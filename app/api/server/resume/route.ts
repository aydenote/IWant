import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import { supabase } from '../../../(lib)/supabase';
import { prisma } from '../../../(lib)/prisma';

export const GET = async () => {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (!userId) return NextResponse.json({ ok: false }, { status: 401 });

  const profile = await prisma.profile.findUnique({ where: { userId } });
  if (!profile?.resumeUrl) {
    return NextResponse.json({ ok: true, resumeUrl: null, resumeName: null });
  }

  const { data, error } = await supabase.storage
    .from('resumes')
    .createSignedUrl(profile.resumeUrl, 60);

  if (error) {
    return NextResponse.json(
      { ok: false, message: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    ok: true,
    resumeUrl: data.signedUrl,
    resumeName: profile.resumeName ?? null,
  });
};

export const POST = async (req: Request) => {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (!userId) return NextResponse.json({ ok: false }, { status: 401 });

  const form = await req.formData();
  const file = form.get('resume') as File | null;
  if (!file) return NextResponse.json({ ok: false }, { status: 400 });

  const ext = file.name.split('.').pop();
  const path = `${userId}/${Date.now()}.${ext}`;

  const { error } = await supabase.storage
    .from('resumes')
    .upload(path, file, { contentType: file.type });

  if (error) {
    return NextResponse.json(
      { ok: false, message: error.message },
      { status: 500 }
    );
  }

  // 업로드 직후 파일 URL 생성
  const { data, error: urlErr } = await supabase.storage
    .from('resumes')
    .createSignedUrl(path, 60);

  if (urlErr) {
    return NextResponse.json(
      { ok: false, message: urlErr.message },
      { status: 500 }
    );
  }

  await prisma.profile.upsert({
    where: { userId },
    update: { resumeUrl: path, resumeName: file.name },
    create: { userId, resumeUrl: path, resumeName: file.name },
  });

  return NextResponse.json({
    ok: true,
    resumeUrl: data.signedUrl,
    resumeName: file.name,
  });
};
