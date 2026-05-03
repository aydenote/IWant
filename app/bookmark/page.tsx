import Header from '../_components/header/Header';
import BookmarkClient from './BookmarkClient';
import { getBookmarkServer } from '../_services/server/bookmark';

export default async function Page() {
  const bookmarkRepoList = await getBookmarkServer();

  return (
    <div className="bg-[#f8fafc] min-h-screen">
      <Header />
      <BookmarkClient bookmarkRepoList={bookmarkRepoList} />
    </div>
  );
}
