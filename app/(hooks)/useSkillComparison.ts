import { FRONTEND_SKILL_KEYWORDS } from '../(constants)/skills';
import { JobDetailResponse, ProfileResponse } from '../(types)/apis';

export const extractSkillKeywords = (job: JobDetailResponse): string[] => {
  const jobDescription = [
    job.detail.main_tasks,
    job.detail.requirements,
    job.detail.preferred_points,
  ].join(' ');
  const foundKeywords = new Set<string>();
  const sortedKeywords = [...FRONTEND_SKILL_KEYWORDS].sort(
    (a, b) => b.length - a.length
  );

  const escapeRegExp = (keyword: string) => {
    return keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  };

  sortedKeywords.forEach((keyword) => {
    const pattern = new RegExp(
      `(?<=^|[^a-zA-Z0-9])${escapeRegExp(keyword)}(?=[^a-zA-Z0-9]|$)`,
      'gi'
    );

    if (pattern.test(jobDescription)) {
      const originalKeyword = FRONTEND_SKILL_KEYWORDS.find(
        (skill) => skill.toLowerCase() === keyword.toLowerCase()
      );
      foundKeywords.add(originalKeyword || keyword);
    }
  });

  return Array.from(foundKeywords);
};

export const calculateSkillMatchRate = (
  extractedSkills: string[],
  mySkills: string[] = [],
  options: { caseSensitive?: boolean } = { caseSensitive: false }
) => {
  if (extractedSkills.length === 0 || !mySkills) {
    return {
      matchRate: 0,
      matchedSkills: [],
      missingSkills: [],
      totalRequired: 0,
      totalMatched: 0,
    };
  }

  const normalizedMySkills = options.caseSensitive
    ? mySkills
    : mySkills.map((skill) => skill.toLowerCase());

  const matchedSkills = extractedSkills.filter((skill) => {
    const normalizedSkill = options.caseSensitive ? skill : skill.toLowerCase();
    return normalizedMySkills.includes(normalizedSkill);
  });

  const missingSkills = extractedSkills.filter((skill) => {
    const normalizedSkill = options.caseSensitive ? skill : skill.toLowerCase();
    return !normalizedMySkills.includes(normalizedSkill);
  });

  const matchRate = (matchedSkills.length / extractedSkills.length) * 100;

  return {
    matchRate: Math.round(matchRate * 100) / 100,
    matchedSkills,
    missingSkills,
    totalRequired: extractedSkills.length,
    totalMatched: matchedSkills.length,
  };
};
