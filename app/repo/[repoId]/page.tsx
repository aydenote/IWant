import type { Metadata } from 'next';
import { permanentRedirect } from 'next/navigation';

interface RepoDetailPageProps {
  params: Promise<{ repoId: string }>;
}

export const metadata: Metadata = {
  title: '오픈소스 레포 상세 | IWant',
  description:
    'IWant에서 GitHub 오픈소스 레포의 README, 기여 가이드, good first issue를 확인해보세요.',
};

export default async function RepoDetailPage({
  params,
}: RepoDetailPageProps) {
  const { repoId } = await params;
  permanentRedirect(`/ko/repo/${repoId}`);
}
