import Header from '../(components)/header/Header';
import BookmarkClient from './BookmarkClient';
import { getBookmark } from '../api/client/bookmark/index';

export default async function Page() {
  const bookmarkJobList = await getBookmark();

  return (
    <div className="bg-[#f8fafc] min-h-screen">
      <Header />
      <BookmarkClient bookmarkJobList={bookmarkJobList} />
    </div>
  );
}
