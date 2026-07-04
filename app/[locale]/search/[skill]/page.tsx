import type { Metadata } from 'next';
import Header from '../../../_components/header/Header';
import { getBookmarkServer } from '../../../_services/server/bookmark';
import { getRepoListServer } from '../../../_services/server/repo';
import { toSearchSkillLabel } from '../../../_utils/searchSkill';
import SearchClient from '../../../search/[skill]/_components/SearchClient';
import {
  defaultLocale,
  isLocale,
  localeConfig,
} from '../../../_i18n/config';
import { formatMessage, getMessages } from '../../../_i18n/messages';

interface SearchPageProps {
  params: Promise<{ locale: string; skill: string }>;
}

export const generateMetadata = async ({
  params,
}: SearchPageProps): Promise<Metadata> => {
  const { locale: localeParam, skill: skillSlug } = await params;
  const locale = isLocale(localeParam) ? localeParam : defaultLocale;
  const messages = getMessages(locale);
  const skill = toSearchSkillLabel(skillSlug);
  const title = formatMessage(messages.metadata.search.titleTemplate, {
    skill,
  });
  const description = formatMessage(
    messages.metadata.search.descriptionTemplate,
    { skill }
  );

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      siteName: 'IWant',
      type: 'website',
      locale: localeConfig[locale].openGraphLocale,
    },
    twitter: {
      card: 'summary',
      title,
      description,
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
