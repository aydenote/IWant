'use server';

import { RepoDetailResponse, RepoListResponse } from '../../../_types/repo';
import { PAGE_ITEM_LIMIT } from '../../../_constants/repo';
import { getGithubHeaders } from '../github/client';
import { mapRepo } from '../github/mappers';
import { getGithubRepoDetail } from '../github/repo-detail';
import type { GitHubRepo } from '../github/types';
import {
  buildRepoSearchQuery,
  normalizeTechStack,
  toGithubSkillSearchTerm,
} from '../../../_utils/repoSearch';

interface GetRepoListServerParams {
  offset?: number;
  query?: string;
  limit?: number;
  techStack?: string[];
}

const fetchGithubRepos = async (
  searchTerm: string,
  page: number,
  limit: number
) => {
  const repoQuery = buildRepoSearchQuery(searchTerm);
  const params = new URLSearchParams({
    q: repoQuery,
    sort: 'updated',
    order: 'desc',
    per_page: String(limit),
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

const mergeReposById = (repoGroups: RepoListResponse[][]) => {
  const repoMap = new Map<number, RepoListResponse>();

  repoGroups.flat().forEach((repo) => {
    repoMap.set(repo.id, repo);
  });

  return Array.from(repoMap.values()).sort((a, b) => {
    const updatedDiff =
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();

    return updatedDiff || b.stars - a.stars;
  });
};

export const getRepoListServer = async ({
  offset = 0,
  query = '',
  limit = PAGE_ITEM_LIMIT,
  techStack = [],
}: GetRepoListServerParams = {}): Promise<RepoListResponse[]> => {
  const safeLimit = Math.min(Math.max(limit, 1), 100);
  const page = Math.floor(offset / safeLimit) + 1;
  const searchText = query.trim();
  const recommendationSkills = searchText ? [] : normalizeTechStack(techStack);

  if (recommendationSkills.length === 0) {
    return fetchGithubRepos(searchText, page, safeLimit);
  }

  const repoGroups = await Promise.all(
    recommendationSkills.map((skill) =>
      fetchGithubRepos(toGithubSkillSearchTerm(skill), page, safeLimit)
    )
  );

  return mergeReposById(repoGroups).slice(0, safeLimit);
};

export const getRepoSummaryServer = async (
  id: number
): Promise<RepoListResponse | null> => {
  const res = await fetch(`https://api.github.com/repositories/${id}`, {
    headers: getGithubHeaders(),
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => null);
    console.error('Failed to fetch repository summary', {
      status: res.status,
      message: error?.message,
    });
    return null;
  }

  const repo = (await res.json()) as GitHubRepo;
  return mapRepo(repo);
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
