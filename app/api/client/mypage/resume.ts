import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import { prisma } from '../../../(lib)/prisma';
import { supabase } from '../../../(lib)/supabase';

export const saveResume = async (resumeForm: FormData) => {
  try {
    const res = await fetch('/api/server/resume', {
      method: 'POST',
      body: resumeForm,
    });

    const data = await res.json();
    return data;
  } catch (err) {
    console.error('이력서 저장 실패', err);
  }
};

export const deleteResume = async () => {
  try {
    const res = await fetch('/api/server/resume', {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' },
    });

    const data = await res.json();
    return data;
  } catch (err) {
    console.error('이력서 삭제 실패', err);
  }
};
