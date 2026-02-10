'use client';

import { BookmarkIcon } from '../icons/BookmarkIcon';
import BasicButton from './BasicButton';
import { addBookmark, deleteBookmark } from '../../api/client/bookmark';
import { JobType } from '../../(types)/common';

interface BookmarkButtonProps {
  job: JobType;
  bookmarkList: JobType[];
  setBookmarkList: React.Dispatch<React.SetStateAction<JobType[]>>;
}

const BookmarkButton = ({
  job,
  bookmarkList,
  setBookmarkList,
}: BookmarkButtonProps) => {
  const bookmarkJobIds = bookmarkList.map(
    (bookmark: JobType) => bookmark.jobId
  );
  const isBookmarked = bookmarkJobIds.includes(job.jobId);

  const toggleBookmark = async () => {
    if (isBookmarked) {
      await deleteBookmark(job.jobId);
      setBookmarkList((prev) =>
        prev.filter((bookmark) => bookmark.jobId !== job.jobId)
      );
    } else {
      await addBookmark(job);
      setBookmarkList((prev) => [...prev, job]);
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
