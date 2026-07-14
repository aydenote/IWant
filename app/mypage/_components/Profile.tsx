'use client';

import BasicButton from '../../_components/buttons/BasicButton';
import Surface from '../../_components/commons/Surface';
import { ProfileResponse } from '../../_types/profile';
import { useProfileForm } from '../_hooks/useProfileForm';
import ProfileBasicInfo from './ProfileBasicInfo';
import TechStackEditor from './TechStackEditor';

interface ProfileProps {
  profile: ProfileResponse | null;
}

const Profile = ({ profile }: ProfileProps) => {
  const {
    addSkill,
    name,
    newSkill,
    removeSkill,
    saveCurrentProfile,
    setName,
    setNewSkill,
    techStack,
  } = useProfileForm(profile);

  return (
    <Surface as="section" className="space-y-6" padding="lg" shadow="lg">
      <ProfileBasicInfo name={name} onNameChange={setName} />
      <TechStackEditor
        newSkill={newSkill}
        onAddSkill={addSkill}
        onNewSkillChange={setNewSkill}
        onRemoveSkill={removeSkill}
        techStack={techStack}
      />

      <div className="pt-6 border-t border-border">
        <BasicButton
          variant="default"
          onClick={saveCurrentProfile}
          className="w-full bg-gradient-hero cursor-pointer"
          size="lg"
        >
          프로필 저장
        </BasicButton>
      </div>
    </Surface>
  );
};

export default Profile;
