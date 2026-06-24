import { NextResponse } from 'next/server';
import { getProfileServer } from '../../_services/server/profile';
import { getRepoListServer } from '../../_services/server/repo';

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const offset = Number(searchParams.get('offset') ?? '0');
  const limit = Number(searchParams.get('limit') ?? '20');
  const query = searchParams.get('query') ?? '';
  const requestedTechStack = searchParams.getAll('techStack');
  const profile =
    query.trim() || requestedTechStack.length > 0
      ? null
      : await getProfileServer();

  const data = await getRepoListServer({
    offset,
    query,
    limit,
    techStack: requestedTechStack.length
      ? requestedTechStack
      : profile?.techStack ?? [],
  });

  return NextResponse.json({ data });
};
