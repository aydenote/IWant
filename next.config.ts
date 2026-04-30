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

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: IMAGE_DOMAINS,
    remotePatterns: IMAGE_REMOTE_PATTERNS,
  },
};

module.exports = nextConfig;
