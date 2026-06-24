const SKILL_LABELS: Record<string, string> = {
  javascript: 'JavaScript',
  typescript: 'TypeScript',
  react: 'React',
  'react-native': 'React Native',
  nextjs: 'Next.js',
  'next-js': 'Next.js',
  vue: 'Vue',
  nuxt: 'Nuxt',
  angular: 'Angular',
  svelte: 'Svelte',
  solidjs: 'SolidJS',
  tailwind: 'TailwindCSS',
  tailwindcss: 'TailwindCSS',
};

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
