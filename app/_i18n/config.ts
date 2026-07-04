export const locales = ['ko', 'en'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'ko';

export const localeCookieName = 'iwant-locale';

export const localeConfig = {
  ko: {
    label: '한국어',
    languageTag: 'ko-KR',
    openGraphLocale: 'ko_KR',
  },
  en: {
    label: 'English',
    languageTag: 'en-US',
    openGraphLocale: 'en_US',
  },
} as const satisfies Record<
  Locale,
  {
    label: string;
    languageTag: string;
    openGraphLocale: string;
  }
>;

export const isLocale = (value: string): value is Locale =>
  locales.includes(value as Locale);

export const getLocalizedPath = (locale: Locale, path = '/') => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  return normalizedPath === '/' ? `/${locale}` : `/${locale}${normalizedPath}`;
};

export const replacePathLocale = (path: string, locale: Locale) => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const segments = normalizedPath.split('/');

  if (isLocale(segments[1])) {
    segments[1] = locale;
    return segments.join('/');
  }

  return getLocalizedPath(locale, normalizedPath);
};

export const getPreferredLocale = (acceptLanguage: string | null): Locale => {
  if (!acceptLanguage) return defaultLocale;

  const preferredLocale = acceptLanguage
    .split(',')
    .map((entry, index) => {
      const [languageTag, ...parameters] = entry.trim().split(';');
      const locale = languageTag.toLowerCase().split('-')[0];
      const qualityParameter = parameters.find((parameter) =>
        parameter.trim().startsWith('q=')
      );
      const quality = qualityParameter
        ? Number(qualityParameter.trim().slice(2))
        : 1;

      return {
        locale,
        quality: Number.isFinite(quality) ? quality : 0,
        index,
      };
    })
    .filter(
      (candidate) => candidate.quality > 0 && isLocale(candidate.locale)
    )
    .sort(
      (left, right) =>
        right.quality - left.quality || left.index - right.index
    )[0]?.locale;

  return preferredLocale && isLocale(preferredLocale)
    ? preferredLocale
    : defaultLocale;
};
