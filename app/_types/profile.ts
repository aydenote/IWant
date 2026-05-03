export type TechStackType = string[];
export type ProfileNameType = string;

export interface SaveProfileType {
  techStack: TechStackType;
  name: ProfileNameType;
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
