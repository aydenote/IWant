import Header from '../../_components/header/Header';
import { getRepoDetailServer } from '../../_services/server/repo';
import { getProfileServer } from '../../_services/server/profile';
import RepoDetailClient from './_components/RepoDetailClient';

export default async function Page({ params }: { params: { repoId: string } }) {
  const { repoId } = await params;
  const [repoDetail, profile] = await Promise.all([
    getRepoDetailServer(Number(repoId)),
    getProfileServer(),
  ]);

  return (
    <div className="bg-[#f8fafc] min-h-screen">
      <Header />
      <RepoDetailClient
        repoId={Number(repoId)}
        repo={repoDetail}
        profile={profile}
      />
    </div>
  );
}
