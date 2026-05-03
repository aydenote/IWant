'use client';

import { useState } from 'react';
import Hero from './Hero';
import RepoListClient from './RepoListClient';
import type { RepoListResponse } from '../../_types/repo';
import { RepoType } from '../../_types/repo';

interface HomeClientProps {
  initialRepoList: RepoListResponse[];
  bookmarkRepoList: RepoType[];
}
const HomeClient = ({ initialRepoList, bookmarkRepoList }: HomeClientProps) => {
  const [query, setQuery] = useState('');
  const [bookmarkList, setBookmarkList] = useState<RepoType[]>(bookmarkRepoList);

  return (
    <>
      <Hero
        value={query}
        onChange={setQuery}
        onSubmit={(q) => setQuery(q)}
        onReset={() => setQuery('')}
      />
      <RepoListClient
        repoList={initialRepoList}
        query={query}
        bookmarkList={bookmarkList}
        setBookmarkList={setBookmarkList}
      />
    </>
  );
};

export default HomeClient;
