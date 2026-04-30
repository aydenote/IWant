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
  issues: RepoIssueResponse[];
}

export interface ProfileResponse {
  id: string;
  resumeName: string | null;
  resumeUrl: string | null;
  techStack: string[];
  updatedAt: Date | null;
  user: {
    id: string;
    name: string | null;
    email: string | null;
    image: string | null;
    emailVerified: Date | null;
  };
  userId: string;
}

export interface ResumeResponse {
  ok: boolean;
  resumeName?: string | null;
  resumeUrl?: string | null;
  modifiedDate?: bigint | null;
  message?: string | null;
}
