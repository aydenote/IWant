const normalizeSiteUrl = (url: string) => {
  const urlWithProtocol = /^https?:\/\//.test(url) ? url : `https://${url}`;

  return urlWithProtocol.replace(/\/+$/, '');
};

export const getSiteUrl = () =>
  normalizeSiteUrl(
    process.env.NEXTAUTH_URL ??
      process.env.VERCEL_URL ??
      'http://localhost:3000'
  );
