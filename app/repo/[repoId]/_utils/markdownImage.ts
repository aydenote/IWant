export interface MarkdownImageResolverParams {
  defaultBranch: string;
  repoFullName: string;
  sourcePath?: string | null;
}

export const isAbsoluteUrl = (src: string) =>
  /^https?:\/\//i.test(src) || src.startsWith('//') || src.startsWith('data:');

export const getDirectoryPath = (path?: string | null) => {
  if (!path || !path.includes('/')) return '';
  return path.split('/').slice(0, -1).join('/');
};

export const normalizeRelativePath = (path: string) => {
  const parts: string[] = [];

  path.split('/').forEach((part) => {
    if (!part || part === '.') return;
    if (part === '..') {
      parts.pop();
      return;
    }
    parts.push(part);
  });

  return parts.join('/');
};

export const resolveMarkdownImageSrc = ({
  src,
  sourcePath,
  repoFullName,
  defaultBranch,
}: MarkdownImageResolverParams & { src?: string }) => {
  if (!src || isAbsoluteUrl(src)) return src;

  const normalizedSrc = src.startsWith('/') ? src.slice(1) : src;
  const basePath = src.startsWith('/') ? '' : getDirectoryPath(sourcePath);
  const imagePath = normalizeRelativePath(
    [basePath, normalizedSrc].filter(Boolean).join('/')
  );

  return `https://raw.githubusercontent.com/${repoFullName}/${defaultBranch}/${imagePath}`;
};

export const resolveMarkdownSrcSet = ({
  srcSet,
  sourcePath,
  repoFullName,
  defaultBranch,
}: MarkdownImageResolverParams & { srcSet?: string }) => {
  if (!srcSet) return srcSet;

  return srcSet
    .split(',')
    .map((candidate) => {
      const trimmedCandidate = candidate.trim();
      const [, src = '', descriptor = ''] =
        trimmedCandidate.match(/^(\S+)(.*)$/) ?? [];
      const resolvedSrc = resolveMarkdownImageSrc({
        src,
        sourcePath,
        repoFullName,
        defaultBranch,
      });

      return [resolvedSrc, descriptor.trim()].filter(Boolean).join(' ');
    })
    .join(', ');
};

export const toPositiveNumber = (value: unknown) => {
  if (typeof value === 'number') return value > 0 ? value : null;
  if (typeof value !== 'string') return null;

  const parsedValue = Number.parseInt(value, 10);

  return Number.isFinite(parsedValue) && parsedValue > 0 ? parsedValue : null;
};

export const isBadgeLikeMarkdownImage = ({
  src,
  alt,
}: {
  src: string;
  alt?: string;
}) => {
  const normalizedSrc = src.toLowerCase();
  const normalizedAlt = alt?.toLowerCase() ?? '';
  const badgeSrcIndicators = [
    'shields.io',
    'badgen.net',
    'badge.svg',
    '/badge/',
    'codecov.io',
    'coveralls.io',
    'travis-ci',
  ];
  const badgeAltIndicators = [
    'badge',
    'build',
    'coverage',
    'license',
    'version',
    'status',
    'npm',
    'download',
  ];

  return (
    badgeSrcIndicators.some((indicator) =>
      normalizedSrc.includes(indicator)
    ) ||
    badgeAltIndicators.some((indicator) =>
      normalizedAlt.includes(indicator)
    )
  );
};
