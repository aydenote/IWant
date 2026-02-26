import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export const checkAuth = async () => {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  const email = session?.user?.email;

  if (!userId || !email) {
    return { isAuth: false };
  }
  return { isAuth: true, userId, email };
};
