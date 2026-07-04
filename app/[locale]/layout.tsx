import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { isLocale, localeConfig, locales } from '../_i18n/config';
import { getMessages } from '../_i18n/messages';

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export const generateStaticParams = () =>
  locales.map((locale) => ({ locale }));

export const generateMetadata = async ({
  params,
}: Omit<LocaleLayoutProps, 'children'>): Promise<Metadata> => {
  const { locale } = await params;

  if (!isLocale(locale)) return {};

  const messages = getMessages(locale);
  const title = messages.metadata.home.title;
  const description = messages.metadata.home.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
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

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!isLocale(locale)) notFound();

  return children;
}
