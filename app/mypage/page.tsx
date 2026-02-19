import Header from '../(components)/header/Header';
import { getProfile } from '../api/client/mypage/profile';
import MyPageClient from './MyPageClient';

export default async function Page() {
  const profile = await getProfile();

  return (
    <div className="bg-[#f8fafc] min-h-screen">
      <Header />
      <MyPageClient profile={profile} />
    </div>
  );
}
