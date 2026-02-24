import Header from '../../(components)/header/Header';
import { getJobDetailClient } from '../../api/client/job';
import { getProfileServer } from '../../api/server/profile';
import JobDetailClient from './JobDetailClient';

export default async function Page({ params }: { params: { jobId: string } }) {
  const { jobId } = await params;
  const [jobDetail, profile] = await Promise.all([
    getJobDetailClient(Number(jobId)),
    getProfileServer(),
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
