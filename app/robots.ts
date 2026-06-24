import type { MetadataRoute } from 'next';
import { getSiteUrl } from './_utils/siteUrl';

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();

  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/search/', '/repo/'],
      disallow: ['/api/', '/mypage', '/bookmark'],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
