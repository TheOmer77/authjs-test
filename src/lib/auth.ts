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
    twofactor_enabled: boolean;
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

      const existingAccount = await getAccount({ userId: existingUser.id });
      token.oauth = !!existingAccount;

      token.name = existingUser.name;
      token.email = existingUser.email;
      token.role = existingUser.role;
      token.twofactor_enabled = existingUser.twofactor_enabled;
      return token;
    },
    session: async ({ token, session }) => {
      if (session.user) {
        if (token.sub) session.user.id = token.sub;
        if (token.name) session.user.name = token.name;
        if (token.email) session.user.email = token.email;
        if (token.role) session.user.role = token.role as UserRole;
        if (typeof token.oauth === 'boolean') session.user.oauth = token.oauth;
        if (typeof token.twofactor_enabled === 'boolean')
          session.user.twofactor_enabled = token.twofactor_enabled;
      }
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
