import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import type { UserRole } from '@prisma/client';

import { db } from './db';
import { getAccount } from '@/db/account';
import { getUser } from '@/db/user';
import { getTwoFactorConfirmation } from '@/db/twoFactorConfirmation';
import authConfig from '@/config/auth';

declare module 'next-auth' {
  interface User {
    role: UserRole;
    twoFactorEnabled: boolean;
    oauth: boolean;
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
      if (!existingUser?.emailVerified) return false;

      if (existingUser.twoFactorEnabled) {
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

      const existingAccount = await getAccount({ userId: existingUser.id });
      token.oauth = !!existingAccount;

      token.name = existingUser.name;
      token.email = existingUser.email;
      token.role = existingUser.role;
      token.twoFactorEnabled = existingUser.twoFactorEnabled;
      return token;
    },
    session: async ({ token, session }) => {
      if (session.user) {
        if (token.sub) session.user.id = token.sub;
        if (token.name) session.user.name = token.name;
        if (token.email) session.user.email = token.email;
        if (token.role) session.user.role = token.role as UserRole;
        if (typeof token.oauth === 'boolean') session.user.oauth = token.oauth;
        if (typeof token.twoFactorEnabled === 'boolean')
          session.user.twoFactorEnabled = token.twoFactorEnabled;
      }
      return session;
    },
  },
  events: {
    linkAccount: async ({ user }) => {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  pages: {
    signIn: '/auth/sign-in',
    error: '/auth/error',
  },
});

export const getCurrentUser = async () => (await auth())?.user;
