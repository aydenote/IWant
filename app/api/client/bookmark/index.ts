import { JobType } from '../../../(types)/common';

export const getBookmark = async () => {
  try {
    const res = await fetch('/api/server/bookmark');
    const data = await res.json();
    return data.favorites ?? [];
  } catch (err) {
    console.log('북마크 불러오기 실패', err);
    return [];
  }
};

export const addBookmark = async (job: JobType) => {
  try {
    const res = await fetch('/api/server/bookmark', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(job),
    });
    if (res.ok) {
      console.log('북마크 성공');
    }
  } catch (err) {
    console.log('북마크 실패', err);
  }
};

export const deleteBookmark = async (jobId: number) => {
  try {
    const res = await fetch('/api/server/bookmark', {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ jobId }),
    });
    if (res.ok) {
      console.log('북마크 제거 성공');
    }
  } catch (err) {
    console.log('북마크 제거 실패', err);
  }
};
