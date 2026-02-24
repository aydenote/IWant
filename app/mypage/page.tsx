import Header from '../(components)/header/Header';
import { getProfileServer } from '../api/server/profile';
import { getResumeServer } from '../api/server/resume';
import MyPageClient from './MyPageClient';

export default async function Page() {
  const [resume, profile] = await Promise.all([
    getResumeServer(),
    getProfileServer(),
  ]);

  return (
    <div className="bg-[#f8fafc] min-h-screen">
      <Header />
      <MyPageClient profile={profile} resume={resume} />
    </div>
  );
}
