import type { ReactNode } from 'react';
import { getServerSession } from 'next-auth';
import Provider from '../../(home)/provider';
import '../../(styles)/global.css';
import { authOptions } from '../../api/auth/[...nextauth]/route';

export const metadata = {
  title: 'IWant 공고 상세',
  description:
    'IWant에 있는 구인 공고의 상세 정보를 확인할 수 있는 페이지입니다',
};

export default async function JobDetailLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="ko">
      <body>
        <Provider session={session}>{children}</Provider>
      </body>
    </html>
  );
}
