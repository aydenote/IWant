export interface UploadedFileType {
  name: string;
  lastModified: number | string;
}

export type TechStackType = string[];
export type ProfileNameType = string;

export interface SaveProfileType {
  techStack: TechStackType;
  name: ProfileNameType;
}

export interface JobType {
  jobId: number;
  jobName: string;
  companyName: string;
  imageSrc?: string | null;
  place: string;
  career: string;
  employmentType: string;
}
