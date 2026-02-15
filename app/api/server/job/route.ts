import { NextResponse } from 'next/server';
import { PAGE_ITEM_LIMIT } from '../../../(constants)/job';

export const GET = async (req: Request) => {
  const url = new URL(req.url);
  const offset = url.searchParams.get('offset') ?? '0';
  const query = url.searchParams.get('query') ?? '';
  const limit = url.searchParams.get('limit') ?? PAGE_ITEM_LIMIT;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}/navigation/v1/results?1765229525360=&job_group_id=518&job_ids=669&country=kr&years=0&locations=all&offset=${offset}&query=${query}&limit=${limit}`,
    {
      cache: 'no-store',
    }
  );

  if (!res.ok) {
    return NextResponse.json({ ok: false }, { status: res.status });
  }

  const data = await res.json();
  return NextResponse.json(data);
};
