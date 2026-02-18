'use client';

import Text from '../(components)/commons/Text';
import type { JobListResponse } from '../(types)/apis';
import useJobFilter from '../(hooks)/useJobFilter';
import { JobType } from '../(types)/common';
import { useInfiniteScroll } from '../(hooks)/useInfiniteScroll';
import JobCard from '../(components)/job/JobCard';

interface JobListClientProps {
  jobList: JobListResponse[];
  bookmarkList: JobType[];
  setBookmarkList: React.Dispatch<React.SetStateAction<JobType[]>>;
  query: string;
}

const JobListClient = ({
  jobList,
  query,
  bookmarkList,
  setBookmarkList,
}: JobListClientProps) => {
  const { jobs, isLoading, anchorRef } = useInfiniteScroll(jobList, query);
  const filteredJobList = useJobFilter(jobs, query);

  return (
    <section className="p-12">
      <Text textSize="2xl" textBold="lg" textColor="black">
        {query.trim()
          ? `검색 결과(${filteredJobList.length})`
          : `전체 공고(${filteredJobList.length})`}
      </Text>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-10">
        {filteredJobList.map((job) => (
          <JobCard
            key={job.id}
            jobId={job.id}
            jobName={job.position}
            companyName={job.company.name}
            imageSrc={job.title_img.thumb}
            place={job.address.location + ' ' + job.address.district}
            career={`경력 ${job.annual_from}-${job.annual_to}년`}
            employmentType={job.employment_type}
            bookmarkList={bookmarkList}
            setBookmarkList={setBookmarkList}
          />
        ))}
      </div>
      <div ref={anchorRef} className="h-8" />
      {isLoading && <p className="text-center text-sm">불러오는 중...</p>}
    </section>
  );
};

export default JobListClient;
