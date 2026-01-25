import type { NextAuthOptions } from 'next-auth';
import KakaoProvider from 'next-auth/providers/kakao';

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),
  ],
  callbacks: {},
};
