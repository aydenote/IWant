'use client';

import BasicButton from '../../(components)/buttons/BasicButton';
import { JobDetailResponse, ProfileResponse } from '../../(types)/apis';
import ProfileSidebar from './ProfileSidebar';
import JobDetailSections from './JobDetailSections';
import JobSummaryCard from './JobSummaryCard';
import ApplyButton from './ApplyButton';
import { ArrowLeftIcon } from '../../(components)/icons/ArrowLeftIcon';
import { useRouter } from 'next/navigation';

interface JobDetailClientProps {
  jobId: number;
  job: JobDetailResponse;
  profile: ProfileResponse | null;
}

const JobDetailClient = ({ jobId, job, profile }: JobDetailClientProps) => {
  const router = useRouter();

  const detailSections = [
    { title: '소개', content: job.detail.intro },
    { title: '주요 업무', content: job.detail.main_tasks },
    { title: '자격 요건', content: job.detail.requirements },
    { title: '우대사항', content: job.detail.preferred_points },
    { title: '혜택 및 복지', content: job.detail.benefits },
    { title: '채용 전형', content: job.detail.hire_rounds },
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
            <JobSummaryCard job={job} />
            <JobDetailSections sections={detailSections} />
            <div className="pt-6 border-t">
              <ApplyButton jobId={jobId} />
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <ProfileSidebar job={job} profile={profile} />
        </div>
      </div>
    </div>
  );
};
export default JobDetailClient;
