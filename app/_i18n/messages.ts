import type { Locale } from './config';

export interface AppMessages {
  metadata: {
    home: {
      title: string;
      description: string;
    };
    search: {
      titleTemplate: string;
      descriptionTemplate: string;
    };
    repo: {
      fallbackTitle: string;
      fallbackDescription: string;
      titleTemplate: string;
      summaryFallbackTemplate: string;
      descriptionTemplate: string;
      topicsTemplate: string;
    };
  };
  navigation: {
    repositories: string;
    myPage: string;
    bookmarks: string;
    signIn: string;
    signOut: string;
    language: string;
  };
  hero: {
    title: string;
    description: string;
    searchPlaceholder: string;
    reset: string;
  };
  repoList: {
    searchResults: string;
    recommended: string;
    all: string;
    loading: string;
    skillHeadingTemplate: string;
  };
  repoCard: {
    ownerImageAlt: string;
    details: string;
    unknownLanguage: string;
    stars: string;
    openIssues: string;
  };
  repoDetail: {
    backToList: string;
    viewOnGitHub: string;
    readmeUnavailable: string;
    contributionIssues: string;
    noLabels: string;
    noContributionIssues: string;
    contributionGuide: string;
    contributionGuideUnavailable: string;
    original: string;
    korean: string;
    english: string;
    translating: string;
    translationFailed: string;
    skillMatchTitle: string;
    mySkills: string;
    registerSkills: string;
    matchedSkills: string;
    noMatchedSkills: string;
    repoSkills: string;
    allSkillsMatched: string;
    primaryLanguage: string;
    unknown: string;
    matchRate: string;
  };
  errors: {
    repoLoadTitle: string;
    invalidRepoId: string;
    repoLoadDescription: string;
  };
  bookmark: {
    added: string;
    addFailed: string;
    removed: string;
    removeFailed: string;
  };
}

export const messages = {
  ko: {
    metadata: {
      home: {
        title: '기술 스택 기반 오픈소스 레포 추천 | IWant',
        description:
          '기술 스택에 맞는 오픈소스 레포와 good first issue를 확인하세요.',
      },
      search: {
        titleTemplate: '{skill} 오픈소스 기여 레포 추천 | IWant',
        descriptionTemplate:
          '{skill}로 기여하기 좋은 오픈소스 레포와 good first issue를 확인하세요.',
      },
      repo: {
        fallbackTitle: '오픈소스 레포 상세 | IWant',
        fallbackDescription:
          '오픈소스 레포의 README, 기여 가이드, good first issue를 확인해보세요.',
        titleTemplate: '{repo} 오픈소스 기여 이슈 | IWant',
        summaryFallbackTemplate:
          '{language} 기반으로 기여할 수 있는 GitHub 레포입니다.',
        descriptionTemplate:
          '{summary} 열린 이슈 {openIssues}개와 README 정보를 IWant에서 확인해보세요.{topics}',
        topicsTemplate: ' 주요 토픽: {topics}.',
      },
    },
    navigation: {
      repositories: '오픈소스 레포',
      myPage: '마이페이지',
      bookmarks: '관심 레포',
      signIn: '로그인',
      signOut: '로그아웃',
      language: '언어 선택',
    },
    hero: {
      title: '기여할 오픈소스 레포를 찾아보세요',
      description:
        '내 기술스택과 맞는 언어, 이슈, README를 한 곳에서 확인하세요',
      searchPlaceholder: '레포, 언어, 토픽을 검색하세요...',
      reset: '초기화',
    },
    repoList: {
      searchResults: '검색 결과',
      recommended: '관심 기술 레포',
      all: '전체 레포',
      loading: '불러오는 중...',
      skillHeadingTemplate: '{skill} 오픈소스 레포',
    },
    repoCard: {
      ownerImageAlt: '레포지토리 소유자 이미지',
      details: '자세히 보기',
      unknownLanguage: '언어 정보 없음',
      stars: '스타',
      openIssues: '열린 이슈',
    },
    repoDetail: {
      backToList: '목록으로',
      viewOnGitHub: 'GitHub에서 보기',
      readmeUnavailable: 'README를 불러올 수 없습니다.',
      contributionIssues: '기여 이슈',
      noLabels: '없음',
      noContributionIssues:
        'good first issue 또는 help wanted 이슈가 없습니다.',
      contributionGuide: '기여 방법',
      contributionGuideUnavailable:
        'CONTRIBUTING 문서를 찾을 수 없습니다. README와 이슈 내용을 확인해 주세요.',
      original: '원문',
      korean: '한국어',
      english: 'English',
      translating: '번역 중...',
      translationFailed: '번역에 실패했습니다. 잠시 후 다시 시도해 주세요.',
      skillMatchTitle: '레포 언어 매칭 결과',
      mySkills: '보유기술',
      registerSkills: '프로필에서 기술을 등록해 주세요.',
      matchedSkills: '매칭기술',
      noMatchedSkills: '매칭된 기술이 없습니다.',
      repoSkills: '레포 사용 기술',
      allSkillsMatched: '현재 기술스택과 모두 매칭됩니다.',
      primaryLanguage: '주 언어',
      unknown: '알 수 없음',
      matchRate: '매칭률',
    },
    errors: {
      repoLoadTitle: '레포 정보를 불러오지 못했습니다.',
      invalidRepoId: '올바른 레포 ID로 다시 접근해 주세요.',
      repoLoadDescription:
        'GitHub API 응답 또는 배포 환경 변수를 확인한 뒤 다시 시도해 주세요.',
    },
    bookmark: {
      added: '관심 레포로 저장되었습니다.',
      addFailed: '관심 레포 저장에 실패했습니다.',
      removed: '관심 레포에서 제거되었습니다.',
      removeFailed: '관심 레포 제거에 실패했습니다.',
    },
  },
  en: {
    metadata: {
      home: {
        title: 'Open Source Repository Finder | IWant',
        description:
          'Discover open source repositories and good first issues based on your tech stack.',
      },
      search: {
        titleTemplate:
          '{skill} Open Source Repositories with Good First Issues | IWant',
        descriptionTemplate:
          'Discover beginner-friendly {skill} repositories, good first issues, and contribution opportunities.',
      },
      repo: {
        fallbackTitle: 'Open Source Repository Details | IWant',
        fallbackDescription:
          'Explore open source repository READMEs, contribution guides, and good first issues.',
        titleTemplate:
          '{repo} Open Source Issues & Contribution Guide | IWant',
        summaryFallbackTemplate:
          'An open source GitHub repository built with {language}.',
        descriptionTemplate:
          '{summary} Explore {openIssues} open issues, README details, and contribution opportunities on IWant.{topics}',
        topicsTemplate: ' Topics: {topics}.',
      },
    },
    navigation: {
      repositories: 'Open Source Repositories',
      myPage: 'My Page',
      bookmarks: 'Bookmarks',
      signIn: 'Sign in',
      signOut: 'Sign out',
      language: 'Select language',
    },
    hero: {
      title: 'Find an open source repository to contribute to',
      description:
        'Explore languages, issues, and READMEs that match your tech stack',
      searchPlaceholder: 'Search repositories, languages, or topics...',
      reset: 'Reset',
    },
    repoList: {
      searchResults: 'Search results',
      recommended: 'Repositories for your skills',
      all: 'All repositories',
      loading: 'Loading...',
      skillHeadingTemplate: '{skill} open source repositories',
    },
    repoCard: {
      ownerImageAlt: 'Repository owner avatar',
      details: 'View details',
      unknownLanguage: 'Language unknown',
      stars: 'stars',
      openIssues: 'open issues',
    },
    repoDetail: {
      backToList: 'Back to list',
      viewOnGitHub: 'View on GitHub',
      readmeUnavailable: 'README is unavailable.',
      contributionIssues: 'Contribution Issues',
      noLabels: 'None',
      noContributionIssues:
        'No good first issue or help wanted issues are currently available.',
      contributionGuide: 'Contribution Guide',
      contributionGuideUnavailable:
        'No CONTRIBUTING guide was found. Check the README and issues for guidance.',
      original: 'Original',
      korean: 'Korean',
      english: 'English',
      translating: 'Translating...',
      translationFailed: 'Translation failed. Please try again later.',
      skillMatchTitle: 'Repository skill match',
      mySkills: 'Your skills',
      registerSkills: 'Add your skills in your profile.',
      matchedSkills: 'Matched skills',
      noMatchedSkills: 'No matching skills found.',
      repoSkills: 'Repository skills',
      allSkillsMatched: 'All repository skills match your tech stack.',
      primaryLanguage: 'Primary language',
      unknown: 'Unknown',
      matchRate: 'Match rate',
    },
    errors: {
      repoLoadTitle: 'Unable to load repository information.',
      invalidRepoId: 'Open this page with a valid repository ID.',
      repoLoadDescription:
        'Check the GitHub API response or deployment environment variables and try again.',
    },
    bookmark: {
      added: 'Repository added to bookmarks.',
      addFailed: 'Failed to bookmark the repository.',
      removed: 'Repository removed from bookmarks.',
      removeFailed: 'Failed to remove the repository from bookmarks.',
    },
  },
} as const satisfies Record<Locale, AppMessages>;

export const getMessages = (locale: Locale): AppMessages => messages[locale];

export const formatMessage = (
  template: string,
  values: Record<string, string | number>
) =>
  Object.entries(values).reduce(
    (message, [key, value]) =>
      message.replaceAll(`{${key}}`, String(value)),
    template
  );
