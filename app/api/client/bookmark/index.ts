import { RepoType } from '../../../_types/common';

export const addBookmarkClient = async (repo: RepoType) => {
  try {
    const res = await fetch('/api/bookmarks', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(repo),
    });
    return res.ok;
  } catch (err) {
    console.error(err);
  }
};

export const deleteBookmarkClient = async (repoId: number) => {
  try {
    const res = await fetch('/api/bookmarks', {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ repoId }),
    });
    return res.ok;
  } catch (err) {
    console.error('북마크 제거 실패', err);
  }
};
