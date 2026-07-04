import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import {
  getLocalizedPath,
  getPreferredLocale,
  isLocale,
  localeCookieName,
} from '../_i18n/config';

export default async function Page() {
  const [cookieStore, requestHeaders] = await Promise.all([
    cookies(),
    headers(),
  ]);
  const storedLocale = cookieStore.get(localeCookieName)?.value;
  const locale =
    storedLocale && isLocale(storedLocale)
      ? storedLocale
      : getPreferredLocale(requestHeaders.get('accept-language'));

  redirect(getLocalizedPath(locale));
}
