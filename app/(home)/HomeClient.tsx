'use client';

import Hero from './Hero';
import JobListClient from '../(components)/JobListClient';
import type { JobListResponse } from '../types/apis';

interface HomeClientProps {
  initialJobList: JobListResponse[];
}
const HomeClient = ({ initialJobList }: HomeClientProps) => {
  return (
    <>
      <Hero />
      <JobListClient jobList={initialJobList} />
    </>
  );
};

export default HomeClient;
