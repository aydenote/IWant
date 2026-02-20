import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import { prisma } from '../../../(lib)/prisma';

export const getBookmarkServer = async () => {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) return [];

  return prisma.favorite.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });
};
