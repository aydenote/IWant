import { useEffect, useState } from 'react';
import { BookmarkIcon } from '../icons/BookmarkIcon';
import BasicButton from './BasicButton';
import {
  addBookmark,
  deleteBookmark,
  getBookmark,
} from '../../api/client/bookmark';
import { JobType } from '../../(types)/common';

interface BookmarkButtonProps {
  job: JobType;
}

const BookmarkButton = ({ job }: BookmarkButtonProps) => {
  const [favoriteIds, setFavoriteIds] = useState<Set<number>>(new Set());
  const isBookmarked = favoriteIds.has(job.jobId);

  useEffect(() => {
    const loadFavoritedJobs = async () => {
      const favorites = await getBookmark();
      setFavoriteIds(new Set(favorites));
    };
    loadFavoritedJobs();
  }, []);

  const toggleBookmark = async () => {
    setFavoriteIds((prev) => {
      const next = new Set(prev);
      if (isBookmarked) next.delete(job.jobId);
      else next.add(job.jobId);
      return next;
    });

    if (isBookmarked) await deleteBookmark(job.jobId);
    else await addBookmark(job);
  };

  return (
    <BasicButton
      variant={favoriteIds.has(job.jobId) ? 'secondary' : 'outline'}
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
