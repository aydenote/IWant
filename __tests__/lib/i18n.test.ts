import {
  defaultLocale,
  getLocalizedPath,
  isLocale,
  localeConfig,
  locales,
} from '../../app/_i18n/config';
import { formatMessage, getMessages } from '../../app/_i18n/messages';

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

  test('번역 메시지의 placeholder를 치환한다', () => {
    expect(
      formatMessage(getMessages('en').repoList.skillHeadingTemplate, {
        skill: 'React',
      })
    ).toBe('React open source repositories');
  });
});
