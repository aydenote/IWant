'use client';

import { BookmarkIcon } from '../icons/BookmarkIcon';
import BasicButton from './BasicButton';
import { RepoType } from '../../_types/repo';
import { useBookmarkToggle } from '../../_hooks/useBookmarkToggle';

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
  const { isBookmarked, toggleBookmark } = useBookmarkToggle({
    bookmarkList,
    repo,
    setBookmarkList,
  });

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
