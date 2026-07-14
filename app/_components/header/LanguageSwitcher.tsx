'use client';

import { useLanguageSwitcher } from '../../_hooks/useLanguageSwitcher';

const LanguageSwitcher = () => {
  const { languageLabel, localeOptions, switchLocale } =
    useLanguageSwitcher();

  return (
    <div
      aria-label={languageLabel}
      className="inline-flex h-9 shrink-0 items-center rounded-md border border-input bg-background p-0.5 shadow-sm"
      role="group"
    >
      {localeOptions.map(({ isActive, label, text, value }) => {
        return (
          <button
            aria-pressed={isActive}
            className={`h-7 min-w-9 cursor-pointer rounded px-2 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${
              isActive
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            }`}
            key={value}
            onClick={() => switchLocale(value)}
            title={label}
            type="button"
          >
            {text}
          </button>
        );
      })}
    </div>
  );
};

export default LanguageSwitcher;
