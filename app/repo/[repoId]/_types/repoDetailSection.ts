import type { TranslateTarget } from '../../../_services/client/translate';

export type TranslateMode = 'original' | TranslateTarget;

export interface DetailSection {
  title: string;
  content: string;
  fallbackContent?: Partial<Record<TranslateMode, string>>;
  sourcePath?: string | null;
}
