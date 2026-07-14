import { getMessages } from '../../../_i18n/messages';
import type {
  DetailSection,
  TranslateMode,
} from '../_types/repoDetailSection';
import type { TranslateTarget } from '../../../_services/client/translate';

export const getTranslationKey = (
  sectionTitle: string,
  target: TranslateTarget
) => `${sectionTitle}:${target}`;

export const hasSectionContent = (section: DetailSection) =>
  section.content.trim().length > 0;

export const getSectionTitle = (title: string, mode: TranslateMode) => {
  if (mode === 'original') return title;

  const koMessages = getMessages('ko').repoDetail;
  const enMessages = getMessages('en').repoDetail;
  const targetMessages = getMessages(mode).repoDetail;

  if (
    title === koMessages.contributionIssues ||
    title === enMessages.contributionIssues
  ) {
    return targetMessages.contributionIssues;
  }

  if (
    title === koMessages.contributionGuide ||
    title === enMessages.contributionGuide
  ) {
    return targetMessages.contributionGuide;
  }

  return title;
};

export const getSectionDisplayContent = ({
  section,
  mode,
  translatedContent,
}: {
  section: DetailSection;
  mode: TranslateMode;
  translatedContent?: string;
}) => {
  if (!hasSectionContent(section)) {
    return (
      section.fallbackContent?.[mode] ??
      section.fallbackContent?.original ??
      ''
    );
  }

  return translatedContent ?? section.content;
};
