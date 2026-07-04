import {
  defaultLocale,
  getLocalizedPath,
  locales,
  type Locale,
} from '../_i18n/config';

const getLanguageUrls = (path: string, siteUrl?: string) => {
  const languageUrls = Object.fromEntries(
    locales.map((locale) => {
      const localizedPath = getLocalizedPath(locale, path);

      return [locale, siteUrl ? `${siteUrl}${localizedPath}` : localizedPath];
    })
  ) as Record<Locale, string>;

  return {
    ...languageUrls,
    'x-default': languageUrls[defaultLocale],
  };
};

export const getLocaleAlternates = (locale: Locale, path = '/') => {
  const languages = getLanguageUrls(path);

  return {
    canonical: languages[locale],
    languages,
  };
};

export const getAbsoluteLanguageAlternates = (
  siteUrl: string,
  path = '/'
) => getLanguageUrls(path, siteUrl);
