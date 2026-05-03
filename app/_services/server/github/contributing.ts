import { getGithubHeaders } from './client';
import type { GitHubCommunityProfile, GitHubContentFile } from './types';
import { getNow, type RepoTimingRecorder } from './timing';

const CONTRIBUTING_FALLBACK_PATHS = [
  'CONTRIBUTING.md',
  '.github/CONTRIBUTING.md',
  'docs/CONTRIBUTING.md',
];

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

  const data = (await res.json()) as GitHubContentFile;

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

export const fetchContributingGuide = async (
  repoFullName: string,
  ref: string,
  recordTiming: RepoTimingRecorder
) => {
  const start = getNow();
  let data = await fetchFallbackContributingGuide(
    repoFullName,
    ref,
    recordTiming
  );

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
