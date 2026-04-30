import { useEffect, useRef, useState } from 'react';
import { RepoListResponse } from '../(types)/apis';
import { PAGE_ITEM_LIMIT } from '../(constants)/repo';
import { getRepoListServer } from '../api/server/repo';

const mergeReposById = (
  prevRepos: RepoListResponse[],
  nextRepos: RepoListResponse[]
) => {
  const repoMap = new Map<number, RepoListResponse>();

  [...prevRepos, ...nextRepos].forEach((repo) => {
    repoMap.set(repo.id, repo);
  });

  return Array.from(repoMap.values());
};

export const useInfiniteScroll = (
  initialRepos: RepoListResponse[],
  query?: string
) => {
  const [repos, setRepos] = useState(initialRepos);
  const [page, setPage] = useState(1);
  const [offset, setOffset] = useState(initialRepos.length);
  const [isLoading, setIsLoading] = useState(false);
  const [hasNext, setHasNext] = useState(true);

  const anchorRef = useRef<HTMLDivElement | null>(null);
  const loadingRef = useRef(false);

  useEffect(() => {
    if (!hasNext) return;
    if (!anchorRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loadingRef.current) {
          loadingRef.current = true;
          setIsLoading(true);
          getRepoListServer(offset, query).then((nextRepos) => {
            setRepos((prev) => mergeReposById(prev, nextRepos));
            setPage((prev) => prev + 1);
            setOffset((prev) => prev + PAGE_ITEM_LIMIT);
            setHasNext(nextRepos.length > 0);
          }).finally(() => {
            loadingRef.current = false;
            setIsLoading(false);
          });
        }
      },
      { rootMargin: '200px' }
    );
    observer.observe(anchorRef.current);
    return () => observer.disconnect();
  }, [page, offset, query, hasNext]);

  return { repos, isLoading, anchorRef };
};
