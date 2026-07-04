import {
  defaultLocale,
  getLocalizedPath,
  getPreferredLocale,
  isLocale,
  localeConfig,
  locales,
  replacePathLocale,
} from '../../app/_i18n/config';
import { formatMessage, getMessages } from '../../app/_i18n/messages';
import {
  getAbsoluteLanguageAlternates,
  getLocaleAlternates,
} from '../../app/_utils/localeSeo';

describe('i18n config', () => {
  test('지원 locale과 기본 locale을 제공한다', () => {
    expect(locales).toEqual(['ko', 'en']);
    expect(defaultLocale).toBe('ko');
  });

  test('지원하는 locale만 검증한다', () => {
    expect(isLocale('ko')).toBe(true);
    expect(isLocale('en')).toBe(true);
    expect(isLocale('ja')).toBe(false);
  });

  test('locale별 언어 태그와 번역 메시지를 반환한다', () => {
    expect(localeConfig.ko.languageTag).toBe('ko-KR');
    expect(localeConfig.en.openGraphLocale).toBe('en_US');
    expect(getMessages('ko').hero.reset).toBe('초기화');
    expect(getMessages('en').hero.reset).toBe('Reset');
  });

  test('locale prefix가 포함된 내부 경로를 생성한다', () => {
    expect(getLocalizedPath('ko')).toBe('/ko');
    expect(getLocalizedPath('en', '/search/react')).toBe('/en/search/react');
    expect(getLocalizedPath('en', 'mypage')).toBe('/en/mypage');
  });

  test('현재 경로를 유지하며 locale prefix만 교체한다', () => {
    expect(replacePathLocale('/ko', 'en')).toBe('/en');
    expect(replacePathLocale('/ko/search/react', 'en')).toBe(
      '/en/search/react'
    );
    expect(replacePathLocale('/repo/1', 'en')).toBe('/en/repo/1');
  });

  test('Accept-Language 우선순위에 맞는 locale을 선택한다', () => {
    expect(getPreferredLocale('en-US,en;q=0.9,ko;q=0.8')).toBe('en');
    expect(getPreferredLocale('en;q=0.5,ko-KR;q=0.9')).toBe('ko');
    expect(getPreferredLocale('ja-JP,zh;q=0.9')).toBe(defaultLocale);
    expect(getPreferredLocale(null)).toBe(defaultLocale);
  });

  test('번역 메시지의 placeholder를 치환한다', () => {
    expect(
      formatMessage(getMessages('en').repoList.skillHeadingTemplate, {
        skill: 'React',
      })
    ).toBe('React open source repositories');
  });

  test('현재 locale의 canonical과 언어별 대체 경로를 생성한다', () => {
    expect(getLocaleAlternates('en', '/search/react')).toEqual({
      canonical: '/en/search/react',
      languages: {
        ko: '/ko/search/react',
        en: '/en/search/react',
        'x-default': '/ko/search/react',
      },
    });
  });

  test('사이트맵용 절대 언어 URL을 생성한다', () => {
    expect(
      getAbsoluteLanguageAlternates('https://iwant.example', '/repo/1')
    ).toEqual({
      ko: 'https://iwant.example/ko/repo/1',
      en: 'https://iwant.example/en/repo/1',
      'x-default': 'https://iwant.example/ko/repo/1',
    });
  });
});
