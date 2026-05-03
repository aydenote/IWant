import { RepoDetailResponse } from '../../../_types/apis';
import { headers } from 'next/headers';

const getOrigin = async () => {
  const headerStore = await headers();
  const protocol = headerStore.get('x-forwarded-proto') ?? 'http';
  const host = headerStore.get('host');

  if (!host) {
    return process.env.NEXT_PUBLIC_SITE_URL ?? process.env.NEXTAUTH_URL ?? '';
  }

  return `${protocol}://${host}`;
};

export const getRepoDetailClient = async (
  id: number
): Promise<RepoDetailResponse> => {
  const origin = await getOrigin();
  const url = `${origin}/api/repos/${id}`;
  const res = await fetch(url, { cache: 'no-store' });

  if (!res.ok) throw new Error('Failed to fetch repository detail');
  const data = await res.json();
  return data.data as RepoDetailResponse;
};
