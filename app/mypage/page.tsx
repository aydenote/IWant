import Header from '../(components)/header/Header';
import { getProfile } from '../api/client/mypage/profile';
import { getResume } from '../api/server/resume/route';
import MyPageClient from './MyPageClient';

export default async function Page() {
  const [resume, profile] = await Promise.all([getResume(), getProfile()]);

  return (
    <div className="bg-[#f8fafc] min-h-screen">
      <Header />
      <MyPageClient profile={profile} resume={resume} />
    </div>
  );
}
