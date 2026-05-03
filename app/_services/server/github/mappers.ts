import type { RepoDetailResponse, RepoIssueResponse } from '../../../_types/apis';
import type { GitHubContentFile, GitHubIssue, GitHubRepoDetail } from './types';

const decodeBase64 = (content: string) =>
  Buffer.from(content.replace(/\n/g, ''), 'base64').toString('utf-8');

export const mapIssue = (issue: GitHubIssue): RepoIssueResponse => ({
  id: issue.id,
  number: issue.number,
  title: issue.title,
  htmlUrl: issue.html_url,
  labels: issue.labels.map((label) => label.name),
  comments: issue.comments,
  createdAt: issue.created_at,
});

export const mapRepoDetail = ({
  repo,
  readmeData,
  contributingData,
  issuesData,
}: {
  repo: GitHubRepoDetail;
  readmeData: GitHubContentFile | null;
  contributingData: GitHubContentFile | null;
  issuesData: GitHubIssue[];
}): RepoDetailResponse => ({
  id: repo.id,
  name: repo.name,
  fullName: repo.full_name,
  description: repo.description,
  htmlUrl: repo.html_url,
  owner: {
    login: repo.owner.login,
    avatarUrl: repo.owner.avatar_url,
    htmlUrl: repo.owner.html_url,
  },
  language: repo.language,
  topics: repo.topics ?? [],
  stars: repo.stargazers_count,
  forks: repo.forks_count,
  openIssues: repo.open_issues_count,
  updatedAt: repo.updated_at,
  license: repo.license?.name ?? null,
  defaultBranch: repo.default_branch,
  readme: readmeData?.content ? decodeBase64(readmeData.content) : null,
  readmeHtmlUrl: readmeData?.html_url ?? null,
  readmePath: readmeData?.path ?? null,
  contributing: contributingData?.content
    ? decodeBase64(contributingData.content)
    : null,
  contributingHtmlUrl: contributingData?.html_url ?? null,
  contributingPath: contributingData?.path ?? null,
  issues: issuesData.filter((issue) => !issue.pull_request).map(mapIssue),
});
