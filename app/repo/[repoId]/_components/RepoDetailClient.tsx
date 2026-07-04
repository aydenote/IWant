'use client';

import BasicButton from '../../../_components/buttons/BasicButton';
import { ProfileResponse } from '../../../_types/profile';
import { RepoDetailResponse } from '../../../_types/repo';
import ProfileSidebar from './ProfileSidebar';
import RepoDetailSections from './RepoDetailSections';
import RepoSummaryCard from './RepoSummaryCard';
import { ArrowLeftIcon } from '../../../_components/icons/ArrowLeftIcon';
import { useRouter } from 'next/navigation';
import { getMessages } from '../../../_i18n/messages';
import { useLocale } from '../../../_hooks/useLocale';

interface RepoDetailClientProps {
  repoId: number;
  repo: RepoDetailResponse;
  profile: ProfileResponse | null;
}

const RepoDetailClient = ({ repo, profile }: RepoDetailClientProps) => {
  const locale = useLocale();
  const messages = getMessages(locale);
  const router = useRouter();

  const detailSections = [
    {
      title: 'README',
      content:
        repo.readme?.slice(0, 6000) ?? messages.repoDetail.readmeUnavailable,
      sourcePath: repo.readmePath,
    },
    {
      title: messages.repoDetail.contributionIssues,
      content:
        repo.issues.length > 0
          ? repo.issues
              .map(
                (issue) =>
                  `### Issue #${issue.number}\n\n${issue.title}\n\n${issue.htmlUrl}\n\nLabels: ${
                    issue.labels.join(', ') || messages.repoDetail.noLabels
                  }`
              )
              .join('\n\n')
          : messages.repoDetail.noContributionIssues,
    },
    {
      title: messages.repoDetail.contributionGuide,
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

  return (
    <div className="container mx-auto py-8 px-4">
      <BasicButton
        onClick={() => router.back()}
        variant="ghost"
        size="sm"
        className="cursor-pointer mb-6 gap-2"
      >
        <ArrowLeftIcon />
        {messages.repoDetail.backToList}
      </BasicButton>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-lg border text-card-foreground p-8 space-y-6 bg-gradient-card shadow-lg">
            <RepoSummaryCard repo={repo} />
            <RepoDetailSections
              defaultBranch={repo.defaultBranch}
              repoFullName={repo.fullName}
              sections={detailSections}
            />
            <div className="pt-6 border-t">
              <a
                href={repo.htmlUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 items-center justify-center rounded-md bg-gradient-hero px-4 text-sm font-medium text-primary-foreground"
              >
                {messages.repoDetail.viewOnGitHub}
              </a>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <ProfileSidebar repo={repo} profile={profile} />
        </div>
      </div>
    </div>
  );
};
export default RepoDetailClient;
