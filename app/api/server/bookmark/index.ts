import { prisma } from '../../../(lib)/prisma';
import { checkAuth } from '../common';

export const getBookmarkServer = async () => {
  const { isAuth, userId } = await checkAuth();

  if (!isAuth) return [];

  return prisma.favorite.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });
};
