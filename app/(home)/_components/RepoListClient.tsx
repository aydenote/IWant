'use client';

import Text from '../../_components/commons/Text';
import type { RepoListResponse } from '../../_types/repo';
import useRepoFilter from '../../_hooks/useRepoFilter';
import { RepoType } from '../../_types/repo';
import { useInfiniteScroll } from '../../_hooks/useInfiniteScroll';
import RepoCard from '../../_components/repo/RepoCard';

interface RepoListClientProps {
  repoList: RepoListResponse[];
  bookmarkList: RepoType[];
  setBookmarkList: React.Dispatch<React.SetStateAction<RepoType[]>>;
  query: string;
}

const RepoListClient = ({
  repoList,
  query,
  bookmarkList,
  setBookmarkList,
}: RepoListClientProps) => {
  const { repos, isLoading, anchorRef } = useInfiniteScroll(repoList, query);
  const filteredRepoList = useRepoFilter(repos, query);

  return (
    <section className="p-12">
      <Text textSize="2xl" textBold="lg" textColor="black">
        {query.trim()
          ? `검색 결과(${filteredRepoList.length})`
          : `전체 레포(${filteredRepoList.length})`}
      </Text>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-10">
        {filteredRepoList.map((repo, index) => (
          <RepoCard
            key={repo.id}
            repoId={repo.id}
            repoName={repo.fullName}
            ownerName={repo.owner.login}
            imageSrc={repo.owner.avatarUrl}
            stars={`${repo.stars.toLocaleString()} stars`}
            language={repo.language ?? 'Language unknown'}
            openIssues={`${repo.openIssues.toLocaleString()} open issues`}
            bookmarkList={bookmarkList}
            setBookmarkList={setBookmarkList}
            priorityImage={index < 3}
          />
        ))}
      </div>
      <div ref={anchorRef} className="h-8" />
      {isLoading && <p className="text-center text-sm">불러오는 중...</p>}
    </section>
  );
};

export default RepoListClient;
