import type { Metadata } from 'next';
import Header from '../_components/header/Header';
import { getBookmarkServer } from '../_services/server/bookmark';
import { getProfileServer } from '../_services/server/profile';
import { getRepoListServer } from '../_services/server/repo';
import HomeClient from '../(home)/_components/HomeClient';
import { isLocale, localeConfig, locales } from '../_i18n/config';
import { getMessages } from '../_i18n/messages';
import { getLocaleAlternates } from '../_utils/localeSeo';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export const generateMetadata = async ({
  params,
}: HomePageProps): Promise<Metadata> => {
  const { locale } = await params;

  if (!isLocale(locale)) return {};

  const messages = getMessages(locale);
  const title = messages.metadata.home.title;
  const description = messages.metadata.home.description;

  return {
    title,
    description,
    alternates: getLocaleAlternates(locale),
    openGraph: {
      title,
      description,
      url: `/${locale}`,
      siteName: 'IWant',
      type: 'website',
      locale: localeConfig[locale].openGraphLocale,
      alternateLocale: locales
        .filter((candidate) => candidate !== locale)
        .map((candidate) => localeConfig[candidate].openGraphLocale),
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
  };
};

export default async function Page() {
  const [bookmarkRepoList, profile] = await Promise.all([
    getBookmarkServer(),
    getProfileServer(),
  ]);
  const techStack = profile?.techStack ?? [];
  const repoList = await getRepoListServer({ techStack });

  return (
    <main>
      <Header />
      <HomeClient
        initialRepoList={repoList}
        bookmarkRepoList={bookmarkRepoList}
        profile={profile}
      />
    </main>
  );
}
