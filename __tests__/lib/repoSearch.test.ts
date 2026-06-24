import {
  buildRepoSearchQuery,
  normalizeTechStack,
  toGithubSkillSearchTerm,
} from '../../app/_utils/repoSearch';

describe('repoSearch', () => {
  test('저장된 기술 스택은 공백 정리, 중복 제거, 개수 제한을 적용한다', () => {
    const result = normalizeTechStack([
      ' React ',
      'react',
      'TypeScript',
      'Next.js',
      'Vue',
    ]);

    expect(result).toEqual(['React', 'TypeScript', 'Next.js']);
  });

  test('GitHub에서 검색하기 좋은 기술 스택 검색어로 변환한다', () => {
    expect(toGithubSkillSearchTerm('TypeScript')).toBe('language:TypeScript');
    expect(toGithubSkillSearchTerm('React')).toBe('topic:react');
    expect(toGithubSkillSearchTerm('Next.js')).toBe('topic:nextjs');
  });

  test('별도 매핑이 없는 기술은 일반 검색어로 사용한다', () => {
    expect(toGithubSkillSearchTerm('React Query')).toBe('"React Query"');
  });

  test('레포 검색 필터를 함께 붙인다', () => {
    expect(buildRepoSearchQuery('topic:react')).toBe(
      'topic:react good-first-issues:>0 archived:false is:public'
    );
  });
});
