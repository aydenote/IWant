const UNSAFE_METHODS = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);

const getFirstHeaderValue = (value: string | null) =>
  value?.split(',')[0]?.trim() || null;

const getRequestOrigin = (request: Request) => {
  const url = new URL(request.url);
  const forwardedHost = getFirstHeaderValue(
    request.headers.get('x-forwarded-host')
  );
  const host = forwardedHost ?? request.headers.get('host') ?? url.host;
  const forwardedProto = getFirstHeaderValue(
    request.headers.get('x-forwarded-proto')
  );
  const protocol = forwardedProto ?? url.protocol.replace(':', '');

  return `${protocol}://${host}`;
};

const getSourceOrigin = (request: Request) => {
  const origin = request.headers.get('origin');
  if (origin) {
    try {
      return new URL(origin).origin;
    } catch {
      return null;
    }
  }

  const referer = request.headers.get('referer');
  if (referer) {
    try {
      return new URL(referer).origin;
    } catch {
      return null;
    }
  }

  return null;
};

export const isValidCsrfRequest = (request: Request) => {
  if (!UNSAFE_METHODS.has(request.method.toUpperCase())) return true;

  const fetchSite = request.headers.get('sec-fetch-site')?.toLowerCase();
  if (fetchSite === 'cross-site' || fetchSite === 'same-site') return false;

  const sourceOrigin = getSourceOrigin(request);
  if (sourceOrigin) return sourceOrigin === getRequestOrigin(request);

  return fetchSite === 'same-origin';
};

export const validateCsrfRequest = (request: Request) => {
  if (isValidCsrfRequest(request)) return null;

  return Response.json(
    { ok: false, message: 'Invalid request origin' },
    { status: 403 }
  );
};
