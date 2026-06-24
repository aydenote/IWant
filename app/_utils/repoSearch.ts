const REPO_SEARCH_FILTERS = [
  'good-first-issues:>0',
  'archived:false',
  'is:public',
];

export const RECOMMENDATION_SKILL_LIMIT = 3;

const LANGUAGE_SEARCH_TERMS: Record<string, string> = {
  javascript: 'language:JavaScript',
  typescript: 'language:TypeScript',
  html: 'language:HTML',
  css: 'language:CSS',
  python: 'language:Python',
  java: 'language:Java',
  go: 'language:Go',
  rust: 'language:Rust',
  ruby: 'language:Ruby',
  php: 'language:PHP',
  swift: 'language:Swift',
  kotlin: 'language:Kotlin',
  dart: 'language:Dart',
};

const TOPIC_SEARCH_TERMS: Record<string, string> = {
  react: 'topic:react',
  'react native': 'topic:react-native',
  nextjs: 'topic:nextjs',
  'next.js': 'topic:nextjs',
  vue: 'topic:vue',
  nuxt: 'topic:nuxt',
  angular: 'topic:angular',
  svelte: 'topic:svelte',
  solidjs: 'topic:solidjs',
  tailwind: 'topic:tailwindcss',
  tailwindcss: 'topic:tailwindcss',
};

const normalizeSkill = (skill: string) =>
  skill.trim().replace(/\s+/g, ' ').replace(/"/g, '');

const formatSearchTerm = (term: string) =>
  /\s/.test(term) ? `"${term}"` : term;

export const normalizeTechStack = (techStack: string[] = []) => {
  const seen = new Set<string>();

  return techStack
    .map(normalizeSkill)
    .filter((skill) => {
      if (!skill) return false;

      const key = skill.toLowerCase();
      if (seen.has(key)) return false;

      seen.add(key);
      return true;
    })
    .slice(0, RECOMMENDATION_SKILL_LIMIT);
};

export const toGithubSkillSearchTerm = (skill: string) => {
  const normalizedSkill = normalizeSkill(skill);
  const key = normalizedSkill.toLowerCase();

  return (
    LANGUAGE_SEARCH_TERMS[key] ??
    TOPIC_SEARCH_TERMS[key] ??
    formatSearchTerm(normalizedSkill)
  );
};

export const buildRepoSearchQuery = (searchTerm = '') =>
  [searchTerm.trim(), ...REPO_SEARCH_FILTERS].filter(Boolean).join(' ');
