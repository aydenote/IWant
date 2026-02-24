import { JobDetailResponse } from '../../../(types)/apis';

export const getJobDetailClient = async (
  id: number
): Promise<JobDetailResponse> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}/jobs/v2/${id}/details`,
    { cache: 'no-store' }
  );

  if (!res.ok) throw new Error('Failed to fetch job detail');
  const data = await res.json();
  return data.job as JobDetailResponse;
};
