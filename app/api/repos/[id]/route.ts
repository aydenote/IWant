import { NextResponse } from 'next/server';
import { getGithubRepoDetail } from '../../../_services/server/github/repo-detail';

export const GET = async (
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id } = await params;
  const result = await getGithubRepoDetail(id);

  if (!result.ok) {
    return NextResponse.json(
      { ok: false, message: result.message },
      {
        headers: { 'Server-Timing': result.timingHeader },
        status: result.status,
      }
    );
  }

  return NextResponse.json(
    { data: result.data },
    { headers: { 'Server-Timing': result.timingHeader } }
  );
};
