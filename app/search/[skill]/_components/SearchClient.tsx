'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Hero from '../../../(home)/_components/Hero';
import RepoListClient from '../../../(home)/_components/RepoListClient';
import { toSearchSkillSlug } from '../../../_utils/searchSkill';
import type { RepoListResponse, RepoType } from '../../../_types/repo';
import { getLocalizedPath } from '../../../_i18n/config';
import { useLocale } from '../../../_hooks/useLocale';

interface SearchClientProps {
  initialRepoList: RepoListResponse[];
  bookmarkRepoList: RepoType[];
  skill: string;
}

const SearchClient = ({
  initialRepoList,
  bookmarkRepoList,
  skill,
}: SearchClientProps) => {
  const locale = useLocale();
  const router = useRouter();
  const [searchValue, setSearchValue] = useState(skill);
  const [bookmarkList, setBookmarkList] =
    useState<RepoType[]>(bookmarkRepoList);

  useEffect(() => {
    setSearchValue(skill);
  }, [skill]);

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
        techStack={[skill]}
        heading={`${skill} 오픈소스 레포`}
        bookmarkList={bookmarkList}
        setBookmarkList={setBookmarkList}
      />
    </>
  );
};

export default SearchClient;
