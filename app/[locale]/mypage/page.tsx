import Header from '../../_components/header/Header';
import { getProfileServer } from '../../_services/server/profile';
import MyPageClient from '../../mypage/_components/MyPageClient';

export default async function Page() {
  const profile = await getProfileServer();

  return (
    <div className="bg-[#f8fafc] min-h-screen">
      <Header />
      <MyPageClient profile={profile} />
    </div>
  );
}
