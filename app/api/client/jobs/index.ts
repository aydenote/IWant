import { JobListResponse } from '../../../(types)/apis';

export const getJobList = async (): Promise<JobListResponse[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}/navigation/v1/results?1765229525360=&job_group_id=518&job_ids=669&country=kr&job_sort=job.latest_order&years=0&locations=all`,
    { cache: 'no-store' }
  );

  if (!res.ok) throw new Error('Failed to fetch job list');

  const data = await res.json();
  return data.data as JobListResponse[];
};
