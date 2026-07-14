'use client';

import { useState } from 'react';
import { useToast } from '../../_components/toast/Toast';
import {
  ProfileResponse,
  SaveProfileType,
  TechStackType,
} from '../../_types/profile';
import { updateProfileClient } from '../../_services/client/profile';

export const useProfileForm = (profile: ProfileResponse | null) => {
  const [name, setName] = useState(profile?.user.name ?? '');
  const [newSkill, setNewSkill] = useState('');
  const [techStack, setTechStack] = useState<TechStackType>(
    profile?.techStack ?? []
  );
  const { showToast } = useToast();

  const addSkill = () => {
    const value = newSkill.trim();
    if (!value || techStack.includes(value)) return;

    setTechStack((prev) => [...prev, value]);
    setNewSkill('');
  };

  const removeSkill = (skill: string) => {
    setTechStack((prev) =>
      prev.filter((currentSkill) => currentSkill !== skill)
    );
  };

  const saveProfile = async (payload: SaveProfileType) => {
    const success = await updateProfileClient(payload);

    showToast(
      success
        ? '프로필이 성공적으로 저장되었습니다!'
        : '프로필 저장에 실패했습니다.',
      success ? 'success' : 'error'
    );
  };

  const saveCurrentProfile = () => saveProfile({ techStack, name });

  return {
    addSkill,
    name,
    newSkill,
    removeSkill,
    saveCurrentProfile,
    setName,
    setNewSkill,
    techStack,
  };
};
