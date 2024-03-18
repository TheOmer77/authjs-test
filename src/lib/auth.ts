import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import type { UserRole } from '@prisma/client';

import { db } from './db';
import { getUser } from '@/db/user';
import authConfig from '@/config/auth';

declare module 'next-auth' {
  interface User {
    role: UserRole;
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  callbacks: {
    jwt: async ({ token }) => {
      if (!token.sub) return token;

      const existingUser = await getUser({ id: token.sub });
      if (!existingUser) return token;

      token.role = existingUser.role;
      return token;
    },
    session: async ({ token, session }) => {
      if (token.sub && session.user) session.user.id = token.sub;
      if (token.role && session.user)
        session.user.role = token.role as UserRole;
      return session;
    },
  },
});
