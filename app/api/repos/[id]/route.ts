import { NextResponse } from 'next/server';
import type { RepoDetailResponse, RepoIssueResponse } from '../../../_types/apis';

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

const shouldLogRepoTiming =
  process.env.NODE_ENV !== 'production' ||
  process.env.DEBUG_REPO_TIMING === 'true';

const getNow = () => performance.now();

type RepoTimingRecorder = (label: string, start: number, detail?: string) => void;

const logRepoTiming: RepoTimingRecorder = (label, start, detail) => {
  if (!shouldLogRepoTiming) return;

  const elapsed = Math.round(getNow() - start);
  console.log(
    `[repo detail timing] ${label}: ${elapsed}ms${detail ? ` (${detail})` : ''}`
  );
};

const createRepoTimingRecorder = () => {
  const timings: string[] = [];
  let index = 0;

  const record: RepoTimingRecorder = (label, start, detail) => {
    const elapsed = Math.round(getNow() - start);
    const name = label
      .toLowerCase()
      .replace(/[^a-z0-9_-]+/g, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 40);
    const desc = detail?.replace(/"/g, "'") ?? label;

    timings.push(`${name || 'step'}-${index};dur=${elapsed};desc="${desc}"`);
    index += 1;
    logRepoTiming(label, start, detail);
  };

  return {
    getHeader: () => (shouldLogRepoTiming ? timings.join(', ') : ''),
    record,
  };
};

const decodeBase64 = (content: string) =>
  Buffer.from(content.replace(/\n/g, ''), 'base64').toString('utf-8');

const firstNonNull = async <T,>(promises: Promise<T | null>[]) =>
  new Promise<T | null>((resolve) => {
    let remaining = promises.length;
    let resolved = false;

    promises.forEach((promise) => {
      promise
        .then((value) => {
          if (resolved) return;

          if (value) {
            resolved = true;
            resolve(value);
            return;
          }

          remaining -= 1;
          if (remaining === 0) resolve(null);
        })
        .catch(() => {
          if (resolved) return;

          remaining -= 1;
          if (remaining === 0) resolve(null);
        });
    });
  });

const CONTRIBUTING_FALLBACK_PATHS = [
  'CONTRIBUTING.md',
  '.github/CONTRIBUTING.md',
  'docs/CONTRIBUTING.md',
];

const fetchContentFile = async (
  repoFullName: string,
  path: string,
  ref: string,
  recordTiming: RepoTimingRecorder
) => {
  const start = getNow();
  const res = await fetch(
    `https://api.github.com/repos/${repoFullName}/contents/${path}?ref=${ref}`,
    { headers: getGithubHeaders(), next: { revalidate: 300 } }
  );
  recordTiming(`contributing path ${path}`, start, `status=${res.status}`);

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

const fetchFallbackContributingGuide = async (
  repoFullName: string,
  ref: string,
  recordTiming: RepoTimingRecorder
) => {
  return firstNonNull(
    CONTRIBUTING_FALLBACK_PATHS.map((path) =>
      fetchContentFile(repoFullName, path, ref, recordTiming)
    )
  );
};

const fetchContentUrl = async (
  url: string,
  recordTiming: RepoTimingRecorder
) => {
  const start = getNow();
  const res = await fetch(url, {
    headers: getGithubHeaders(),
    next: { revalidate: 300 },
  });
  recordTiming('contributing content url', start, `status=${res.status}`);

  if (!res.ok) return null;

  const data = (await res.json()) as GitHubContentFile;
  if (data.type && data.type !== 'file') return null;
  return data;
};

const fetchCommunityContributingGuide = async (
  repoFullName: string,
  recordTiming: RepoTimingRecorder
) => {
  const start = getNow();
  const res = await fetch(
    `https://api.github.com/repos/${repoFullName}/community/profile`,
    { headers: getGithubHeaders(), next: { revalidate: 300 } }
  );
  recordTiming('contributing community profile', start, `status=${res.status}`);

  if (!res.ok) return null;

  const data = (await res.json()) as GitHubCommunityProfile;
  const contributing = data.files?.contributing;

  if (!contributing?.url) return null;

  const content = await fetchContentUrl(contributing.url, recordTiming);

  if (!content?.content) return null;

  return {
    ...content,
    download_url: contributing.download_url ?? content.download_url,
    html_url: contributing.html_url ?? content.html_url,
    path: contributing.path ?? content.path,
  };
};

const fetchContributingGuide = async (
  repoFullName: string,
  ref: string,
  recordTiming: RepoTimingRecorder
) => {
  const start = getNow();
  let data = await fetchFallbackContributingGuide(repoFullName, ref, recordTiming);

  if (!data) {
    data = await fetchCommunityContributingGuide(repoFullName, recordTiming);
  }

  recordTiming(
    'contributing lookup',
    start,
    data ? `hit=${data.path ?? 'unknown'}` : 'miss'
  );

  return data;
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
  const totalStart = getNow();
  const { getHeader, record } = createRepoTimingRecorder();
  const { id } = await params;

  const repoStart = getNow();
  const repoRes = await fetch(`https://api.github.com/repositories/${id}`, {
    headers: getGithubHeaders(),
    next: { revalidate: 300 },
  });
  record('repo fetch', repoStart, `status=${repoRes.status}`);

  if (!repoRes.ok) {
    const error = await repoRes.json().catch(() => null);
    return NextResponse.json(
      { ok: false, message: error?.message ?? 'Failed to fetch repository' },
      { headers: { 'Server-Timing': getHeader() }, status: repoRes.status }
    );
  }

  const repo = (await repoRes.json()) as GitHubRepoDetail;
  const readmePromise = (async () => {
    const start = getNow();
    const res = await fetch(
      `https://api.github.com/repos/${repo.full_name}/readme?ref=${repo.default_branch}`,
      { headers: getGithubHeaders(), next: { revalidate: 300 } }
    );
    record('readme fetch', start, `status=${res.status}`);
    return res;
  })();
  const contributingPromise = (async () => {
    const start = getNow();
    const data = await fetchContributingGuide(
      repo.full_name,
      repo.default_branch,
      record
    );
    record(
      'contributing total lookup',
      start,
      data ? `hit=${data.path ?? 'unknown'}` : 'miss'
    );
    return data;
  })();
  const issuesPromise = (async () => {
    const start = getNow();
    const res = await fetch(
      `https://api.github.com/repos/${repo.full_name}/issues?state=open&per_page=10`,
      { headers: getGithubHeaders(), next: { revalidate: 300 } }
    );
    record('issues fetch', start, `status=${res.status}`);
    return res;
  })();
  const [readmeRes, localContributingData, issuesRes] = await Promise.all([
    readmePromise,
    contributingPromise,
    issuesPromise,
  ]);

  const readmeData = readmeRes.ok
    ? ((await readmeRes.json()) as {
        content?: string;
        html_url?: string;
        path?: string;
      })
    : null;
  const contributingData = localContributingData;
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

  record('total', totalStart, `repo=${repo.full_name}`);

  return NextResponse.json(
    { data },
    { headers: { 'Server-Timing': getHeader() } }
  );
};
