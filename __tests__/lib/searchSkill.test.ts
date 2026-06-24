import {
  toSearchSkillLabel,
  toSearchSkillSlug,
} from '../../app/_utils/searchSkill';

describe('searchSkill', () => {
  test('검색어를 URL에 쓰기 좋은 slug로 변환한다', () => {
    expect(toSearchSkillSlug('React')).toBe('react');
    expect(toSearchSkillSlug('React Native')).toBe('react-native');
    expect(toSearchSkillSlug('Next.js')).toBe('nextjs');
  });

  test('알려진 기술 slug는 표시용 이름으로 복원한다', () => {
    expect(toSearchSkillLabel('typescript')).toBe('TypeScript');
    expect(toSearchSkillLabel('nextjs')).toBe('Next.js');
    expect(toSearchSkillLabel('react-native')).toBe('React Native');
  });

  test('알려지지 않은 slug는 title case로 표시한다', () => {
    expect(toSearchSkillLabel('react-query')).toBe('React Query');
  });

  test('잘못 인코딩된 slug도 예외 없이 처리한다', () => {
    expect(toSearchSkillSlug('%E0%A4%A')).toBe('e0-a4-a');
  });
});
