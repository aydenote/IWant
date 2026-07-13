import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { getServerSession } from 'next-auth';
import { headers } from 'next/headers';
import Provider from './(home)/provider';
import './_styles/global.css';
import { Analytics } from '@vercel/analytics/next';
import { ToastProvider } from './_components/toast/Toast';
import { authOptions } from './api/auth/[...nextauth]/route';
import { defaultLocale, isLocale, localeConfig } from './_i18n/config';
import { getSiteUrl } from './_utils/siteUrl';

const defaultDescription =
  'IWant helps developers discover GitHub open source repositories, good first issues, and contribution guides based on their tech stack.';

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: 'IWant',
  description: defaultDescription,
  openGraph: {
    title: 'IWant',
    description: defaultDescription,
    siteName: 'IWant',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'IWant',
    description: defaultDescription,
  },
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [session, requestHeaders] = await Promise.all([
    getServerSession(authOptions),
    headers(),
  ]);
  const localeHeader = requestHeaders.get('x-iwant-locale');
  const locale =
    localeHeader && isLocale(localeHeader) ? localeHeader : defaultLocale;

  return (
    <html lang={localeConfig[locale].languageTag}>
      <body>
        <Analytics />
        <Provider session={session}>
          <ToastProvider>{children}</ToastProvider>
        </Provider>
      </body>
    </html>
  );
}
