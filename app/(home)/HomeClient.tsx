'use client';

import { useState } from 'react';
import Hero from './Hero';
import JobListClient from '../(components)/JobListClient';
import type { JobListResponse } from '../(types)/apis';
import { JobType } from '../(types)/common';

interface HomeClientProps {
  initialJobList: JobListResponse[];
  bookmarkJobList: JobType[];
}
const HomeClient = ({ initialJobList, bookmarkJobList }: HomeClientProps) => {
  const [query, setQuery] = useState('');
  const [bookmarkList, setBookmarkList] = useState<JobType[]>(bookmarkJobList);

  return (
    <>
      <Hero
        value={query}
        onChange={setQuery}
        onSubmit={(q) => setQuery(q)}
        onReset={() => setQuery('')}
      />
      <JobListClient
        jobList={initialJobList}
        query={query}
        bookmarkList={bookmarkList}
        setBookmarkList={setBookmarkList}
      />
    </>
  );
};

export default HomeClient;
