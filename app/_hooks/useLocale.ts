'use client';

import { useParams } from 'next/navigation';
import { defaultLocale, isLocale, type Locale } from '../_i18n/config';

export const useLocale = (): Locale => {
  const params = useParams<{ locale?: string | string[] }>();
  const locale = Array.isArray(params.locale) ? params.locale[0] : params.locale;

  return locale && isLocale(locale) ? locale : defaultLocale;
};
