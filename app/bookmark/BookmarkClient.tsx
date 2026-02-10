'use client';

import { useState } from 'react';
import JobCard from '../(components)/JobCard';
import { JobType } from '../(types)/common';

interface BookmarkClientProps {
  bookmarkJobList: JobType[];
}
const BookmarkClient = ({ bookmarkJobList }: BookmarkClientProps) => {
  const [bookmarkList, setBookmarkList] = useState<JobType[]>(bookmarkJobList);

  return (
    <div className="p-10 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">즐겨찾기 공고</h1>
        <p className="text-sm text-muted-foreground mt-2">
          내가 저장한 공고를 한눈에 확인하세요.
        </p>
      </div>

      {bookmarkList.length === 0 ? (
        <div className="py-16 text-center text-muted-foreground">
          즐겨찾기한 공고가 없습니다.
        </div>
      ) : (
        bookmarkList.map((bookmark: JobType) => (
          <div
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-10"
            key={bookmark.jobId}
          >
            <JobCard
              key={bookmark.jobId}
              jobId={bookmark.jobId}
              jobName={bookmark.jobName}
              companyName={bookmark.companyName}
              imageSrc={bookmark.imageSrc}
              place={bookmark.place}
              career={bookmark.career}
              employmentType={bookmark.employmentType}
              bookmarkList={bookmarkList}
              setBookmarkList={setBookmarkList}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default BookmarkClient;
