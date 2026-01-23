const IMAGE_DOMAINS = ['static.wanted.co.kr', 'image.wanted.co.kr'];
const IMAGE_REMOTE_PATTERNS = [
  {
    protocol: 'https',
    hostname: '*.wanted.co.kr',
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
