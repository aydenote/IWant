'use client';

import { getMessages } from '../../../_i18n/messages';
import { useLocale } from '../../../_hooks/useLocale';
import { useRepoDetailSections } from '../_hooks/useRepoDetailSections';
import type { DetailSection } from '../_types/repoDetailSection';
import RepoDetailSection from './RepoDetailSection';

interface RepoDetailSectionsProps {
  defaultBranch: string;
  repoFullName: string;
  sections: DetailSection[];
}

const RepoDetailSections = ({
  defaultBranch,
  repoFullName,
  sections,
}: RepoDetailSectionsProps) => {
  const locale = useLocale();
  const messages = getMessages(locale);
  const { getSectionState, selectOriginal, translateSection } =
    useRepoDetailSections({
      translationFailedMessage: messages.repoDetail.translationFailed,
    });
  const labels = {
    english: messages.repoDetail.english,
    korean: messages.repoDetail.korean,
    original: messages.repoDetail.original,
    translating: messages.repoDetail.translating,
  };

  return (
    <div className="space-y-6">
      {sections.map((section) => (
        <RepoDetailSection
          defaultBranch={defaultBranch}
          key={section.title}
          labels={labels}
          onSelectOriginal={selectOriginal}
          onTranslate={translateSection}
          repoFullName={repoFullName}
          section={section}
          state={getSectionState(section)}
        />
      ))}
    </div>
  );
};

export default RepoDetailSections;
