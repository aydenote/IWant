import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import { prisma } from '../../../(lib)/prisma';

export const getProfileServer = async () => {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (!userId) return null;

  const profile = await prisma.profile.findUnique({
    where: { userId },
    include: { user: true },
  });

  return profile;
};
