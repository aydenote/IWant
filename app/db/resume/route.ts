import { getServerSession } from 'next-auth';
import { authOptions } from '../../apis/auth/[...nextauth]/route';
import { NextResponse } from 'next/server';
import { supabase } from '../../(lib)/supabase';
import { prisma } from '../../(lib)/prisma';

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

export const DELETE = async () => {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) return NextResponse.json({ ok: false }, { status: 401 });

  const profile = await prisma.profile.findUnique({ where: { userId } });
  if (!profile?.resumeUrl) {
    return NextResponse.json({ ok: true, resumeUrl: null, resumeName: null });
  }
  const { error } = await supabase.storage
    .from('resumes')
    .remove([profile.resumeUrl]);

  if (error) {
    return NextResponse.json(
      { ok: false, message: error.message },
      { status: 500 }
    );
  }

  await prisma.profile.upsert({
    where: { userId },
    update: { resumeUrl: null, resumeName: null },
    create: { userId, resumeUrl: null, resumeName: null },
  });

  return NextResponse.json({
    ok: true,
  });
};
