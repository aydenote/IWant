import { SaveProfileType } from '../../../_types/common';

export const updateProfileClient = async ({
  techStack,
  name,
}: SaveProfileType) => {
  try {
    const res = await fetch('/api/profile', {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ techStack, name }),
    });
    return res.ok;
  } catch (err) {
    console.error(err);
    return false;
  }
};
