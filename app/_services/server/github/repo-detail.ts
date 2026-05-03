import type { RepoDetailResponse } from '../../../_types/repo';
import { getGithubHeaders } from './client';
import { fetchContributingGuide } from './contributing';
import { mapRepoDetail } from './mappers';
import {
  createRepoTimingRecorder,
  getNow,
  type RepoTimingRecorder,
} from './timing';
import type { GitHubContentFile, GitHubIssue, GitHubRepoDetail } from './types';

type RepoDetailResult =
  | {
      ok: true;
      data: RepoDetailResponse;
      timingHeader: string;
    }
  | {
      ok: false;
      message: string;
      status: number;
      timingHeader: string;
    };

const fetchReadme = async (
  repo: GitHubRepoDetail,
  recordTiming: RepoTimingRecorder
) => {
  const start = getNow();
  const res = await fetch(
    `https://api.github.com/repos/${repo.full_name}/readme?ref=${repo.default_branch}`,
    { headers: getGithubHeaders(), next: { revalidate: 300 } }
  );
  recordTiming('readme fetch', start, `status=${res.status}`);

  if (!res.ok) return null;

  return (await res.json()) as GitHubContentFile;
};

const fetchIssues = async (
  repo: GitHubRepoDetail,
  recordTiming: RepoTimingRecorder
) => {
  const start = getNow();
  const res = await fetch(
    `https://api.github.com/repos/${repo.full_name}/issues?state=open&per_page=10`,
    { headers: getGithubHeaders(), next: { revalidate: 300 } }
  );
  recordTiming('issues fetch', start, `status=${res.status}`);

  if (!res.ok) return [];

  return (await res.json()) as GitHubIssue[];
};

export const getGithubRepoDetail = async (
  id: string
): Promise<RepoDetailResult> => {
  const totalStart = getNow();
  const { getHeader, record } = createRepoTimingRecorder();

  const repoStart = getNow();
  const repoRes = await fetch(`https://api.github.com/repositories/${id}`, {
    headers: getGithubHeaders(),
    next: { revalidate: 300 },
  });
  record('repo fetch', repoStart, `status=${repoRes.status}`);

  if (!repoRes.ok) {
    const error = await repoRes.json().catch(() => null);

    return {
      ok: false,
      message: error?.message ?? 'Failed to fetch repository',
      status: repoRes.status,
      timingHeader: getHeader(),
    };
  }

  const repo = (await repoRes.json()) as GitHubRepoDetail;
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
  const [readmeData, contributingData, issuesData] = await Promise.all([
    fetchReadme(repo, record),
    contributingPromise,
    fetchIssues(repo, record),
  ]);

  const data = mapRepoDetail({
    repo,
    readmeData,
    contributingData,
    issuesData,
  });

  record('total', totalStart, `repo=${repo.full_name}`);

  return {
    ok: true,
    data,
    timingHeader: getHeader(),
  };
};
