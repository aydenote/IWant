import { useEffect, useRef, useState } from 'react';
import { JobListResponse } from '../(types)/apis';
import { PAGE_ITEM_LIMIT } from '../(constants)/job';
import { getJobListServer } from '../api/server/job';

export const useInfiniteScroll = (
  initialJobs: JobListResponse[],
  query?: string
) => {
  const [jobs, setJobs] = useState(initialJobs);
  const [page, setPage] = useState(1);
  const [offset, setOffset] = useState(initialJobs.length);
  const [isLoading, setIsLoading] = useState(false);
  const [hasNext, setHasNext] = useState(true);

  const anchorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasNext) return;
    if (!anchorRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          setIsLoading(true);
          getJobListServer(offset, query).then((nextJobs) => {
            setJobs((prev) => [...prev, ...nextJobs]);
            setPage((prev) => prev + 1);
            setOffset((prev) => prev + PAGE_ITEM_LIMIT);
            setHasNext(nextJobs.length > 0);
            setIsLoading(false);
          });
        }
      },
      { rootMargin: '200px' }
    );
    observer.observe(anchorRef.current);
    return () => observer.disconnect();
  }, [page, isLoading, offset]);

  return { jobs, isLoading, anchorRef };
};
