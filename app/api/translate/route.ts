import { NextRequest, NextResponse } from 'next/server';
import { validateCsrfRequest } from '../../_services/server/csrf';

export async function POST(request: NextRequest) {
  const csrfError = validateCsrfRequest(request);
  if (csrfError) return csrfError;

  const { text, target } = await request.json();

  if (typeof text !== 'string' || !['ko', 'en'].includes(target)) {
    return NextResponse.json(
      { ok: false, message: 'Invalid translate request' },
      { status: 400 }
    );
  }

  if (!process.env.GOOGLE_TRANSLATE_API_KEY) {
    return NextResponse.json(
      { ok: false, message: 'Missing GOOGLE_TRANSLATE_API_KEY' },
      { status: 500 }
    );
  }

  const res = await fetch(
    `https://translation.googleapis.com/language/translate/v2?key=${process.env.GOOGLE_TRANSLATE_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        q: text,
        target,
        format: 'text',
      }),
    }
  );

  if (!res.ok) {
    return NextResponse.json(
      { ok: false, message: 'Failed to translate text' },
      { status: res.status }
    );
  }

  const data = await res.json();
  const translated = data.data?.translations?.[0]?.translatedText;

  if (!translated) {
    return NextResponse.json(
      { ok: false, message: 'Invalid translate response' },
      { status: 502 }
    );
  }

  return NextResponse.json({ translated });
}
