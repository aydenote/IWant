import { JobType } from '../../../(types)/common';

export const addBookmarkClient = async (job: JobType) => {
  try {
    const res = await fetch(`/db/bookmark`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(job),
    });
    return res.ok;
  } catch (err) {
    console.error(err);
  }
};

export const deleteBookmarkClient = async (jobId: number) => {
  try {
    const res = await fetch('/db/bookmark', {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ jobId }),
    });
    return res.ok;
  } catch (err) {
    console.error('북마크 제거 실패', err);
  }
};
