'use client';

import { useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { getLocalizedPath } from '../_i18n/config';
import { getMessages } from '../_i18n/messages';
import { useLocale } from './useLocale';

export const useAuthMenu = () => {
  const locale = useLocale();
  const messages = getMessages(locale);
  const { status, data: session } = useSession();
  const [open, setOpen] = useState(false);
  const homeHref = getLocalizedPath(locale);

  const menuList = [
    {
      label: messages.navigation.repositories,
      href: homeHref,
    },
    {
      label: messages.navigation.myPage,
      href: getLocalizedPath(locale, '/mypage'),
    },
    {
      label: messages.navigation.bookmarks,
      href: getLocalizedPath(locale, '/bookmark'),
    },
  ];

  return {
    isAuthed: status === 'authenticated',
    isSignedIn: Boolean(session),
    menuList,
    messages,
    open,
    signInWithKakao: () => signIn('kakao'),
    signOutToHome: () => signOut({ callbackUrl: homeHref }),
    toggleOpen: () => setOpen((value) => !value),
  };
};
