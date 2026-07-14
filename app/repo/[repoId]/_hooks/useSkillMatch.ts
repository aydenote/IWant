import { ProfileResponse } from '../../../_types/profile';
import { RepoDetailResponse } from '../../../_types/repo';
import {
  calculateSkillMatchRate,
  extractSkillKeywords,
} from '../../../_utils/skillComparison';

export const useSkillMatch = ({
  profile,
  repo,
}: {
  profile: ProfileResponse | null;
  repo: RepoDetailResponse;
}) => {
  const extractedSkills = extractSkillKeywords(repo);

  return calculateSkillMatchRate(extractedSkills, profile?.techStack);
};
