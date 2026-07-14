'use client';

import { useSession } from 'next-auth/react';
import { getLocalizedPath } from '../_i18n/config';
import { getMessages } from '../_i18n/messages';
import { useLocale } from './useLocale';

interface UseRepoCardParams {
  repoId: number;
  repoName: string;
  imageSrc?: string | null;
}

export const useRepoCard = ({
  repoId,
  repoName,
  imageSrc,
}: UseRepoCardParams) => {
  const locale = useLocale();
  const messages = getMessages(locale);
  const { status } = useSession();
  const repoHref = getLocalizedPath(locale, `/repo/${repoId}`);
  const safeImageSrc = imageSrc?.trim() || null;

  return {
    detailLinkLabel: `${repoName} ${messages.repoCard.details}`,
    isAuthed: status === 'authenticated',
    messages,
    repoHref,
    safeImageSrc,
  };
};
