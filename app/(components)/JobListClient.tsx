'use client';

import Text from './Text';
import JobCard from './JobCard';
import type { JobListResponse } from '../types/apis';

interface JobListClientProps {
  jobList: JobListResponse[];
}

const JobListClient = ({ jobList }: JobListClientProps) => {
  return (
    <section className="p-12">
      <Text textSize="2xl" textBold="lg" textColor="black">
        전체 공고{jobList.length}
      </Text>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-10">
        {jobList.map((job) => (
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
