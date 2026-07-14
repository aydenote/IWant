import type { TranslateTarget } from '../../../_services/client/translate';
import type { DetailSection } from '../_types/repoDetailSection';
import type { RepoDetailSectionState } from '../_hooks/useRepoDetailSections';
import MarkdownContent from './MarkdownContent';
import TranslationControls from './TranslationControls';

interface RepoDetailSectionProps {
  defaultBranch: string;
  labels: {
    english: string;
    korean: string;
    original: string;
    translating: string;
  };
  onSelectOriginal: (sectionTitle: string) => void;
  onTranslate: (section: DetailSection, target: TranslateTarget) => void;
  repoFullName: string;
  section: DetailSection;
  state: RepoDetailSectionState;
}

const RepoDetailSection = ({
  defaultBranch,
  labels,
  onSelectOriginal,
  onTranslate,
  repoFullName,
  section,
  state,
}: RepoDetailSectionProps) => (
  <div className="space-y-3" key={section.title}>
    <div className="flex flex-wrap items-center justify-between gap-3">
      <h2 className="text-xl font-semibold">{state.title}</h2>
      <TranslationControls
        isLoading={state.isLoading}
        labels={labels}
        mode={state.mode}
        onSelectEnglish={() => onTranslate(section, 'en')}
        onSelectKorean={() => onTranslate(section, 'ko')}
        onSelectOriginal={() => onSelectOriginal(section.title)}
      />
    </div>

    {state.isLoading && (
      <p className="text-sm text-muted-foreground">{labels.translating}</p>
    )}
    {state.errorMessage && (
      <p className="text-sm text-destructive">{state.errorMessage}</p>
    )}

    <MarkdownContent
      defaultBranch={defaultBranch}
      repoFullName={repoFullName}
      sourcePath={section.sourcePath}
    >
      {state.displayContent}
    </MarkdownContent>
  </div>
);

export default RepoDetailSection;
