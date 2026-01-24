import { JobListResponse } from '../types/apis';

const useJobFilter = (jobList: JobListResponse[], query: string) => {
  return jobList.filter((job) => {
    if (query) {
      const companyName = (job.company?.name ?? '').toLowerCase();
      if (!companyName.includes(query)) return false;
      return true;
    }
    return true;
  });
};

export default useJobFilter;
