import Header from '../(components)/header/Header';
import { getBookmarkServer } from '../apis/server/bookmark';
import { getJobListServer } from '../apis/server/job';
import HomeClient from './HomeClient';

export default async function Page() {
  const jobList = await getJobListServer();
  const bookmarkJobList = await getBookmarkServer();

  return (
    <main>
      <Header />
      <HomeClient initialJobList={jobList} bookmarkJobList={bookmarkJobList} />
    </main>
  );
}
