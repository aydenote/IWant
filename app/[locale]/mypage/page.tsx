import Header from '../../_components/header/Header';
import { getProfileServer } from '../../_services/server/profile';
import { getResumeServer } from '../../_services/server/resume';
import MyPageClient from '../../mypage/_components/MyPageClient';

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
