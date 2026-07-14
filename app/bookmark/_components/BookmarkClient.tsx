'use client';

import { RepoType } from '../../_types/repo';
import RepoCard from '../../_components/repo/RepoCard';
import { useBookmarkList } from '../../_hooks/useBookmarkList';
import EmptyState from '../../_components/commons/EmptyState';
import RepoGrid from '../../_components/commons/RepoGrid';

interface BookmarkClientProps {
  bookmarkRepoList: RepoType[];
}
const BookmarkClient = ({ bookmarkRepoList }: BookmarkClientProps) => {
  const { bookmarkList, setBookmarkList } = useBookmarkList(bookmarkRepoList);

  return (
    <div className="p-10 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">관심 레포</h1>
        <p className="text-sm text-muted-foreground mt-2">
          내가 저장한 오픈소스 레포를 한눈에 확인하세요.
        </p>
      </div>

      {bookmarkList.length === 0 ? (
        <EmptyState message="저장한 관심 레포가 없습니다." />
      ) : (
        <RepoGrid className="mt-10">
          {bookmarkList.map((bookmark: RepoType) => (
            <RepoCard
              key={bookmark.repoId}
              repoId={bookmark.repoId}
              repoName={bookmark.repoName}
              ownerName={bookmark.ownerName}
              imageSrc={bookmark.imageSrc}
              stars={bookmark.stars}
              language={bookmark.language}
              openIssues={bookmark.openIssues}
              bookmarkList={bookmarkList}
              setBookmarkList={setBookmarkList}
            />
          ))}
        </RepoGrid>
      )}
    </div>
  );
};

export default BookmarkClient;
