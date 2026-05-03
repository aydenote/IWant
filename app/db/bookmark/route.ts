import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { prisma } from '../../_lib/prisma';
import { authOptions } from '../../api/auth/[...nextauth]/route';
import { checkAuth } from '../../api/server/common';

export const POST = async (req: Request) => {
  const { isAuth, userId } = await checkAuth();

  if (!isAuth || !userId) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const body = await req.json();
  const {
    repoId,
    repoName,
    ownerName,
    imageSrc,
    stars,
    language,
    openIssues,
  } = body ?? {};

  if (typeof repoId !== 'number') {
    return NextResponse.json(
      { ok: false, message: 'Invalid repoId' },
      { status: 400 }
    );
  }
  if (!repoName || !ownerName || !stars || !language || !openIssues) {
    return NextResponse.json(
      { ok: false, message: 'Missing fields' },
      { status: 400 }
    );
  }

  await prisma.repoBookmark.upsert({
    where: { userId_repoId: { userId, repoId } },
    update: { repoName, ownerName, imageSrc, stars, language, openIssues },
    create: {
      userId,
      repoId,
      repoName,
      ownerName,
      imageSrc: imageSrc ?? null,
      stars,
      language,
      openIssues,
    },
  });

  return NextResponse.json({ ok: true });
};

export const DELETE = async (req: Request) => {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (!userId) return NextResponse.json({ ok: false }, { status: 401 });

  const { repoId } = await req.json();
  if (typeof repoId !== 'number') {
    return NextResponse.json(
      { ok: false, message: 'Invalid repoId' },
      { status: 400 }
    );
  }

  await prisma.repoBookmark.deleteMany({
    where: { userId, repoId },
  });

  return NextResponse.json({ ok: true });
};
