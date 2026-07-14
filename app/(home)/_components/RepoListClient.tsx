'use client';

import Text from '../../_components/commons/Text';
import type { RepoListResponse } from '../../_types/repo';
import { RepoType } from '../../_types/repo';
import RepoCard from '../../_components/repo/RepoCard';
import { useRepoListView } from '../../_hooks/useRepoListView';

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
  const {
    anchorRef,
    filteredRepoList,
    formatNumber,
    isLoading,
    listHeading,
    messages,
  } = useRepoListView({
    heading,
    query,
    repoList,
    techStack,
  });

  return (
    <section className="p-12">
      <Text textSize="2xl" textBold="lg" textColor="black">
        {`${listHeading}(${filteredRepoList.length})`}
      </Text>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-10">
        {filteredRepoList.map((repo, index) => (
          <RepoCard
            key={repo.id}
            repoId={repo.id}
            repoName={repo.fullName}
            ownerName={repo.owner.login}
            imageSrc={repo.owner.avatarUrl}
            stars={`${formatNumber(repo.stars)} ${messages.repoCard.stars}`}
            language={repo.language ?? messages.repoCard.unknownLanguage}
            openIssues={`${formatNumber(repo.openIssues)} ${messages.repoCard.openIssues}`}
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
