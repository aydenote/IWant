import { prisma } from '../../../(lib)/prisma';
import { checkAuth } from '../common';

export const getProfileServer = async () => {
  const { isAuth, userId } = await checkAuth();

  if (!isAuth) return null;

  const profile = await prisma.profile.findUnique({
    where: { userId },
    include: { user: true },
  });

  return profile;
};
