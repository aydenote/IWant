import Header from '../(components)/header/Header';
import { getBookmarkServer } from '../api/server/bookmark';
import { getRepoListServer } from '../api/server/repo';
import HomeClient from './HomeClient';

export default async function Page() {
  const [repoList, bookmarkRepoList] = await Promise.all([
    getRepoListServer(),
    getBookmarkServer(),
  ]);

  return (
    <main>
      <Header />
      <HomeClient
        initialRepoList={repoList}
        bookmarkRepoList={bookmarkRepoList}
      />
    </main>
  );
}
