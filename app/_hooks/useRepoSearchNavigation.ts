'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getLocalizedPath } from '../_i18n/config';
import { toSearchSkillSlug } from '../_utils/searchSkill';
import { useLocale } from './useLocale';

export const useRepoSearchNavigation = (initialValue = '') => {
  const locale = useLocale();
  const router = useRouter();
  const [searchValue, setSearchValue] = useState(initialValue);

  useEffect(() => {
    setSearchValue(initialValue);
  }, [initialValue]);

  const submitSearch = (value: string) => {
    const skillSlug = toSearchSkillSlug(value);
    if (!skillSlug) return;

    router.push(getLocalizedPath(locale, `/search/${skillSlug}`));
  };

  const resetSearch = () => setSearchValue('');

  return {
    resetSearch,
    searchValue,
    setSearchValue,
    submitSearch,
  };
};
