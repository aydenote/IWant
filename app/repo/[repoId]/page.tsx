import Header from '../../(components)/header/Header';
import { getRepoDetailClient } from '../../api/client/repo';
import { getProfileServer } from '../../api/server/profile';
import RepoDetailClient from './RepoDetailClient';

export default async function Page({ params }: { params: { repoId: string } }) {
  const { repoId } = await params;
  const [repoDetail, profile] = await Promise.all([
    getRepoDetailClient(Number(repoId)),
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
