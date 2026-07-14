'use client';

import Link from 'next/link';
import { ProfileResponse } from '../../../_types/profile';
import { RepoDetailResponse } from '../../../_types/repo';
import ProfileSidebar from './ProfileSidebar';
import RepoDetailSections from './RepoDetailSections';
import RepoSummaryCard from './RepoSummaryCard';
import { ArrowLeftIcon } from '../../../_components/icons/ArrowLeftIcon';
import Surface from '../../../_components/commons/Surface';
import { useRepoDetailClient } from '../_hooks/useRepoDetailClient';

interface RepoDetailClientProps {
  repoId: number;
  repo: RepoDetailResponse;
  profile: ProfileResponse | null;
}

const RepoDetailClient = ({ repo, profile }: RepoDetailClientProps) => {
  const { listHref, messages, sections } = useRepoDetailClient(repo);

  return (
    <div className="container mx-auto py-8 px-4">
      <Link
        href={listHref}
        className="mb-6 inline-flex h-9 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
      >
        <ArrowLeftIcon />
        {messages.repoDetail.backToList}
      </Link>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Surface className="space-y-6" padding="lg" shadow="lg">
            <RepoSummaryCard repo={repo} />
            <RepoDetailSections
              defaultBranch={repo.defaultBranch}
              repoFullName={repo.fullName}
              sections={sections}
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
          </Surface>
        </div>
        <div className="space-y-6">
          <ProfileSidebar repo={repo} profile={profile} />
        </div>
      </div>
    </div>
  );
};
export default RepoDetailClient;
