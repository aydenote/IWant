import type { ReactNode } from 'react';

export const metadata = {
  title: 'IWant 레포 상세',
  description:
    'IWant에 있는 오픈소스 레포의 README와 이슈를 확인할 수 있는 페이지입니다',
};

export default async function RepoDetailLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
