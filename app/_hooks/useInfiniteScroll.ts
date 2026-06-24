import { useEffect, useRef, useState } from 'react';
import { RepoListResponse } from '../_types/repo';
import { PAGE_ITEM_LIMIT } from '../_constants/repo';

const getRepoListClient = async (
  offset: number,
  query = '',
  techStack: string[] = [],
  limit = PAGE_ITEM_LIMIT
) => {
  const params = new URLSearchParams({
    offset: String(offset),
    query,
    limit: String(limit),
  });

  techStack.forEach((skill) => {
    params.append('techStack', skill);
  });

  const res = await fetch(`/api/repos?${params}`, { cache: 'no-store' });

  if (!res.ok) {
    throw new Error('Failed to fetch repositories');
  }

  const data = (await res.json()) as { data?: RepoListResponse[] };
  return data.data ?? [];
};

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
  query?: string,
  techStack: string[] = []
) => {
  const [repos, setRepos] = useState(initialRepos);
  const [page, setPage] = useState(1);
  const [offset, setOffset] = useState(initialRepos.length);
  const [isLoading, setIsLoading] = useState(false);
  const [hasNext, setHasNext] = useState(true);

  const anchorRef = useRef<HTMLDivElement | null>(null);
  const loadingRef = useRef(false);
  const prefetchedReposRef = useRef<RepoListResponse[] | null>(null);
  const prefetchedOffsetRef = useRef<number | null>(null);
  const prefetchingRef = useRef(false);
  const techStackKey = techStack.join('|');

  const prefetchNextPage = (nextOffset: number) => {
    if (prefetchingRef.current) return;

    prefetchingRef.current = true;
    getRepoListClient(nextOffset, query, techStack)
      .then((nextRepos) => {
        prefetchedReposRef.current = nextRepos;
        prefetchedOffsetRef.current = nextOffset;
      })
      .catch((err) => {
        console.error(err);
        prefetchedReposRef.current = null;
        prefetchedOffsetRef.current = null;
      })
      .finally(() => {
        prefetchingRef.current = false;
      });
  };

  const schedulePrefetchNextPage = (nextOffset: number) => {
    if (typeof window === 'undefined') return undefined;

    if ('requestIdleCallback' in window) {
      const idleId = window.requestIdleCallback(
        () => prefetchNextPage(nextOffset),
        { timeout: 2000 }
      );

      return () => window.cancelIdleCallback(idleId);
    }

    const timeoutId = globalThis.setTimeout(
      () => prefetchNextPage(nextOffset),
      500
    );
    return () => globalThis.clearTimeout(timeoutId);
  };

  useEffect(() => {
    setRepos(initialRepos);
    setPage(1);
    setOffset(initialRepos.length);
    setHasNext(true);
    prefetchedReposRef.current = null;
    prefetchedOffsetRef.current = null;
    return schedulePrefetchNextPage(initialRepos.length);
  }, [initialRepos, query, techStackKey]);

  useEffect(() => {
    if (!hasNext) return;
    if (!anchorRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loadingRef.current) {
          loadingRef.current = true;
          setIsLoading(true);
          const prefetchedRepos =
            prefetchedOffsetRef.current === offset
              ? prefetchedReposRef.current
              : null;
          const nextPagePromise = prefetchedRepos
            ? Promise.resolve(prefetchedRepos)
            : getRepoListClient(offset, query, techStack);

          prefetchedReposRef.current = null;
          prefetchedOffsetRef.current = null;

          nextPagePromise
            .then((nextRepos) => {
              setRepos((prev) => mergeReposById(prev, nextRepos));
              setPage((prev) => prev + 1);
              setOffset((prev) => prev + PAGE_ITEM_LIMIT);
              setHasNext(nextRepos.length > 0);
              if (nextRepos.length > 0) {
                prefetchNextPage(offset + PAGE_ITEM_LIMIT);
              }
            })
            .catch((err) => {
              console.error(err);
            })
            .finally(() => {
              loadingRef.current = false;
              setIsLoading(false);
            });
        }
      },
      { rootMargin: '200px' }
    );
    observer.observe(anchorRef.current);
    return () => observer.disconnect();
  }, [page, offset, query, techStackKey, hasNext]);

  return { repos, isLoading, anchorRef };
};
