import { NextResponse } from 'next/server';
import type { RepoListResponse } from '../../(types)/apis';

interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  owner: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
  language: string | null;
  topics?: string[];
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  updated_at: string;
  license: { name: string } | null;
}

const getGithubHeaders = () => {
  const token = process.env.GITHUB_TOKEN ?? process.env.GITHUB_ACCESS_TOKEN;

  return {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

const mapRepo = (repo: GitHubRepo): RepoListResponse => ({
  id: repo.id,
  name: repo.name,
  fullName: repo.full_name,
  description: repo.description,
  htmlUrl: repo.html_url,
  owner: {
    login: repo.owner.login,
    avatarUrl: repo.owner.avatar_url,
    htmlUrl: repo.owner.html_url,
  },
  language: repo.language,
  topics: repo.topics ?? [],
  stars: repo.stargazers_count,
  forks: repo.forks_count,
  openIssues: repo.open_issues_count,
  updatedAt: repo.updated_at,
  license: repo.license?.name ?? null,
});

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const offset = Number(searchParams.get('offset') ?? '0');
  const limit = Number(searchParams.get('limit') ?? '20');
  const query = searchParams.get('query')?.trim();
  const page = Math.floor(offset / limit) + 1;
  const safeLimit = Math.min(Math.max(limit, 1), 100);

  const repoQuery = [
    query,
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
    return NextResponse.json(
      {
        ok: false,
        message: error?.message ?? 'Failed to fetch repositories',
      },
      { status: res.status }
    );
  }

  const data = (await res.json()) as { items?: GitHubRepo[] };
  return NextResponse.json({ data: (data.items ?? []).map(mapRepo) });
};
