import Header from '../(components)/header/Header';
import { getJobList } from '../api/client/jobs';
import HomeClient from './HomeClient';

export default async function Page() {
  const jobList = await getJobList();

  return (
    <main>
      <Header />
      <HomeClient initialJobList={jobList} />
    </main>
  );
}
