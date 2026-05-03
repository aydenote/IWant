import type { ReactNode } from 'react';

export const metadata = {
  title: 'IWant 관심 레포',
  description: 'IWant에서 저장한 관심 레포를 확인할 수 있는 페이지입니다',
};

export default async function MyPageLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
