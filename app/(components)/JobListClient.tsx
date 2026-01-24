'use client';

import Text from './Text';
import JobCard from './JobCard';
import type { JobListResponse } from '../(types)/apis';
import useJobFilter from '../(hooks)/useJobFilter';

interface JobListClientProps {
  jobList: JobListResponse[];
  query: string;
}

const JobListClient = ({ jobList, query }: JobListClientProps) => {
  const filteredJobList = useJobFilter(jobList, query);

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
          />
        ))}
      </div>
    </section>
  );
};

export default JobListClient;
