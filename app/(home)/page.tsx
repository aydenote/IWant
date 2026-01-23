import Header from '../(components)/header/Header';
import HomeClient from './HomeClient';
import { getJobList } from '../(apis)/job';

export default async function Page() {
  const jobList = await getJobList();

  return (
    <main>
      <Header />
      <HomeClient initialJobList={jobList} />
    </main>
  );
}
