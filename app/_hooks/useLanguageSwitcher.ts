'use client';

import { usePathname } from 'next/navigation';
import {
  localeConfig,
  localeCookieName,
  locales,
  replacePathLocale,
  type Locale,
} from '../_i18n/config';
import { getMessages } from '../_i18n/messages';
import { useLocale } from './useLocale';

export const useLanguageSwitcher = () => {
  const locale = useLocale();
  const messages = getMessages(locale);
  const pathname = usePathname();

  const switchLocale = (nextLocale: Locale) => {
    if (nextLocale === locale) return;

    const nextPath = replacePathLocale(pathname, nextLocale);
    document.cookie = `${localeCookieName}=${nextLocale}; Max-Age=31536000; Path=/; SameSite=Lax`;
    window.location.assign(
      `${nextPath}${window.location.search}${window.location.hash}`
    );
  };

  return {
    languageLabel: messages.navigation.language,
    localeOptions: locales.map((candidate) => ({
      isActive: candidate === locale,
      label: localeConfig[candidate].label,
      text: candidate.toUpperCase(),
      value: candidate,
    })),
    switchLocale,
  };
};
