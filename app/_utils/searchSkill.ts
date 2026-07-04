const SKILL_LABELS: Record<string, string> = {
  javascript: 'JavaScript',
  typescript: 'TypeScript',
  html: 'HTML',
  css: 'CSS',
  python: 'Python',
  java: 'Java',
  go: 'Go',
  rust: 'Rust',
  ruby: 'Ruby',
  php: 'PHP',
  swift: 'Swift',
  kotlin: 'Kotlin',
  dart: 'Dart',
  react: 'React',
  'react-native': 'React Native',
  nextjs: 'Next.js',
  'next-js': 'Next.js',
  vue: 'Vue',
  nuxt: 'Nuxt',
  angular: 'Angular',
  svelte: 'Svelte',
  solidjs: 'SolidJS',
  tailwind: 'Tailwind CSS',
  tailwindcss: 'Tailwind CSS',
};

export const PUBLIC_SEARCH_SKILL_SLUGS = [
  'javascript',
  'typescript',
  'html',
  'css',
  'python',
  'java',
  'go',
  'rust',
  'ruby',
  'php',
  'swift',
  'kotlin',
  'dart',
  'react',
  'react-native',
  'nextjs',
  'vue',
  'nuxt',
  'angular',
  'svelte',
  'solidjs',
  'tailwindcss',
] as const;

const safeDecodeURIComponent = (value: string) => {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
};

const normalizeSearchText = (value: string) =>
  safeDecodeURIComponent(value)
    .trim()
    .replace(/[./]+$/g, '')
    .replace(/\s+/g, ' ');

const toTitleCase = (value: string) =>
  value
    .split(/[-\s]+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

export const toSearchSkillSlug = (skill: string) => {
  const normalizedSkill = normalizeSearchText(skill);

  return normalizedSkill
    .toLowerCase()
    .replace(/\./g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const toSearchSkillLabel = (slug: string) => {
  const normalizedSlug = toSearchSkillSlug(slug);

  return SKILL_LABELS[normalizedSlug] ?? toTitleCase(normalizedSlug);
};
