import { RepoListResponse } from '../_types/apis';

const useRepoFilter = (repoList: RepoListResponse[], query: string) => {
  return repoList.filter((repo) => {
    if (query) {
      const normalizedQuery = query.toLowerCase();
      const searchable = [
        repo.name,
        repo.fullName,
        repo.owner.login,
        repo.language,
        repo.description,
        ...repo.topics,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      if (!searchable.includes(normalizedQuery)) return false;
      return true;
    }
    return true;
  });
};

export default useRepoFilter;
