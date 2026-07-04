import Header from '../_components/header/Header';
import { getBookmarkServer } from '../_services/server/bookmark';
import { getProfileServer } from '../_services/server/profile';
import { getRepoListServer } from '../_services/server/repo';
import HomeClient from '../(home)/_components/HomeClient';

export default async function Page() {
  const [bookmarkRepoList, profile] = await Promise.all([
    getBookmarkServer(),
    getProfileServer(),
  ]);
  const techStack = profile?.techStack ?? [];
  const repoList = await getRepoListServer({ techStack });

  return (
    <main>
      <Header />
      <HomeClient
        initialRepoList={repoList}
        bookmarkRepoList={bookmarkRepoList}
        profile={profile}
      />
    </main>
  );
}
