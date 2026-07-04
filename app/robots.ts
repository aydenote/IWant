import type { MetadataRoute } from 'next';
import { getSiteUrl } from './_utils/siteUrl';

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/ko/mypage',
        '/en/mypage',
        '/ko/bookmark',
        '/en/bookmark',
      ],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
