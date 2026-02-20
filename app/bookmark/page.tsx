import Header from '../(components)/header/Header';
import BookmarkClient from './BookmarkClient';
import { getBookmarkServer } from '../apis/server/bookmark';

export default async function Page() {
  const bookmarkJobList = await getBookmarkServer();

  return (
    <div className="bg-[#f8fafc] min-h-screen">
      <Header />
      <BookmarkClient bookmarkJobList={bookmarkJobList} />
    </div>
  );
}
