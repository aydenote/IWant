import { localeConfig } from '../../../_i18n/config';
import { getMessages } from '../../../_i18n/messages';
import { useLocale } from '../../../_hooks/useLocale';
import { RepoDetailResponse } from '../../../_types/repo';

export const useRepoSummaryCard = (repo: RepoDetailResponse) => {
  const locale = useLocale();
  const messages = getMessages(locale);
  const numberFormatter = new Intl.NumberFormat(
    localeConfig[locale].languageTag
  );

  return {
    description: repo.description,
    formattedOpenIssues: numberFormatter.format(repo.openIssues),
    formattedStars: numberFormatter.format(repo.stars),
    fullName: repo.fullName,
    messages,
    ownerName: repo.owner.login,
  };
};
