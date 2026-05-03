import Header from '../../_components/header/Header';
import { getRepoDetailServer } from '../../_services/server/repo';
import { getProfileServer } from '../../_services/server/profile';
import RepoDetailClient from './_components/RepoDetailClient';

export default async function Page({ params }: { params: { repoId: string } }) {
  const { repoId } = await params;
  const [repoDetail, profile] = await Promise.all([
    getRepoDetailServer(Number(repoId)).catch((err) => {
      console.error('Repository detail page failed to load repo detail', err);
      return null;
    }),
    getProfileServer().catch((err) => {
      console.error('Repository detail page failed to load profile', err);
      return null;
    }),
  ]);

  if (!repoDetail) {
    return (
      <div className="bg-[#f8fafc] min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-16">
          <div className="rounded-lg border bg-card p-8 text-card-foreground shadow-lg">
            <h1 className="text-2xl font-semibold">
              레포 정보를 불러오지 못했습니다.
            </h1>
            <p className="mt-3 text-sm text-muted-foreground">
              GitHub API 응답 또는 배포 환경 변수를 확인한 뒤 다시 시도해
              주세요.
            </p>
          </div>
        </main>
      </div>
    );
  }

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
