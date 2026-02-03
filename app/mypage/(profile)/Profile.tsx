'use client';

import { useEffect, useState } from 'react';
import Text from '../../(components)/Text';
import Input from '../../(components)/forms/Input';
import Label from '../../(components)/forms/Label';
import BasicButton from '../../(components)/buttons/BasicButton';
import CloseIcon from '../../(components)/icons/CloseIcon';
import PlusIcon from '../../(components)/icons/PlusIcon';
import Pill from '../../(components)/Pill';
import { getProfile, saveProfile } from '../../api/client/mypage/profile';
import { TechStackType } from '../../(types)/common';
import { useSession } from 'next-auth/react';

const Profile = () => {
  const { status } = useSession();
  const [name, setName] = useState('');
  const [newSkill, setNewSkill] = useState('');
  const [techStack, setTechStack] = useState<TechStackType>([]);

  useEffect(() => {
    if (status !== 'authenticated') return;
    const loadProfile = async () => {
      const res = await getProfile();
      setName(res.profile.user.name ?? '');
      setTechStack(res.profile.techStack);
    };
    loadProfile();
  }, [status]);

  const addSkill = () => {
    const value = newSkill.trim();
    if (!value || techStack.includes(value)) return;
    setTechStack((prev) => [...prev, value]);
    setNewSkill('');
  };

  const removeSkill = (skill: string) => {
    setTechStack((prev) => prev.filter((s) => s !== skill));
  };

  return (
    <section className="rounded-lg border bg-card text-card-foreground p-8 space-y-6 bg-gradient-card shadow-lg">
      <div className="space-y-4">
        <Text as="h2" textSize="lg" textBold="lg" textColor="black">
          기본 정보
        </Text>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">이름</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="이름을 입력하세요"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4 pt-6 border-t border-border">
        <Text as="h2" textSize="lg" textBold="lg" textColor="black">
          기술 스택
        </Text>

        <div className="flex gap-2">
          <Input
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addSkill();
              }
            }}
            placeholder="기술 스택 추가 (예: React, Python)"
          />
          <BasicButton
            variant="default"
            onClick={addSkill}
            className="gap-2 cursor-pointer"
          >
            <PlusIcon className="h-4 w-4" />
            추가
          </BasicButton>
        </div>

        <div className="flex flex-wrap gap-2 min-h-15 p-4 bg-muted/50 rounded-lg border border-border">
          {techStack.length === 0 ? (
            <Text textSize="sm" textColor="bluegray500">
              보유한 기술 스택을 추가해주세요
            </Text>
          ) : (
            techStack.map((skill) => (
              <Pill key={skill} className="text-sm py-1.5 px-3 gap-2">
                {skill}
                <BasicButton
                  onClick={() => removeSkill(skill)}
                  className="hover:text-destructive"
                >
                  <CloseIcon className="h-3 w-3 cursor-pointer" />
                </BasicButton>
              </Pill>
            ))
          )}
        </div>
      </div>

      <div className="pt-6 border-t border-border">
        <BasicButton
          variant="default"
          onClick={() => saveProfile({ techStack, name })}
          className="w-full bg-gradient-hero cursor-pointer"
          size="lg"
        >
          프로필 저장
        </BasicButton>
      </div>
    </section>
  );
};

export default Profile;
