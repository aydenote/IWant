import { JobType } from '../../../(types)/common';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import { prisma } from '../../../(lib)/prisma';

export const getBookmark = async () => {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) return [];

  return prisma.favorite.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });
};

export const addBookmark = async (job: JobType) => {
  try {
    const res = await fetch(`/api/server/bookmark`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(job),
    });
    return res.ok;
  } catch (err) {
    console.error(err);
  }
};

export const deleteBookmark = async (jobId: number) => {
  try {
    const res = await fetch('/api/server/bookmark', {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ jobId }),
    });
    return res.ok;
  } catch (err) {
    console.error('북마크 제거 실패', err);
  }
};
