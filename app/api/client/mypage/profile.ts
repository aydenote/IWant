import { SaveProfileType } from '../../../(types)/common';

export const saveProfile = async ({ techStack, name }: SaveProfileType) => {
  try {
    const res = await fetch('/api/server/mypage', {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ techStack, name }),
    });
    if (res.ok) {
      console.log('프로필 저장됨');
    }
  } catch (err) {
    console.log('프로필 저장 실패', err);
  }
};
