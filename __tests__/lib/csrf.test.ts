import { isValidCsrfRequest } from '../../app/_services/server/csrf';

const createRequest = ({
  method,
  headers,
}: {
  method: string;
  headers?: Record<string, string>;
}) => {
  const normalizedHeaders = new Map(
    Object.entries(headers ?? {}).map(([key, value]) => [
      key.toLowerCase(),
      value,
    ])
  );

  return {
    method,
    url: 'https://iwant.example/api/profile',
    headers: {
      get: (name: string) => normalizedHeaders.get(name.toLowerCase()) ?? null,
    },
  } as Request;
};

describe('csrf request validation', () => {
  test('safe methods are allowed without origin headers', () => {
    expect(isValidCsrfRequest(createRequest({ method: 'GET' }))).toBe(true);
  });

  test('same-origin unsafe requests are allowed with origin header', () => {
    expect(
      isValidCsrfRequest(
        createRequest({
          method: 'POST',
          headers: { origin: 'https://iwant.example' },
        })
      )
    ).toBe(true);
  });

  test('same-origin unsafe requests are allowed with referer header', () => {
    expect(
      isValidCsrfRequest(
        createRequest({
          method: 'PUT',
          headers: { referer: 'https://iwant.example/ko/mypage' },
        })
      )
    ).toBe(true);
  });

  test('forwarded host and proto are used as the expected origin', () => {
    expect(
      isValidCsrfRequest(
        createRequest({
          method: 'DELETE',
          headers: {
            origin: 'https://app.iwant.example',
            'x-forwarded-host': 'app.iwant.example',
            'x-forwarded-proto': 'https',
          },
        })
      )
    ).toBe(true);
  });

  test('cross-origin unsafe requests are rejected', () => {
    expect(
      isValidCsrfRequest(
        createRequest({
          method: 'POST',
          headers: { origin: 'https://attacker.example' },
        })
      )
    ).toBe(false);
  });

  test('browser cross-site unsafe requests are rejected', () => {
    expect(
      isValidCsrfRequest(
        createRequest({
          method: 'POST',
          headers: {
            origin: 'https://iwant.example',
            'sec-fetch-site': 'cross-site',
          },
        })
      )
    ).toBe(false);
  });

  test('unsafe requests without origin evidence are rejected', () => {
    expect(isValidCsrfRequest(createRequest({ method: 'POST' }))).toBe(false);
  });
});
