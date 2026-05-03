export interface RepoListResponse {
  id: number;
  name: string;
  fullName: string;
  description: string | null;
  htmlUrl: string;
  owner: {
    login: string;
    avatarUrl: string;
    htmlUrl: string;
  };
  language: string | null;
  topics: string[];
  stars: number;
  forks: number;
  openIssues: number;
  updatedAt: string;
  license: string | null;
}

export interface RepoIssueResponse {
  id: number;
  number: number;
  title: string;
  htmlUrl: string;
  labels: string[];
  comments: number;
  createdAt: string;
}

export interface RepoDetailResponse extends RepoListResponse {
  defaultBranch: string;
  readme: string | null;
  readmeHtmlUrl: string | null;
  readmePath: string | null;
  contributing: string | null;
  contributingHtmlUrl: string | null;
  contributingPath: string | null;
  issues: RepoIssueResponse[];
}

export interface RepoType {
  repoId: number;
  repoName: string;
  ownerName: string;
  imageSrc?: string | null;
  stars: string;
  language: string;
  openIssues: string;
}
