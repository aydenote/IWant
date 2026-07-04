import type { Metadata } from 'next';
import Header from '../../../_components/header/Header';
import {
  getRepoDetailServer,
  getRepoSummaryServer,
} from '../../../_services/server/repo';
import { getProfileServer } from '../../../_services/server/profile';
import RepoDetailClient from '../../../repo/[repoId]/_components/RepoDetailClient';
import {
  defaultLocale,
  isLocale,
  localeConfig,
  type Locale,
} from '../../../_i18n/config';
import { formatMessage, getMessages } from '../../../_i18n/messages';
import { getLocaleAlternates } from '../../../_utils/localeSeo';

interface RepoDetailPageProps {
  params: Promise<{ locale: string; repoId: string }>;
}

const toValidRepoId = (repoId: string) => {
  const parsedRepoId = Number(repoId);

  return Number.isInteger(parsedRepoId) && parsedRepoId > 0
    ? parsedRepoId
    : null;
};

const buildRepoDescription = ({
  description,
  language,
  openIssues,
  topics,
  locale,
}: {
  description: string | null;
  language: string | null;
  openIssues: number;
  topics: string[];
  locale: Locale;
}) => {
  const metadataMessages = getMessages(locale).metadata.repo;
  const numberFormatter = new Intl.NumberFormat(
    localeConfig[locale].languageTag
  );
  const repoSummary =
    description ??
    formatMessage(metadataMessages.summaryFallbackTemplate, {
      language: language ?? getMessages(locale).repoDetail.unknown,
    });
  const topicText =
    topics.length > 0
      ? formatMessage(metadataMessages.topicsTemplate, {
          topics: topics.slice(0, 4).join(', '),
        })
      : '';

  return formatMessage(metadataMessages.descriptionTemplate, {
    summary: repoSummary,
    openIssues: numberFormatter.format(openIssues),
    topics: topicText,
  });
};

export const generateMetadata = async ({
  params,
}: RepoDetailPageProps): Promise<Metadata> => {
  const { locale: localeParam, repoId } = await params;
  const locale = isLocale(localeParam) ? localeParam : defaultLocale;
  const messages = getMessages(locale);
  const parsedRepoId = toValidRepoId(repoId);

  if (parsedRepoId === null) {
    return {
      title: messages.metadata.repo.fallbackTitle,
      description: messages.metadata.repo.fallbackDescription,
    };
  }

  const repo = await getRepoSummaryServer(parsedRepoId);

  if (!repo) {
    return {
      title: messages.metadata.repo.fallbackTitle,
      description: messages.metadata.repo.fallbackDescription,
    };
  }

  const title = formatMessage(messages.metadata.repo.titleTemplate, {
    repo: repo.fullName,
  });
  const description = buildRepoDescription({ ...repo, locale });
  const canonicalPath = `/repo/${repo.id}`;

  return {
    title,
    description,
    alternates: getLocaleAlternates(locale, canonicalPath),
    keywords: [
      repo.name,
      repo.fullName,
      repo.owner.login,
      repo.language,
      ...repo.topics,
      locale === 'ko' ? '오픈소스 기여' : 'open source contribution',
      'good first issue',
    ].filter((keyword): keyword is string => Boolean(keyword)),
    openGraph: {
      title,
      description,
      url: `/${locale}${canonicalPath}`,
      siteName: 'IWant',
      type: 'article',
      locale: localeConfig[locale].openGraphLocale,
      images: [
        {
          url: repo.owner.avatarUrl,
          alt: `${repo.owner.login} GitHub avatar`,
        },
      ],
    },
    twitter: {
      card: 'summary',
      title,
      description,
      images: [repo.owner.avatarUrl],
    },
  };
};

export default async function Page({ params }: RepoDetailPageProps) {
  const { locale: localeParam, repoId } = await params;
  const locale = isLocale(localeParam) ? localeParam : defaultLocale;
  const messages = getMessages(locale);
  const parsedRepoId = toValidRepoId(repoId);

  if (parsedRepoId === null) {
    return (
      <div className="bg-[#f8fafc] min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-16">
          <div className="rounded-lg border bg-card p-8 text-card-foreground shadow-lg">
            <h1 className="text-2xl font-semibold">
              {messages.errors.repoLoadTitle}
            </h1>
            <p className="mt-3 text-sm text-muted-foreground">
              {messages.errors.invalidRepoId}
            </p>
          </div>
        </main>
      </div>
    );
  }

  const [repoDetail, profile] = await Promise.all([
    getRepoDetailServer(parsedRepoId).catch((err) => {
      console.error('Repository detail page failed to load repo detail', err);
      return null;
    }),
    getProfileServer().catch((err) => {
      console.error('Repository detail page failed to load profile', err);
      return null;
    }),
  ]);

  if (!repoDetail) {
    return (
      <div className="bg-[#f8fafc] min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-16">
          <div className="rounded-lg border bg-card p-8 text-card-foreground shadow-lg">
            <h1 className="text-2xl font-semibold">
              {messages.errors.repoLoadTitle}
            </h1>
            <p className="mt-3 text-sm text-muted-foreground">
              {messages.errors.repoLoadDescription}
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-[#f8fafc] min-h-screen">
      <Header />
      <RepoDetailClient
        repoId={parsedRepoId}
        repo={repoDetail}
        profile={profile}
      />
    </div>
  );
}
