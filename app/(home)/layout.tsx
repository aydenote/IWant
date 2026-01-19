import '../(styles)/global.css';
import type { ReactNode } from 'react';

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
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
