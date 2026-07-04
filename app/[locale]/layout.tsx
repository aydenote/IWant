import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { isLocale, locales } from '../_i18n/config';

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export const generateStaticParams = () =>
  locales.map((locale) => ({ locale }));

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!isLocale(locale)) notFound();

  return children;
}
