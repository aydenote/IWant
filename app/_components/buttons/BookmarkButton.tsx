'use client';

import { BookmarkIcon } from '../icons/BookmarkIcon';
import BasicButton from './BasicButton';
import { RepoType } from '../../_types/common';
import { useToast } from '../toast/Toast';
import {
  addBookmarkClient,
  deleteBookmarkClient,
} from '../../api/client/bookmark';

interface BookmarkButtonProps {
  repo: RepoType;
  bookmarkList: RepoType[];
  setBookmarkList: React.Dispatch<React.SetStateAction<RepoType[]>>;
}

const BookmarkButton = ({
  repo,
  bookmarkList,
  setBookmarkList,
}: BookmarkButtonProps) => {
  const bookmarkRepoIds = bookmarkList.map(
    (bookmark: RepoType) => bookmark.repoId
  );
  const isBookmarked = bookmarkRepoIds.includes(repo.repoId);
  const { showToast } = useToast();

  const toggleBookmark = async () => {
    if (isBookmarked) {
      const success = await deleteBookmarkClient(repo.repoId);
      setBookmarkList((prev) =>
        prev.filter((bookmark) => bookmark.repoId !== repo.repoId)
      );
      if (success) {
        showToast('관심 레포에서 제거되었습니다.', 'success');
      } else {
        showToast('관심 레포 제거에 실패했습니다.', 'error');
      }
    } else {
      const success = await addBookmarkClient(repo);
      setBookmarkList((prev) => [...prev, repo]);
      if (success) {
        showToast('관심 레포로 저장되었습니다.', 'success');
      } else {
        showToast('관심 레포 저장에 실패했습니다.', 'error');
      }
    }
  };

  return (
    <BasicButton
      variant={isBookmarked ? 'secondary' : 'outline'}
      className="cursor-pointer"
      onClick={() => toggleBookmark()}
    >
      <BookmarkIcon
        className={`h-5 w-5 ${isBookmarked ? 'text-primary' : ''}`}
      />
    </BasicButton>
  );
};

export default BookmarkButton;
