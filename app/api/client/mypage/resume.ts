export const saveResume = async (resumeForm: FormData) => {
  try {
    const res = await fetch('/api/server/resume', {
      method: 'POST',
      body: resumeForm,
    });
    if (res.ok) {
      console.log('이력서 저장 성공');
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.log('이력서 저장 실패', err);
  }
};

export const getResume = async () => {
  try {
    const res = await fetch('/api/server/resume', {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
    });
    if (res.ok) {
      console.log('이력서 불러오기 성공');
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.log('이력서 불러오기 실패', err);
  }
};

export const deleteResume = async () => {
  try {
    const res = await fetch('/api/server/resume', {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' },
    });
    if (res.ok) {
      console.log('이력서 삭제 성공');
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.log('이력서 삭제 실패', err);
  }
};
