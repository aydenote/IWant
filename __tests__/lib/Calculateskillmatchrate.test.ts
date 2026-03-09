import {
  calculateSkillMatchRate,
  extractSkillKeywords,
} from '../../app/(hooks)/useSkillComparison';
import '@testing-library/jest-dom';
import { JobDetailResponse } from '../../app/(types)/apis';

describe('스킬 매칭 계산 함수', () => {
  test('매칭되는 스킬이 없으면 매칭률은 0이 반환된다.', () => {
    const result = calculateSkillMatchRate(
      ['React', 'TypeScript'],
      ['Vue', 'Python']
    );
    expect(result.matchRate).toBe(0);
  });

  test('모든 스킬이 매칭되면 매칭률은 100이 반환된다.', () => {
    const result = calculateSkillMatchRate(
      ['React', 'TypeScript'],
      ['React', 'TypeScript']
    );
    expect(result.matchRate).toBe(100);
  });

  test.each([
    {
      description: '1개 매칭',
      extractedSkills: ['React', 'TypeScript', 'Next.js'],
      mySkills: ['React'],
      expectedMatched: ['React'],
      expectedMissing: ['TypeScript', 'Next.js'],
    },
    {
      description: '2개 매칭',
      extractedSkills: ['React', 'TypeScript', 'Next.js', 'Vue'],
      mySkills: ['React', 'TypeScript'],
      expectedMatched: ['React', 'TypeScript'],
      expectedMissing: ['Next.js', 'Vue'],
    },
    {
      description: '내 스킬이 더 많은 경우',
      extractedSkills: ['React', 'TypeScript'],
      mySkills: ['React', 'TypeScript', 'Next.js'],
      expectedMatched: ['React', 'TypeScript'],
      expectedMissing: [],
    },
  ])(
    '일부 스킬만 매칭되면 올바른 매칭률과 매칭된 스킬 배열, 매칭되지 않은 배열이 반환된다. - $description',
    ({ extractedSkills, mySkills, expectedMatched, expectedMissing }) => {
      const expected =
        Math.round(
          (expectedMatched.length / extractedSkills.length) * 100 * 100
        ) / 100;

      const result = calculateSkillMatchRate(extractedSkills, mySkills);

      expect(result.matchRate).toBe(expected);
      expect(result.matchedSkills).toEqual(expectedMatched);
      expect(result.missingSkills).toEqual(expectedMissing);
    }
  );
  test('추출된 스킬이 비어 있으면 기본값이 반환된다.', () => {
    const result = calculateSkillMatchRate([], ['React', 'TypeScript']);
    expect(result).toEqual({
      matchRate: 0,
      matchedSkills: [],
      missingSkills: [],
      totalRequired: 0,
      totalMatched: 0,
    });
  });
});

describe('extractSkillKeywords', () => {
  const makeJob = (text: string) =>
    ({
      detail: {
        main_tasks: text,
        requirements: '',
        preferred_points: '',
      },
    }) as JobDetailResponse;

  test('공고 본문에 포함된 기술 키워드가 추출된다.', () => {
    const job = makeJob('React와 TypeScript를 사용한 프론트엔드 개발');
    const result = extractSkillKeywords(job);

    expect(result).toContain('React');
    expect(result).toContain('TypeScript');
  });

  test('공고 본문에 없는 키워드는 추출되지 않는다.', () => {
    const job = makeJob('Java와 Spring을 사용한 백엔드 개발');
    const result = extractSkillKeywords(job);

    expect(result).not.toContain('Java');
    expect(result).not.toContain('Spring');
  });

  test('main_tasks, requirements, preferred_points 세 필드 모두에서 키워드를 추출한다', () => {
    const job = {
      detail: {
        main_tasks: 'React를 활용한 개발',
        requirements: 'TypeScript 경험자',
        preferred_points: 'Next.js 경험 우대',
      },
    } as JobDetailResponse;
    const result = extractSkillKeywords(job);

    expect(result).toContain('React');
    expect(result).toContain('TypeScript');
    expect(result).toContain('Next.js');
  });

  test('동일한 키워드가 여러 번 등장해도 중복 없이 반환한다', () => {
    const job = makeJob('React 개발자, React 경험자 우대, React 필수');
    const result = extractSkillKeywords(job);
    const reactCount = result.filter((s) => s === 'React').length;

    expect(reactCount).toBe(1);
  });

  test('공고 본문이 비어 있으면 빈 배열을 반환한다', () => {
    const job = makeJob('');
    const result = extractSkillKeywords(job);

    expect(result).toHaveLength(0);
  });
});
