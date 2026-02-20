import type { ReactNode } from 'react';
import { getServerSession } from 'next-auth';
import Provider from '../(home)/provider';
import { authOptions } from '../apis/auth/[...nextauth]/route';
import '../(styles)/global.css';
import { ToastProvider } from '../(components)/toast/Toast';

export const metadata = {
  title: 'IWant 마이페이지',
  description: 'IWant에서 회원정보를 확인하고 수정할 수 있는 페이지입니다',
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
