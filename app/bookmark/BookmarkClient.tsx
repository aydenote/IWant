'use client';

import { useState } from 'react';
import { RepoType } from '../_types/common';
import RepoCard from '../_components/repo/RepoCard';

interface BookmarkClientProps {
  bookmarkRepoList: RepoType[];
}
const BookmarkClient = ({ bookmarkRepoList }: BookmarkClientProps) => {
  const [bookmarkList, setBookmarkList] = useState<RepoType[]>(bookmarkRepoList);

  return (
    <div className="p-10 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">관심 레포</h1>
        <p className="text-sm text-muted-foreground mt-2">
          내가 저장한 오픈소스 레포를 한눈에 확인하세요.
        </p>
      </div>

      {bookmarkList.length === 0 ? (
        <div className="py-16 text-center text-muted-foreground">
          저장한 관심 레포가 없습니다.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-10">
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
        </div>
      )}
    </div>
  );
};

export default BookmarkClient;
