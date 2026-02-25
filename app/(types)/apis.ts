export interface JobListResponse {
  id: number;
  company: { name: string; id: number };
  address: { location: string; district: string };
  position: string;
  annual_from: number;
  skill_tags: number[];
  employment_type: 'regular' | 'intern';
  title_img: {
    origin: string;
    thumb: string;
  };
  annual_to: number;
}

export interface JobDetailResponse {
  title_images: string[];
  detail: {
    benefits: string;
    hire_rounds: string;
    intro: string;
    main_tasks: string;
    preferred_points: string;
    requirements: string;
    position: string;
  };
  company: {
    name: string;
  };
  skill_tags: {
    tag_type_id: number;
    text: string;
  }[];
  address: {
    district: string;
    location: string;
  };
  employment_type: 'regular' | 'intern';
  annual_to: number;
  annual_from: number;
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
