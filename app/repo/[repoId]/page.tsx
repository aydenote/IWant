import { permanentRedirect } from 'next/navigation';

interface RepoDetailPageProps {
  params: Promise<{ repoId: string }>;
}

export default async function RepoDetailPage({
  params,
}: RepoDetailPageProps) {
  const { repoId } = await params;
  permanentRedirect(`/ko/repo/${repoId}`);
}
