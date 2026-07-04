import type { Metadata } from 'next';
import Header from '../../../_components/header/Header';
import {
  getRepoDetailServer,
  getRepoSummaryServer,
} from '../../../_services/server/repo';
import { getProfileServer } from '../../../_services/server/profile';
import RepoDetailClient from '../../../repo/[repoId]/_components/RepoDetailClient';
import { defaultLocale, isLocale } from '../../../_i18n/config';
import { getMessages } from '../../../_i18n/messages';

interface RepoDetailPageProps {
  params: Promise<{ locale: string; repoId: string }>;
}

const FALLBACK_TITLE = 'IWant 레포 상세 | IWant';
const FALLBACK_DESCRIPTION =
  'IWant에서 오픈소스 레포의 README, 기여 가이드, good first issue를 확인해보세요.';

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
}: {
  description: string | null;
  language: string | null;
  openIssues: number;
  topics: string[];
}) => {
  const repoSummary =
    description ??
    `${language ?? '오픈소스'} 기반으로 기여할 수 있는 GitHub 레포입니다.`;
  const topicText =
    topics.length > 0 ? ` 주요 토픽: ${topics.slice(0, 4).join(', ')}.` : '';

  return `${repoSummary} 열린 이슈 ${openIssues.toLocaleString()}개와 README 정보를 IWant에서 확인해보세요.${topicText}`;
};

export const generateMetadata = async ({
  params,
}: RepoDetailPageProps): Promise<Metadata> => {
  const { repoId } = await params;
  const parsedRepoId = toValidRepoId(repoId);

  if (parsedRepoId === null) {
    return {
      title: FALLBACK_TITLE,
      description: FALLBACK_DESCRIPTION,
    };
  }

  const repo = await getRepoSummaryServer(parsedRepoId);

  if (!repo) {
    return {
      title: FALLBACK_TITLE,
      description: FALLBACK_DESCRIPTION,
    };
  }

  const title = `${repo.fullName} 오픈소스 기여 이슈 | IWant`;
  const description = buildRepoDescription(repo);

  return {
    title,
    description,
    keywords: [
      repo.name,
      repo.fullName,
      repo.owner.login,
      repo.language,
      ...repo.topics,
      '오픈소스 기여',
      'good first issue',
    ].filter((keyword): keyword is string => Boolean(keyword)),
    openGraph: {
      title,
      description,
      url: `/repo/${repo.id}`,
      siteName: 'IWant',
      type: 'article',
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
    alternates: {
      canonical: `/repo/${repo.id}`,
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
