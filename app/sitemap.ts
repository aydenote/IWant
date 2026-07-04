import type { MetadataRoute } from 'next';
import { getSiteUrl } from './_utils/siteUrl';

const PUBLIC_SEARCH_SKILLS = ['react', 'typescript', 'nextjs'];

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const now = new Date();

  return [
    {
      url: `${siteUrl}/ko`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1,
    },
    ...PUBLIC_SEARCH_SKILLS.map((skill) => ({
      url: `${siteUrl}/ko/search/${skill}`,
      lastModified: now,
      changeFrequency: 'daily' as const,
      priority: 0.8,
    })),
  ];
}
