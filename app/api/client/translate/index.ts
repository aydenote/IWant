export type TranslateTarget = 'ko' | 'en';

export const getTranslate = async (text: string, target: TranslateTarget) => {
  const res = await fetch('/api/translate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, target }),
  });

  if (!res.ok) {
    throw new Error('번역 요청에 실패했습니다.');
  }

  const data = await res.json();
  return data.translated;
};
