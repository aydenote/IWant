import { CircleAlertIcon } from '../../../_components/icons/CircleAlertIcon';
import { CircleCheckIcon } from '../../../_components/icons/CircleCheckIcon';
import { ProfileResponse } from '../../../_types/profile';
import { RepoDetailResponse } from '../../../_types/repo';
import SkillAlert from './SkillAlert';
import { getMessages } from '../../../_i18n/messages';
import { useLocale } from '../../../_hooks/useLocale';
import { useSkillMatch } from '../_hooks/useSkillMatch';
import Surface from '../../../_components/commons/Surface';

interface ProfileSidebarProps {
  repo: RepoDetailResponse;
  profile: ProfileResponse | null;
}

const ProfileSidebar = ({ repo, profile }: ProfileSidebarProps) => {
  const locale = useLocale();
  const messages = getMessages(locale);
  const { matchRate, matchedSkills, missingSkills } = useSkillMatch({
    profile,
    repo,
  });

  return (
    <Surface className="space-y-4 sticky top-24">
      <h3 className="text-lg font-semibold text-foreground">
        {messages.repoDetail.skillMatchTitle}
      </h3>
      <SkillAlert
        icon={<CircleCheckIcon />}
        title={messages.repoDetail.mySkills}
        skills={profile?.techStack ?? []}
        type="success"
        emptyMessage={messages.repoDetail.registerSkills}
      />
      <SkillAlert
        icon={<CircleCheckIcon />}
        title={messages.repoDetail.matchedSkills}
        skills={matchedSkills}
        type="accent"
        emptyMessage={messages.repoDetail.noMatchedSkills}
      />
      <SkillAlert
        icon={<CircleAlertIcon />}
        title={messages.repoDetail.repoSkills}
        skills={missingSkills}
        type="warning"
        emptyMessage={messages.repoDetail.allSkillsMatched}
      />
      <div className="pt-4 space-y-3 text-sm">
        <div className="flex justify-between text-muted-foreground">
          <span>{messages.repoDetail.primaryLanguage}</span>
          <span className="font-medium">
            {repo.language ?? messages.repoDetail.unknown}
          </span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>{messages.repoDetail.matchRate}</span>
          <span className="font-medium text-primary">{matchRate}%</span>
        </div>
      </div>
    </Surface>
  );
};

export default ProfileSidebar;
