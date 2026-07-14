'use client';

import { RepoListResponse } from '../_types/repo';
import { localeConfig } from '../_i18n/config';
import { getMessages } from '../_i18n/messages';
import { useInfiniteScroll } from './useInfiniteScroll';
import { useLocale } from './useLocale';
import useRepoFilter from './useRepoFilter';

interface UseRepoListViewParams {
  heading?: string;
  query: string;
  repoList: RepoListResponse[];
  techStack: string[];
}

export const useRepoListView = ({
  heading,
  query,
  repoList,
  techStack,
}: UseRepoListViewParams) => {
  const locale = useLocale();
  const messages = getMessages(locale);
  const numberFormatter = new Intl.NumberFormat(
    localeConfig[locale].languageTag
  );
  const { repos, isLoading, anchorRef } = useInfiniteScroll(
    repoList,
    query,
    techStack
  );
  const filteredRepoList = useRepoFilter(repos, query);
  const hasTechStack = techStack.length > 0;
  const defaultHeading = query.trim()
    ? messages.repoList.searchResults
    : hasTechStack
    ? messages.repoList.recommended
    : messages.repoList.all;

  return {
    anchorRef,
    filteredRepoList,
    formatNumber: (value: number) => numberFormatter.format(value),
    isLoading,
    listHeading: heading ?? defaultHeading,
    messages,
  };
};
