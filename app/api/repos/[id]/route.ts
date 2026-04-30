import { NextResponse } from 'next/server';
import type { RepoDetailResponse, RepoIssueResponse } from '../../../(types)/apis';

interface GitHubRepoDetail {
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
  default_branch: string;
}

interface GitHubIssue {
  id: number;
  number: number;
  title: string;
  html_url: string;
  labels: { name: string }[];
  comments: number;
  created_at: string;
  pull_request?: unknown;
}

const githubHeaders = {
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
};

const decodeBase64 = (content: string) =>
  Buffer.from(content.replace(/\n/g, ''), 'base64').toString('utf-8');

const mapIssue = (issue: GitHubIssue): RepoIssueResponse => ({
  id: issue.id,
  number: issue.number,
  title: issue.title,
  htmlUrl: issue.html_url,
  labels: issue.labels.map((label) => label.name),
  comments: issue.comments,
  createdAt: issue.created_at,
});

export const GET = async (
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id } = await params;

  const repoRes = await fetch(`https://api.github.com/repositories/${id}`, {
    headers: githubHeaders,
    next: { revalidate: 300 },
  });

  if (!repoRes.ok) {
    return NextResponse.json(
      { ok: false, message: 'Failed to fetch repository' },
      { status: repoRes.status }
    );
  }

  const repo = (await repoRes.json()) as GitHubRepoDetail;
  const [readmeRes, issuesRes] = await Promise.all([
    fetch(
      `https://api.github.com/repos/${repo.full_name}/readme?ref=${repo.default_branch}`,
      { headers: githubHeaders, next: { revalidate: 300 } }
    ),
    fetch(
      `https://api.github.com/repos/${repo.full_name}/issues?state=open&per_page=10`,
      { headers: githubHeaders, next: { revalidate: 300 } }
    ),
  ]);

  const readmeData = readmeRes.ok
    ? ((await readmeRes.json()) as { content?: string; html_url?: string })
    : null;
  const issuesData = issuesRes.ok ? ((await issuesRes.json()) as GitHubIssue[]) : [];

  const data: RepoDetailResponse = {
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
    defaultBranch: repo.default_branch,
    readme: readmeData?.content ? decodeBase64(readmeData.content) : null,
    readmeHtmlUrl: readmeData?.html_url ?? null,
    issues: issuesData.filter((issue) => !issue.pull_request).map(mapIssue),
  };

  return NextResponse.json({ data });
};
