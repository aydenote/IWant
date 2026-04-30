'use client';

import BasicButton from '../../(components)/buttons/BasicButton';
import { ProfileResponse, RepoDetailResponse } from '../../(types)/apis';
import ProfileSidebar from './ProfileSidebar';
import RepoDetailSections from './RepoDetailSections';
import RepoSummaryCard from './RepoSummaryCard';
import { ArrowLeftIcon } from '../../(components)/icons/ArrowLeftIcon';
import { useRouter } from 'next/navigation';

interface RepoDetailClientProps {
  repoId: number;
  repo: RepoDetailResponse;
  profile: ProfileResponse | null;
}

const RepoDetailClient = ({ repo, profile }: RepoDetailClientProps) => {
  const router = useRouter();

  const detailSections = [
    {
      title: 'README',
      content: repo.readme?.slice(0, 6000) ?? 'README를 불러올 수 없습니다.',
    },
    {
      title: '기여 이슈',
      content:
        repo.issues.length > 0
          ? repo.issues
              .map(
                (issue) =>
                  `#${issue.number} ${issue.title}\n${issue.htmlUrl}\nLabels: ${
                    issue.labels.join(', ') || '없음'
                  }`
              )
              .join('\n\n')
          : 'good first issue 또는 help wanted 이슈가 없습니다.',
    },
    {
      title: '기여 방법',
      content:
        repo.contributing?.slice(0, 6000) ??
        'CONTRIBUTING 문서를 찾을 수 없습니다. README와 이슈 내용을 확인해 주세요.',
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
        목록으로
      </BasicButton>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-lg border text-card-foreground p-8 space-y-6 bg-gradient-card shadow-lg">
            <RepoSummaryCard repo={repo} />
            <RepoDetailSections sections={detailSections} />
            <div className="pt-6 border-t">
              <a
                href={repo.htmlUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 items-center justify-center rounded-md bg-gradient-hero px-4 text-sm font-medium text-primary-foreground"
              >
                GitHub에서 보기
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
