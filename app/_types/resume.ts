export interface ResumeResponse {
  ok: boolean;
  resumeName?: string | null;
  resumeUrl?: string | null;
  modifiedDate?: bigint | null;
  message?: string | null;
}

export interface UploadedFileType {
  name: string;
  lastModified: number | string;
}
