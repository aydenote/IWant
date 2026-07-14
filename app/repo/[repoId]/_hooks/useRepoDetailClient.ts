'use client';

import { getLocalizedPath } from '../../../_i18n/config';
import { getMessages } from '../../../_i18n/messages';
import { useLocale } from '../../../_hooks/useLocale';
import { RepoDetailResponse } from '../../../_types/repo';
import type { DetailSection } from '../_types/repoDetailSection';

const buildIssueContent = (
  repo: RepoDetailResponse,
  noContributionIssues: string,
  noLabels: string
) => {
  if (repo.issues.length === 0) return noContributionIssues;

  return repo.issues
    .map(
      (issue) =>
        `### Issue #${issue.number}\n\n${issue.title}\n\n${issue.htmlUrl}\n\nLabels: ${
          issue.labels.join(', ') || noLabels
        }`
    )
    .join('\n\n');
};

export const useRepoDetailClient = (repo: RepoDetailResponse) => {
  const locale = useLocale();
  const messages = getMessages(locale);
  const detailMessages = messages.repoDetail;
  const sections: DetailSection[] = [
    {
      title: 'README',
      content: repo.readme?.slice(0, 6000) ?? detailMessages.readmeUnavailable,
      sourcePath: repo.readmePath,
    },
    {
      title: detailMessages.contributionIssues,
      content: buildIssueContent(
        repo,
        detailMessages.noContributionIssues,
        detailMessages.noLabels
      ),
    },
    {
      title: detailMessages.contributionGuide,
      content: repo.contributing?.slice(0, 6000) ?? '',
      fallbackContent: {
        original:
          'No CONTRIBUTING document was found. Please check the README and open issues.',
        ko: getMessages('ko').repoDetail.contributionGuideUnavailable,
        en: getMessages('en').repoDetail.contributionGuideUnavailable,
      },
      sourcePath: repo.contributingPath,
    },
  ];

  return {
    listHref: getLocalizedPath(locale),
    messages,
    sections,
  };
};
