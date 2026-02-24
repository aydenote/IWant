import type { ReactNode } from 'react';
import { getServerSession } from 'next-auth';
import Provider from '../(home)/provider';
import '../(styles)/global.css';
import { ToastProvider } from '../(components)/toast/Toast';
import { authOptions } from '../api/auth/[...nextauth]/route';

export const metadata = {
  title: 'IWant 북마크',
  description: 'IWant에서 북마크된 공고를 확인할 수 있는 페이지입니다',
};

export default async function MyPageLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="ko">
      <body>
        <Provider session={session}>
          <ToastProvider>{children}</ToastProvider>
        </Provider>
      </body>
    </html>
  );
}
