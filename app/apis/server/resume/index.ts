import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import { prisma } from '../../../(lib)/prisma';
import { supabase } from '../../../(lib)/supabase';

export const getResumeServer = async () => {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (!userId) return null;

  const profile = await prisma.profile.findUnique({ where: { userId } });
  if (!profile?.resumeUrl) {
    return { ok: true, resumeUrl: null, resumeName: null };
  }

  const { data, error } = await supabase.storage
    .from('resumes')
    .createSignedUrl(profile.resumeUrl, 60);
  if (error) {
    return { ok: false, message: error.message };
  }

  return {
    ok: true,
    resumeUrl: data.signedUrl,
    resumeName: profile.resumeName ?? null,
  };
};
