'use client';

import { BookmarkIcon } from '../icons/BookmarkIcon';
import BasicButton from './BasicButton';
import { RepoType } from '../../_types/repo';
import { useToast } from '../toast/Toast';
import { getMessages } from '../../_i18n/messages';
import { useLocale } from '../../_hooks/useLocale';
import {
  addBookmarkClient,
  deleteBookmarkClient,
} from '../../_services/client/bookmark';

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
  const locale = useLocale();
  const messages = getMessages(locale);
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
        showToast(messages.bookmark.removed, 'success');
      } else {
        showToast(messages.bookmark.removeFailed, 'error');
      }
    } else {
      const success = await addBookmarkClient(repo);
      setBookmarkList((prev) => [...prev, repo]);
      if (success) {
        showToast(messages.bookmark.added, 'success');
      } else {
        showToast(messages.bookmark.addFailed, 'error');
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
