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

interface GitHubContentFile {
  content?: string;
  download_url?: string | null;
  html_url?: string;
  path?: string;
  type?: string;
}

interface GitHubCommunityProfile {
  files?: {
    contributing?: {
      url?: string;
      download_url?: string | null;
      html_url?: string;
      path?: string;
    } | null;
  };
}

const getGithubHeaders = () => {
  const token = process.env.GITHUB_TOKEN ?? process.env.GITHUB_ACCESS_TOKEN;

  return {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

const decodeBase64 = (content: string) =>
  Buffer.from(content.replace(/\n/g, ''), 'base64').toString('utf-8');

const CONTRIBUTING_PATHS = [
  'CONTRIBUTING.md',
  '.github/CONTRIBUTING.md',
  'docs/CONTRIBUTING.md',
  'CONTRIBUTING',
  '.github/CONTRIBUTING',
  'docs/CONTRIBUTING',
  'contributing.md',
  '.github/contributing.md',
  'docs/contributing.md',
  'CONTRIBUTING.rst',
  '.github/CONTRIBUTING.rst',
  'docs/CONTRIBUTING.rst',
  'CONTRIBUTING.adoc',
  '.github/CONTRIBUTING.adoc',
  'docs/CONTRIBUTING.adoc',
];

const fetchContentFile = async (repoFullName: string, path: string, ref: string) => {
  const res = await fetch(
    `https://api.github.com/repos/${repoFullName}/contents/${path}?ref=${ref}`,
    { headers: getGithubHeaders(), next: { revalidate: 300 } }
  );

  if (!res.ok) return null;

  const data = (await res.json()) as {
    content?: string;
    html_url?: string;
    path?: string;
    type?: string;
  };

  if (data.type && data.type !== 'file') return null;
  return data;
};

const fetchContributingGuide = async (repoFullName: string, ref: string) => {
  for (const path of CONTRIBUTING_PATHS) {
    const data = await fetchContentFile(repoFullName, path, ref);
    if (data?.content) return data;
  }

  return null;
};

const fetchContentUrl = async (url: string) => {
  const res = await fetch(url, {
    headers: getGithubHeaders(),
    next: { revalidate: 300 },
  });

  if (!res.ok) return null;

  const data = (await res.json()) as GitHubContentFile;
  if (data.type && data.type !== 'file') return null;
  return data;
};

const fetchCommunityContributingGuide = async (repoFullName: string) => {
  const res = await fetch(
    `https://api.github.com/repos/${repoFullName}/community/profile`,
    { headers: getGithubHeaders(), next: { revalidate: 300 } }
  );

  if (!res.ok) return null;

  const data = (await res.json()) as GitHubCommunityProfile;
  const contributing = data.files?.contributing;

  if (!contributing?.url) return null;

  const content = await fetchContentUrl(contributing.url);

  if (!content?.content) return null;

  return {
    ...content,
    download_url: contributing.download_url ?? content.download_url,
    html_url: contributing.html_url ?? content.html_url,
    path: contributing.path ?? content.path,
  };
};

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
    headers: getGithubHeaders(),
    next: { revalidate: 300 },
  });

  if (!repoRes.ok) {
    const error = await repoRes.json().catch(() => null);
    return NextResponse.json(
      { ok: false, message: error?.message ?? 'Failed to fetch repository' },
      { status: repoRes.status }
    );
  }

  const repo = (await repoRes.json()) as GitHubRepoDetail;
  const [readmeRes, localContributingData, issuesRes] = await Promise.all([
    fetch(
      `https://api.github.com/repos/${repo.full_name}/readme?ref=${repo.default_branch}`,
      { headers: getGithubHeaders(), next: { revalidate: 300 } }
    ),
    fetchContributingGuide(repo.full_name, repo.default_branch),
    fetch(
      `https://api.github.com/repos/${repo.full_name}/issues?state=open&per_page=10`,
      { headers: getGithubHeaders(), next: { revalidate: 300 } }
    ),
  ]);

  const readmeData = readmeRes.ok
    ? ((await readmeRes.json()) as {
        content?: string;
        html_url?: string;
        path?: string;
      })
    : null;
  const contributingData =
    localContributingData ??
    (await fetchCommunityContributingGuide(repo.full_name));
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
    readmePath: readmeData?.path ?? null,
    contributing: contributingData?.content
      ? decodeBase64(contributingData.content)
      : null,
    contributingHtmlUrl: contributingData?.html_url ?? null,
    contributingPath: contributingData?.path ?? null,
    issues: issuesData.filter((issue) => !issue.pull_request).map(mapIssue),
  };

  return NextResponse.json({ data });
};
