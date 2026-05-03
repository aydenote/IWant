import { prisma } from '../../../_lib/prisma';
import { checkAuth } from '../common';

export const getBookmarkServer = async () => {
  const { isAuth, userId } = await checkAuth();

  if (!isAuth) return [];

  return prisma.repoBookmark.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });
};
