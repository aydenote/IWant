import Header from '../(components)/header/Header';
import { getBookmark } from '../api/client/bookmark';
import { getJobList } from '../api/client/jobs';
import HomeClient from './HomeClient';

export default async function Page() {
  const jobList = await getJobList();
  const bookmarkJobList = await getBookmark();

  return (
    <main>
      <Header />
      <HomeClient initialJobList={jobList} bookmarkJobList={bookmarkJobList} />
    </main>
  );
}
