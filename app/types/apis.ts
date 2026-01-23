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
