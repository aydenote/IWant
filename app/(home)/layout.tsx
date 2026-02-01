import type { ReactNode } from 'react';
import { getServerSession } from 'next-auth';
import Provider from './provider';
import { authOptions } from '../api/auth/[...nextauth]/route';
import '../(styles)/global.css';

export const metadata = {
  title: 'IWant',
  description:
    'JD와 개인이 입력한 스킬셋으로 본인에게 맞는 포지션을 찾도록 도와주는 서비스입니다',
};

export default async function RootLayout({
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
