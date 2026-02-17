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

export const getResume = async () => {
  try {
    const res = await fetch('/api/server/resume', {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('이력서 불러오기 실패', err);
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
