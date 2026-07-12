import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { supabase } from '../../_lib/supabase';
import { prisma } from '../../_lib/prisma';
import { authOptions } from '../auth/[...nextauth]/route';
import { checkAuth } from '../../_services/server/common';
import { validateCsrfRequest } from '../../_services/server/csrf';

export const POST = async (req: Request) => {
  const csrfError = validateCsrfRequest(req);
  if (csrfError) return csrfError;

  const { isAuth, userId } = await checkAuth();

  if (!isAuth || !userId) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const form = await req.formData();
  const file = form.get('resume') as File | null;
  if (!file) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

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
    update: {
      resumeUrl: path,
      resumeName: file.name,
      modifiedDate: file.lastModified,
    },
    create: {
      userId,
      resumeUrl: path,
      resumeName: file.name,
      modifiedDate: file.lastModified,
    },
  });

  return NextResponse.json({
    ok: true,
    resumeUrl: data.signedUrl,
    resumeName: file.name,
    modifiedDate: file.lastModified,
  });
};

export const DELETE = async (req: Request) => {
  const csrfError = validateCsrfRequest(req);
  if (csrfError) return csrfError;

  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) return NextResponse.json({ ok: false }, { status: 401 });

  const profile = await prisma.profile.findUnique({ where: { userId } });
  if (!profile?.resumeUrl) {
    return NextResponse.json({
      ok: true,
      resumeUrl: null,
      resumeName: null,
      modifiedDate: null,
    });
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
    update: { resumeUrl: null, resumeName: null, modifiedDate: null },
    create: { userId, resumeUrl: null, resumeName: null, modifiedDate: null },
  });

  return NextResponse.json({
    ok: true,
    resumeUrl: null,
    resumeName: null,
    modifiedDate: null,
  });
};
