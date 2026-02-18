'use client';

import Image from 'next/image';
import Link from 'next/link';
import { JobType } from '../../(types)/common';
import BuildingIcon from '../icons/BuildingIcon';
import BookmarkButton from '../buttons/BookmarkButton';
import MapPinIcon from '../icons/MapPinIcon';
import UsersIcon from '../icons/UsersIcon';
import BasicButton from '../buttons/BasicButton';

interface JobCardProps extends JobType {
  bookmarkList: JobType[];
  setBookmarkList: React.Dispatch<React.SetStateAction<JobType[]>>;
}

const JobCard = ({
  jobId,
  jobName,
  companyName,
  imageSrc,
  place,
  career,
  employmentType,
  bookmarkList,
  setBookmarkList,
}: JobCardProps) => {
  const safeSrc =
    imageSrc && imageSrc.length > 0
      ? imageSrc
      : 'https://static.wanted.co.kr/images/profile_default.png';
  return (
    <div className="rounded-lg text-card-foreground shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 border-border hover:border-primary/30 bg-gradient-card">
      <div className="relative h-40 bg-muted">
        <Image
          src={safeSrc}
          width={400}
          height={400}
          alt="회사 이미지"
          className="w-full h-full object-cover"
          loading="eager"
        />
      </div>
      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-2 flex-1">
            <Link href={`/job/${jobId}`}>
              <h3 className="text-lg font-semibold text-foreground hover:text-primary transition-colors line-clamp-1">
                {jobName}
              </h3>
            </Link>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <BuildingIcon className="h-4 w-4" />
              <span className="font-medium">{companyName}</span>
            </div>
          </div>
          <BookmarkButton
            job={{
              jobId,
              jobName,
              companyName,
              imageSrc: safeSrc,
              place,
              career,
              employmentType,
            }}
            bookmarkList={bookmarkList}
            setBookmarkList={setBookmarkList}
          />
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPinIcon className="h-4 w-4" />
            <span>{place}</span>
          </div>
          <div className="flex items-center gap-1">
            <UsersIcon className="h-4 w-4" />
            <span>{employmentType === 'regular' ? '정직원' : '인턴'}</span>
          </div>
        </div>
        <div className="pt-2 border-t border-border" />
        <div className="flex items-center justify-between pt-2">
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-accent text-accent">
            {career}
          </div>
          <a href={`/job/${jobId}`}>
            <BasicButton className="cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3 bg-gradient-hero">
              상세보기
            </BasicButton>
          </a>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
