import { NextResponse } from 'next/server';
import { getRepoListServer } from '../../_services/server/repo';

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const offset = Number(searchParams.get('offset') ?? '0');
  const limit = Number(searchParams.get('limit') ?? '20');
  const query = searchParams.get('query') ?? '';
  const data = await getRepoListServer(offset, query, limit);

  return NextResponse.json({ data });
};
