'use client';

import { useState } from 'react';
import Hero from './Hero';
import JobListClient from '../(components)/JobListClient';
import type { JobListResponse } from '../(types)/apis';

interface HomeClientProps {
  initialJobList: JobListResponse[];
}
const HomeClient = ({ initialJobList }: HomeClientProps) => {
  const [query, setQuery] = useState('');

  return (
    <>
      <Hero
        value={query}
        onChange={setQuery}
        onSubmit={(q) => setQuery(q)}
        onReset={() => setQuery('')}
      />
      <JobListClient jobList={initialJobList} query={query} />
    </>
  );
};

export default HomeClient;
