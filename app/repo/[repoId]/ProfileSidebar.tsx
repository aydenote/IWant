import { CircleAlertIcon } from '../../_components/icons/CircleAlertIcon';
import { CircleCheckIcon } from '../../_components/icons/CircleCheckIcon';
import {
  calculateSkillMatchRate,
  extractSkillKeywords,
} from '../../_hooks/useSkillComparison';
import { ProfileResponse, RepoDetailResponse } from '../../_types/apis';
import SkillAlert from './SkillAlert';

interface ProfileSidebarProps {
  repo: RepoDetailResponse;
  profile: ProfileResponse | null;
}

const ProfileSidebar = ({ repo, profile }: ProfileSidebarProps) => {
  const extracted = extractSkillKeywords(repo);
  const { matchRate, matchedSkills, missingSkills } = calculateSkillMatchRate(
    extracted,
    profile?.techStack
  );

  return (
    <div className="rounded-lg border p-6 space-y-4 bg-gradient-card shadow-card sticky top-24">
      <h3 className="text-lg font-semibold text-foreground">
        레포 언어 매칭 결과
      </h3>
      <SkillAlert
        icon={<CircleCheckIcon />}
        title="보유기술"
        skills={profile?.techStack ?? []}
        type="success"
        emptyMessage="프로필에서 기술을 등록해 주세요."
      />
      <SkillAlert
        icon={<CircleCheckIcon />}
        title="매칭기술"
        skills={matchedSkills}
        type="accent"
        emptyMessage="매칭된 기술이 없습니다."
      />
      <SkillAlert
        icon={<CircleAlertIcon />}
        title="레포 사용 기술"
        skills={missingSkills}
        type="warning"
        emptyMessage="현재 기술스택과 모두 매칭됩니다."
      />
      <div className="pt-4 space-y-3 text-sm">
        <div className="flex justify-between text-muted-foreground">
          <span>주 언어</span>
          <span className="font-medium">{repo.language ?? '알 수 없음'}</span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>매칭률</span>
          <span className="font-medium text-primary">{matchRate}%</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;
