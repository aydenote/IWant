import { NextResponse } from 'next/server';
import { prisma } from '../../(lib)/prisma';
import { checkAuth } from '../../api/server/common';

export const PUT = async (req: Request) => {
  const { isAuth, email } = await checkAuth();

  if (!isAuth) {
    return NextResponse.json(
      { ok: false, message: 'Unauthorized' },
      { status: 401 }
    );
  }

  const { name, techStack } = await req.json();

  if (techStack && !Array.isArray(techStack)) {
    return NextResponse.json(
      { ok: false, message: 'Invalid techStack' },
      { status: 400 }
    );
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json(
      { ok: false, message: 'User not found' },
      { status: 404 }
    );
  }

  await prisma.$transaction([
    prisma.user.update({
      where: { id: user.id },
      data: { name },
    }),
    prisma.profile.upsert({
      where: { userId: user.id },
      update: { techStack },
      create: { userId: user.id, techStack },
    }),
  ]);

  return NextResponse.json({ ok: true });
};
