'use client';

import Text from '../../_components/commons/Text';
import type { RepoListResponse } from '../../_types/repo';
import useRepoFilter from '../../_hooks/useRepoFilter';
import { RepoType } from '../../_types/repo';
import { useInfiniteScroll } from '../../_hooks/useInfiniteScroll';
import RepoCard from '../../_components/repo/RepoCard';
import { getMessages } from '../../_i18n/messages';
import { localeConfig } from '../../_i18n/config';
import { useLocale } from '../../_hooks/useLocale';

interface RepoListClientProps {
  repoList: RepoListResponse[];
  bookmarkList: RepoType[];
  setBookmarkList: React.Dispatch<React.SetStateAction<RepoType[]>>;
  query: string;
  techStack: string[];
  heading?: string;
}

const RepoListClient = ({
  repoList,
  query,
  techStack,
  heading,
  bookmarkList,
  setBookmarkList,
}: RepoListClientProps) => {
  const locale = useLocale();
  const messages = getMessages(locale);
  const numberFormatter = new Intl.NumberFormat(
    localeConfig[locale].languageTag
  );
  const { repos, isLoading, anchorRef } = useInfiniteScroll(
    repoList,
    query,
    techStack
  );
  const filteredRepoList = useRepoFilter(repos, query);
  const hasTechStack = techStack.length > 0;
  const defaultHeading = query.trim()
    ? messages.repoList.searchResults
    : hasTechStack
    ? messages.repoList.recommended
    : messages.repoList.all;

  return (
    <section className="p-12">
      <Text textSize="2xl" textBold="lg" textColor="black">
        {`${heading ?? defaultHeading}(${filteredRepoList.length})`}
      </Text>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-10">
        {filteredRepoList.map((repo, index) => (
          <RepoCard
            key={repo.id}
            repoId={repo.id}
            repoName={repo.fullName}
            ownerName={repo.owner.login}
            imageSrc={repo.owner.avatarUrl}
            stars={`${numberFormatter.format(repo.stars)} ${messages.repoCard.stars}`}
            language={repo.language ?? messages.repoCard.unknownLanguage}
            openIssues={`${numberFormatter.format(repo.openIssues)} ${messages.repoCard.openIssues}`}
            bookmarkList={bookmarkList}
            setBookmarkList={setBookmarkList}
            priorityImage={index < 3}
          />
        ))}
      </div>
      <div ref={anchorRef} className="h-8" />
      {isLoading && (
        <p className="text-center text-sm">{messages.repoList.loading}</p>
      )}
    </section>
  );
};

export default RepoListClient;
