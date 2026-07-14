'use client';

import { useState } from 'react';
import {
  getTranslate,
  type TranslateTarget,
} from '../../../_services/client/translate';
import type {
  DetailSection,
  TranslateMode,
} from '../_types/repoDetailSection';
import {
  getSectionDisplayContent,
  getSectionTitle,
  getTranslationKey,
  hasSectionContent,
} from '../_utils/repoDetailSection';

interface UseRepoDetailSectionsParams {
  translationFailedMessage: string;
}

export const useRepoDetailSections = ({
  translationFailedMessage,
}: UseRepoDetailSectionsParams) => {
  const [modes, setModes] = useState<Record<string, TranslateMode>>({});
  const [translatedSections, setTranslatedSections] = useState<
    Record<string, string>
  >({});
  const [loadingKeys, setLoadingKeys] = useState<Record<string, boolean>>({});
  const [errorKeys, setErrorKeys] = useState<Record<string, string>>({});

  const selectOriginal = (sectionTitle: string) => {
    setModes((prev) => ({
      ...prev,
      [sectionTitle]: 'original',
    }));
  };

  const translateSection = async (
    section: DetailSection,
    target: TranslateTarget
  ) => {
    const key = getTranslationKey(section.title, target);

    setModes((prev) => ({ ...prev, [section.title]: target }));
    if (!hasSectionContent(section) && section.fallbackContent?.[target]) {
      return;
    }
    if (translatedSections[key]) return;

    setLoadingKeys((prev) => ({ ...prev, [key]: true }));
    setErrorKeys((prev) => ({ ...prev, [key]: '' }));

    try {
      const translated = await getTranslate(section.content, target);
      setTranslatedSections((prev) => ({ ...prev, [key]: translated }));
    } catch (err) {
      console.error(err);
      setErrorKeys((prev) => ({
        ...prev,
        [key]: translationFailedMessage,
      }));
      setModes((prev) => ({ ...prev, [section.title]: 'original' }));
    } finally {
      setLoadingKeys((prev) => ({ ...prev, [key]: false }));
    }
  };

  const getSectionState = (section: DetailSection) => {
    const mode = modes[section.title] ?? 'original';
    const translationKey =
      mode === 'original' ? null : getTranslationKey(section.title, mode);
    const translatedContent = translationKey
      ? translatedSections[translationKey]
      : undefined;

    return {
      displayContent: getSectionDisplayContent({
        section,
        mode,
        translatedContent,
      }),
      errorMessage: translationKey ? errorKeys[translationKey] : '',
      isLoading: translationKey ? loadingKeys[translationKey] : false,
      mode,
      title: getSectionTitle(section.title, mode),
    };
  };

  return {
    getSectionState,
    selectOriginal,
    translateSection,
  };
};
