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
