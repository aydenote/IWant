const shouldLogRepoTiming =
  process.env.NODE_ENV !== 'production' ||
  process.env.DEBUG_REPO_TIMING === 'true';

export const getNow = () => performance.now();

export type RepoTimingRecorder = (
  label: string,
  start: number,
  detail?: string
) => void;

const logRepoTiming: RepoTimingRecorder = (label, start, detail) => {
  if (!shouldLogRepoTiming) return;

  const elapsed = Math.round(getNow() - start);
  console.log(
    `[repo detail timing] ${label}: ${elapsed}ms${detail ? ` (${detail})` : ''}`
  );
};

export const createRepoTimingRecorder = () => {
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
