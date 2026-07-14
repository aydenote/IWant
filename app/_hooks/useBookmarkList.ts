'use client';

import { useState } from 'react';
import type { RepoType } from '../_types/repo';

export const useBookmarkList = (initialBookmarkList: RepoType[]) => {
  const [bookmarkList, setBookmarkList] =
    useState<RepoType[]>(initialBookmarkList);

  return {
    bookmarkList,
    setBookmarkList,
  };
};
