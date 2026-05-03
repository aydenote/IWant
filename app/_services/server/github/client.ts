export const getGithubHeaders = () => {
  const token = process.env.GITHUB_TOKEN ?? process.env.GITHUB_ACCESS_TOKEN;

  return {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};
