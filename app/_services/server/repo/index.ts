'use server';

import { RepoDetailResponse, RepoListResponse } from '../../../_types/repo';
import { PAGE_ITEM_LIMIT } from '../../../_constants/repo';
import { getGithubHeaders } from '../github/client';
import { mapRepo } from '../github/mappers';
import { getGithubRepoDetail } from '../github/repo-detail';
import type { GitHubRepo } from '../github/types';

export const getRepoListServer = async (
  offset = 0,
  query = '',
  limit = PAGE_ITEM_LIMIT
): Promise<RepoListResponse[]> => {
  const safeLimit = Math.min(Math.max(limit, 1), 100);
  const page = Math.floor(offset / safeLimit) + 1;
  const repoQuery = [
    query.trim(),
    'good-first-issues:>0',
    'archived:false',
    'is:public',
  ]
    .filter(Boolean)
    .join(' ');

  const params = new URLSearchParams({
    q: repoQuery,
    sort: 'updated',
    order: 'desc',
    per_page: String(safeLimit),
    page: String(page),
  });

  const res = await fetch(`https://api.github.com/search/repositories?${params}`, {
    headers: getGithubHeaders(),
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => null);
    console.error('Failed to fetch repositories', {
      status: res.status,
      message: error?.message,
    });
    return [];
  }

  const data = (await res.json()) as { items?: GitHubRepo[] };
  return (data.items ?? []).map(mapRepo);
};

export const getRepoDetailServer = async (
  id: number
): Promise<RepoDetailResponse> => {
  const result = await getGithubRepoDetail(String(id));

  if (!result.ok) {
    console.error('Failed to fetch repository detail', {
      status: result.status,
      message: result.message,
    });
    throw new Error('Failed to fetch repository detail');
  }

  return result.data;
};
