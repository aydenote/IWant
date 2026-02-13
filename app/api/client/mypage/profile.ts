import { getServerSession } from 'next-auth';
import { prisma } from '../../../(lib)/prisma';
import { SaveProfileType } from '../../../(types)/common';
import { authOptions } from '../../auth/[...nextauth]/route';

export const saveProfile = async ({ techStack, name }: SaveProfileType) => {
  try {
    const res = await fetch('/api/server/mypage', {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ techStack, name }),
    });
    if (res.ok) {
      console.log('프로필 저장됨');
    }
  } catch (err) {
    console.log('프로필 저장 실패', err);
  }
};

export const getProfile = async () => {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (!userId) return null;

  const profile = await prisma.profile.findUnique({
    where: { userId },
    include: { user: true },
  });

  return profile;
};
