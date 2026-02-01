import KakaoProvider from 'next-auth/providers/kakao';
import NextAuth from 'next-auth';

import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '../../../(lib)/prisma';

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),
  ],
});

export { handler as GET, handler as POST };
