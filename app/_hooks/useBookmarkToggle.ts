'use client';

import type { Dispatch, SetStateAction } from 'react';
import { RepoType } from '../_types/repo';
import { useToast } from '../_components/toast/Toast';
import { getMessages } from '../_i18n/messages';
import { useLocale } from './useLocale';
import {
  addBookmarkClient,
  deleteBookmarkClient,
} from '../_services/client/bookmark';

interface UseBookmarkToggleParams {
  bookmarkList: RepoType[];
  repo: RepoType;
  setBookmarkList: Dispatch<SetStateAction<RepoType[]>>;
}

export const useBookmarkToggle = ({
  bookmarkList,
  repo,
  setBookmarkList,
}: UseBookmarkToggleParams) => {
  const locale = useLocale();
  const messages = getMessages(locale);
  const { showToast } = useToast();
  const isBookmarked = bookmarkList.some(
    (bookmark) => bookmark.repoId === repo.repoId
  );

  const toggleBookmark = async () => {
    if (isBookmarked) {
      const success = await deleteBookmarkClient(repo.repoId);
      setBookmarkList((prev) =>
        prev.filter((bookmark) => bookmark.repoId !== repo.repoId)
      );
      showToast(
        success ? messages.bookmark.removed : messages.bookmark.removeFailed,
        success ? 'success' : 'error'
      );
      return;
    }

    const success = await addBookmarkClient(repo);
    setBookmarkList((prev) => [...prev, repo]);
    showToast(
      success ? messages.bookmark.added : messages.bookmark.addFailed,
      success ? 'success' : 'error'
    );
  };

  return {
    isBookmarked,
    toggleBookmark,
  };
};
