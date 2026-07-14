'use client';

import Hero from '../../../(home)/_components/Hero';
import RepoListClient from '../../../(home)/_components/RepoListClient';
import type { RepoListResponse, RepoType } from '../../../_types/repo';
import { formatMessage, getMessages } from '../../../_i18n/messages';
import { useLocale } from '../../../_hooks/useLocale';
import { useBookmarkList } from '../../../_hooks/useBookmarkList';
import { useRepoSearchNavigation } from '../../../_hooks/useRepoSearchNavigation';

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
  const messages = getMessages(locale);
  const { resetSearch, searchValue, setSearchValue, submitSearch } =
    useRepoSearchNavigation(skill);
  const { bookmarkList, setBookmarkList } = useBookmarkList(bookmarkRepoList);

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
        techStack={[skill]}
        heading={formatMessage(messages.repoList.skillHeadingTemplate, {
          skill,
        })}
        bookmarkList={bookmarkList}
        setBookmarkList={setBookmarkList}
      />
    </>
  );
};

export default SearchClient;
