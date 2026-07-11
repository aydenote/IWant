const IMAGE_DOMAINS = ['static.wanted.co.kr', 'image.wanted.co.kr'];
const IMAGE_REMOTE_PATTERNS = [
  {
    protocol: 'https',
    hostname: '*.wanted.co.kr',
  },
  {
    protocol: 'https',
    hostname: 'avatars.githubusercontent.com',
  },
];

const isProduction = process.env.NODE_ENV === 'production';

const contentSecurityPolicy = [
  "default-src 'self'",
  [
    "script-src 'self' 'unsafe-inline'",
    isProduction ? '' : 'https://va.vercel-scripts.com',
    isProduction ? '' : "'unsafe-eval'",
  ]
    .filter(Boolean)
    .join(' '),
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  [
    "connect-src 'self'",
    'https://api.github.com',
    'https://translation.googleapis.com',
    isProduction ? '' : 'ws: wss:',
  ]
    .filter(Boolean)
    .join(' '),
  "media-src 'self' https:",
  "worker-src 'self' blob:",
  "manifest-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  isProduction ? 'upgrade-insecure-requests' : '',
]
  .filter(Boolean)
  .join('; ');

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: contentSecurityPolicy,
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), payment=()',
  },
  ...(isProduction
    ? [
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=63072000; includeSubDomains; preload',
        },
      ]
    : []),
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: IMAGE_DOMAINS,
    remotePatterns: IMAGE_REMOTE_PATTERNS,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};

module.exports = nextConfig;
