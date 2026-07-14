import BasicButton from '../../../_components/buttons/BasicButton';
import type { TranslateMode } from '../_types/repoDetailSection';

interface TranslationControlsProps {
  isLoading: boolean;
  labels: {
    english: string;
    korean: string;
    original: string;
  };
  mode: TranslateMode;
  onSelectEnglish: () => void;
  onSelectKorean: () => void;
  onSelectOriginal: () => void;
}

const TranslationControls = ({
  isLoading,
  labels,
  mode,
  onSelectEnglish,
  onSelectKorean,
  onSelectOriginal,
}: TranslationControlsProps) => (
  <div className="flex flex-wrap gap-2">
    <BasicButton
      type="button"
      size="sm"
      variant={mode === 'original' ? 'secondary' : 'outline'}
      onClick={onSelectOriginal}
    >
      {labels.original}
    </BasicButton>
    <BasicButton
      type="button"
      size="sm"
      variant={mode === 'ko' ? 'secondary' : 'outline'}
      disabled={Boolean(isLoading)}
      onClick={onSelectKorean}
    >
      {labels.korean}
    </BasicButton>
    <BasicButton
      type="button"
      size="sm"
      variant={mode === 'en' ? 'secondary' : 'outline'}
      disabled={Boolean(isLoading)}
      onClick={onSelectEnglish}
    >
      {labels.english}
    </BasicButton>
  </div>
);

export default TranslationControls;
