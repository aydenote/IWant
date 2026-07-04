'use client';

import { usePathname } from 'next/navigation';
import {
  localeConfig,
  localeCookieName,
  locales,
  replacePathLocale,
  type Locale,
} from '../../_i18n/config';
import { getMessages } from '../../_i18n/messages';
import { useLocale } from '../../_hooks/useLocale';

const LanguageSwitcher = () => {
  const locale = useLocale();
  const messages = getMessages(locale);
  const pathname = usePathname();

  const switchLocale = (nextLocale: Locale) => {
    if (nextLocale === locale) return;

    const nextPath = replacePathLocale(pathname, nextLocale);
    document.cookie = `${localeCookieName}=${nextLocale}; Max-Age=31536000; Path=/; SameSite=Lax`;
    window.location.assign(
      `${nextPath}${window.location.search}${window.location.hash}`
    );
  };

  return (
    <div
      aria-label={messages.navigation.language}
      className="inline-flex h-9 shrink-0 items-center rounded-md border border-input bg-background p-0.5 shadow-sm"
      role="group"
    >
      {locales.map((candidate) => {
        const isActive = candidate === locale;

        return (
          <button
            aria-pressed={isActive}
            className={`h-7 min-w-9 cursor-pointer rounded px-2 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${
              isActive
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            }`}
            key={candidate}
            onClick={() => switchLocale(candidate)}
            title={localeConfig[candidate].label}
            type="button"
          >
            {candidate.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
};

export default LanguageSwitcher;
