import Header from '../_components/header/Header';
import { getBookmarkServer } from '../_services/server/bookmark';
import { getRepoListServer } from '../_services/server/repo';
import HomeClient from './_components/HomeClient';

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
