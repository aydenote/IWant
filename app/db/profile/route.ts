import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '../../(lib)/prisma';
import { authOptions } from '../../apis/auth/[...nextauth]/route';

export const PUT = async (req: Request) => {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;

  if (!email) {
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
