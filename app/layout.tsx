import type { ReactNode } from 'react';
import { getServerSession } from 'next-auth';
import Provider from './(home)/provider';
import './_styles/global.css';
import { ToastProvider } from './_components/toast/Toast';
import { authOptions } from './api/auth/[...nextauth]/route';

export const metadata = {
  title: {
    default: 'IWant',
    template: '%s | IWant',
  },
  description:
    '개인이 입력한 기술스택으로 기여 가능한 오픈소스 레포를 찾도록 도와주는 서비스입니다',
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
        <Provider session={session}>
          <ToastProvider>{children}</ToastProvider>
        </Provider>
      </body>
    </html>
  );
}
