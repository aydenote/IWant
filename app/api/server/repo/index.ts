'use server';

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

export const getRepoListServer = async (offset = 0, query = '', limit = 20) => {
  try {
    const origin = await getOrigin();
    const params = new URLSearchParams({
      offset: String(offset),
      query,
      limit: String(limit),
    });
    const res = await fetch(`${origin}/api/repos?${params}`, {
      cache: 'no-store',
    });

    const data = await res.json();
    return data.data;
  } catch (err) {
    console.error(err);
    return [];
  }
};
