'use client';

import { useState } from 'react';
import Hero from './Hero';
import RepoListClient from './RepoListClient';
import type { RepoListResponse } from '../../_types/repo';
import { RepoType } from '../../_types/repo';
import { ProfileResponse } from '../../_types/profile';

interface HomeClientProps {
  initialRepoList: RepoListResponse[];
  bookmarkRepoList: RepoType[];
  profile: ProfileResponse | null;
}
const HomeClient = ({
  initialRepoList,
  bookmarkRepoList,
  profile,
}: HomeClientProps) => {
  const [query, setQuery] = useState('');
  const [bookmarkList, setBookmarkList] =
    useState<RepoType[]>(bookmarkRepoList);
  const techStack = profile?.techStack ?? [];

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
        techStack={techStack}
        bookmarkList={bookmarkList}
        setBookmarkList={setBookmarkList}
      />
    </>
  );
};

export default HomeClient;
