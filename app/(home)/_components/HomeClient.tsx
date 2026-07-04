'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Hero from './Hero';
import RepoListClient from './RepoListClient';
import type { RepoListResponse } from '../../_types/repo';
import { RepoType } from '../../_types/repo';
import { ProfileResponse } from '../../_types/profile';
import { toSearchSkillSlug } from '../../_utils/searchSkill';
import { getLocalizedPath } from '../../_i18n/config';
import { useLocale } from '../../_hooks/useLocale';

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
  const locale = useLocale();
  const router = useRouter();
  const [searchValue, setSearchValue] = useState('');
  const [bookmarkList, setBookmarkList] =
    useState<RepoType[]>(bookmarkRepoList);
  const techStack = profile?.techStack ?? [];

  const handleSearch = (value: string) => {
    const skillSlug = toSearchSkillSlug(value);
    if (!skillSlug) return;

    router.push(getLocalizedPath(locale, `/search/${skillSlug}`));
  };

  return (
    <>
      <Hero
        value={searchValue}
        onChange={setSearchValue}
        onSubmit={handleSearch}
        onReset={() => setSearchValue('')}
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
