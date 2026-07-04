import { NextRequest, NextResponse } from 'next/server';
import { defaultLocale, isLocale } from './app/_i18n/config';

export const proxy = (request: NextRequest) => {
  const [, localeSegment] = request.nextUrl.pathname.split('/');
  const locale = isLocale(localeSegment) ? localeSegment : defaultLocale;
  const requestHeaders = new Headers(request.headers);

  requestHeaders.set('x-iwant-locale', locale);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
};

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)'],
};
