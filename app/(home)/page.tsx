import Header from '../(components)/header/Header';
import { getBookmarkServer } from '../api/server/bookmark';
import { getRepoListServer } from '../api/server/repo';
import HomeClient from './HomeClient';

export default async function Page() {
  const repoList = await getRepoListServer();
  const bookmarkRepoList = await getBookmarkServer();

  return (
    <main>
      <Header />
      <HomeClient initialRepoList={repoList} bookmarkRepoList={bookmarkRepoList} />
    </main>
  );
}
