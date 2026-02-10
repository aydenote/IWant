import Header from '../(components)/header/Header';
import MyPageClient from './MyPageClient';

export default async function Page() {
  return (
    <div className="bg-[#f8fafc] min-h-screen">
      <Header />
      <MyPageClient />
    </div>
  );
}
