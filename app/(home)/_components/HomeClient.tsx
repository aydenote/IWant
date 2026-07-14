'use client';

import Hero from './Hero';
import RepoListClient from './RepoListClient';
import type { RepoListResponse } from '../../_types/repo';
import { RepoType } from '../../_types/repo';
import { ProfileResponse } from '../../_types/profile';
import { useBookmarkList } from '../../_hooks/useBookmarkList';
import { useRepoSearchNavigation } from '../../_hooks/useRepoSearchNavigation';

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
  const { resetSearch, searchValue, setSearchValue, submitSearch } =
    useRepoSearchNavigation();
  const { bookmarkList, setBookmarkList } = useBookmarkList(bookmarkRepoList);
  const techStack = profile?.techStack ?? [];

  return (
    <>
      <Hero
        value={searchValue}
        onChange={setSearchValue}
        onSubmit={submitSearch}
        onReset={resetSearch}
      />
      <RepoListClient
        repoList={initialRepoList}
        query=""
        techStack={techStack}
        bookmarkList={bookmarkList}
        setBookmarkList={setBookmarkList}
      />
    </>
  );
};

export default HomeClient;
