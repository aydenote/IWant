import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '../../../(lib)/prisma';
import { authOptions } from '../../auth/[...nextauth]/route';

export const GET = async () => {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    return NextResponse.json(
      { ok: false, message: 'Unauthorized' },
      { status: 401 }
    );
  }

  const profile = await prisma.profile.findUnique({
    where: { userId },
    include: { user: true },
  });

  return NextResponse.json({
    ok: true,
    profile: profile ?? { techStack: [], resumeUrl: null, resumeName: null },
  });
};
