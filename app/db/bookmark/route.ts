import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { prisma } from '../../(lib)/prisma';
import { authOptions } from '../../api/auth/[...nextauth]/route';
import { checkAuth } from '../../api/server/common';

export const POST = async (req: Request) => {
  const { isAuth, userId } = await checkAuth();

  if (!isAuth || !userId) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const body = await req.json();
  const {
    jobId,
    jobName,
    companyName,
    imageSrc,
    place,
    career,
    employmentType,
  } = body ?? {};

  if (typeof jobId !== 'number') {
    return NextResponse.json(
      { ok: false, message: 'Invalid jobId' },
      { status: 400 }
    );
  }
  if (!jobName || !companyName || !place || !career || !employmentType) {
    return NextResponse.json(
      { ok: false, message: 'Missing fields' },
      { status: 400 }
    );
  }

  await prisma.favorite.upsert({
    where: { userId_jobId: { userId, jobId } },
    update: { jobName, companyName, imageSrc, place, career, employmentType },
    create: {
      userId,
      jobId,
      jobName,
      companyName,
      imageSrc: imageSrc ?? null,
      place,
      career,
      employmentType,
    },
  });

  return NextResponse.json({ ok: true });
};

export const DELETE = async (req: Request) => {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (!userId) return NextResponse.json({ ok: false }, { status: 401 });

  const { jobId } = await req.json();
  if (typeof jobId !== 'number') {
    return NextResponse.json(
      { ok: false, message: 'Invalid jobId' },
      { status: 400 }
    );
  }

  await prisma.favorite.deleteMany({
    where: { userId, jobId },
  });

  return NextResponse.json({ ok: true });
};
