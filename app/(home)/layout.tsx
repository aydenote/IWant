import type { ReactNode } from 'react';

export const metadata = {
  title: 'IWant',
  description:
    '개인이 입력한 기술스택으로 기여 가능한 오픈소스 레포를 찾도록 도와주는 서비스입니다',
};

export default function HomeLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
