import Header from '../../(components)/header/Header';
import { getJobDetail } from '../../api/client/jobs';
import { getProfile } from '../../api/client/mypage/profile';
import JobDetailClient from './JobDetailClient';

export default async function Page({ params }: { params: { jobId: string } }) {
  const { jobId } = await params;
  const [jobDetail, profile] = await Promise.all([
    getJobDetail(Number(jobId)),
    getProfile(),
  ]);

  return (
    <div className="bg-[#f8fafc] min-h-screen">
      <Header />
      <JobDetailClient
        jobId={Number(jobId)}
        job={jobDetail}
        profile={profile}
      />
    </div>
  );
}
