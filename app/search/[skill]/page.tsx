import type { Metadata } from 'next';
import Header from '../../_components/header/Header';
import { getBookmarkServer } from '../../_services/server/bookmark';
import { getRepoListServer } from '../../_services/server/repo';
import { toSearchSkillLabel } from '../../_utils/searchSkill';
import SearchClient from './_components/SearchClient';

interface SearchPageProps {
  params: Promise<{ skill: string }>;
}

export const generateMetadata = async ({
  params,
}: SearchPageProps): Promise<Metadata> => {
  const { skill: skillSlug } = await params;
  const skill = toSearchSkillLabel(skillSlug);

  return {
    title: `${skill} 오픈소스 기여 레포 추천 | IWant`,
    description: `${skill} 기술로 기여하기 좋은 오픈소스 레포와 good first issue를 찾아보세요.`,
    openGraph: {
      title: `${skill} 오픈소스 기여 레포 추천 | IWant`,
      description: `${skill} 기반으로 참여하기 좋은 오픈소스 레포를 모아 보여줍니다.`,
    },
  };
};

export default async function SearchPage({ params }: SearchPageProps) {
  const { skill: skillSlug } = await params;
  const skill = toSearchSkillLabel(skillSlug);
  const [repoList, bookmarkRepoList] = await Promise.all([
    getRepoListServer({ techStack: [skill] }),
    getBookmarkServer(),
  ]);

  return (
    <main>
      <Header />
      <SearchClient
        initialRepoList={repoList}
        bookmarkRepoList={bookmarkRepoList}
        skill={skill}
      />
    </main>
  );
}
