import type { MetadataRoute } from 'next';
import { locales } from './_i18n/config';
import { getAbsoluteLanguageAlternates } from './_utils/localeSeo';
import { getSiteUrl } from './_utils/siteUrl';

const PUBLIC_SEARCH_SKILLS = ['react', 'typescript', 'nextjs'];

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const now = new Date();
  const homeAlternates = getAbsoluteLanguageAlternates(siteUrl);

  return [
    ...locales.map((locale) => ({
      url: `${siteUrl}/${locale}`,
      lastModified: now,
      changeFrequency: 'daily' as const,
      priority: 1,
      alternates: {
        languages: homeAlternates,
      },
    })),
    ...PUBLIC_SEARCH_SKILLS.flatMap((skill) => {
      const path = `/search/${skill}`;
      const languages = getAbsoluteLanguageAlternates(siteUrl, path);

      return locales.map((locale) => ({
        url: `${siteUrl}/${locale}${path}`,
        lastModified: now,
        changeFrequency: 'daily' as const,
        priority: 0.8,
        alternates: {
          languages,
        },
      }));
    }),
  ];
}
