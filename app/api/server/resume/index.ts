import { prisma } from '../../../(lib)/prisma';
import { supabase } from '../../../(lib)/supabase';
import { checkAuth } from '../common';

export const getResumeServer = async () => {
  const { isAuth, userId } = await checkAuth();
  if (!isAuth) {
    return {
      ok: false,
      resumeUrl: null,
      resumeName: null,
      modifiedDate: null,
      message: '사용자 정보를 찾을 수 없습니다.',
    };
  }

  const profile = await prisma.profile.findUnique({ where: { userId } });
  if (!profile?.resumeUrl) {
    return {
      ok: false,
      resumeUrl: null,
      resumeName: null,
      modifiedDate: null,
      message: '저장된 이력서가 없습니다.',
    };
  }

  const { data, error } = await supabase.storage
    .from('resumes')
    .createSignedUrl(profile.resumeUrl, 60);
  if (error) {
    return {
      ok: false,
      resumeName: null,
      resumeUrl: null,
      message: error.message,
      modifiedDate: null,
    };
  }

  return {
    ok: true,
    resumeUrl: data.signedUrl,
    resumeName: profile.resumeName ?? null,
    modifiedDate: profile.modifiedDate ?? null,
    message: null,
  };
};
