export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  owner: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
  language: string | null;
  topics?: string[];
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  updated_at: string;
  license: { name: string } | null;
}

export interface GitHubRepoDetail extends GitHubRepo {
  default_branch: string;
}

export interface GitHubIssue {
  id: number;
  number: number;
  title: string;
  html_url: string;
  labels: { name: string }[];
  comments: number;
  created_at: string;
  pull_request?: unknown;
}

export interface GitHubContentFile {
  content?: string;
  download_url?: string | null;
  html_url?: string;
  path?: string;
  type?: string;
}

export interface GitHubCommunityProfile {
  files?: {
    contributing?: {
      url?: string;
      download_url?: string | null;
      html_url?: string;
      path?: string;
    } | null;
  };
}
