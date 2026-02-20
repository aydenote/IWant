export const updateResumeClient = async (resumeForm: FormData) => {
  try {
    const res = await fetch('/db/resume', {
      method: 'POST',
      body: resumeForm,
    });

    const data = await res.json();
    return data;
  } catch (err) {
    console.error('이력서 저장 실패', err);
  }
};

export const deleteResumeClient = async () => {
  try {
    const res = await fetch('/db/resume', {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' },
    });

    const data = await res.json();
    return data;
  } catch (err) {
    console.error('이력서 삭제 실패', err);
  }
};
