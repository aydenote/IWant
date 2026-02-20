'use client';

import { BookmarkIcon } from '../icons/BookmarkIcon';
import BasicButton from './BasicButton';
import { JobType } from '../../(types)/common';
import { useToast } from '../toast/Toast';
import {
  addBookmarkClient,
  deleteBookmarkClient,
} from '../../apis/client/bookmark';

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
  const { showToast } = useToast();

  const toggleBookmark = async () => {
    if (isBookmarked) {
      const success = await deleteBookmarkClient(job.jobId);
      setBookmarkList((prev) =>
        prev.filter((bookmark) => bookmark.jobId !== job.jobId)
      );
      if (success) {
        showToast('북마크가 성공적으로 제거되었습니다!', 'success');
      } else {
        showToast('북마크 제거에 실패했습니다.', 'error');
      }
    } else {
      const success = await addBookmarkClient(job);
      setBookmarkList((prev) => [...prev, job]);
      if (success) {
        showToast('북마크가 성공적으로 저장되었습니다!', 'success');
      } else {
        showToast('북마크 저장에 실패했습니다.', 'error');
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
