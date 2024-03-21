import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import type { UserRole } from '@prisma/client';

import { db } from './db';
import { getUser } from '@/db/user';
import { getTwoFactorConfirmation } from '@/db/twoFactorConfirmation';
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
    signIn: async ({ user, account }) => {
      if (account?.provider !== 'credentials') return true;

      const existingUser = await getUser({ id: user.id });
      if (!existingUser?.email_verified) return false;

      if (existingUser.twofactor_enabled) {
        const existingConfirmation = await getTwoFactorConfirmation({
          user_id: existingUser.id,
        });
        if (!existingConfirmation) return false;

        await db.twoFactorConfirmation.delete({
          where: { id: existingConfirmation.id },
        });
      }

      return true;
    },
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
  events: {
    linkAccount: async ({ user }) => {
      await db.user.update({
        where: { id: user.id },
        data: { email_verified: new Date() },
      });
    },
  },
  pages: {
    signIn: '/auth/sign-in',
    error: '/auth/error',
  },
});

export const getCurrentUser = async () => (await auth())?.user;
