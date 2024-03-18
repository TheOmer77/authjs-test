import type { NextAuthConfig } from 'next-auth';
import credentials from 'next-auth/providers/credentials';
import github from 'next-auth/providers/github';
import google from 'next-auth/providers/google';
import bcrypt from 'bcryptjs';

import { signInSchema } from '@/schemas/auth';
import { getUser } from '@/db/user';

export default {
  providers: [
    google({
      clientId: process.env.AUTH_GOOGLE_CLIENT_ID,
      clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET,
    }),
    github({
      clientId: process.env.AUTH_GITHUB_CLIENT_ID,
      clientSecret: process.env.AUTH_GITHUB_CLIENT_SECRET,
    }),
    credentials({
      authorize: async credentials => {
        const validatedCredentials = signInSchema.safeParse(credentials);
        if (validatedCredentials.success) {
          const { email, password } = validatedCredentials.data;
          const existingUser = await getUser({ email });
          if (!existingUser || !existingUser.password) return null;

          const passwordsMatch = await bcrypt.compare(
            password,
            existingUser.password
          );
          if (passwordsMatch) return existingUser;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
