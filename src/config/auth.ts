import type { NextAuthConfig } from 'next-auth';
import credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

import { signInSchema } from '@/schemas/auth';
import { getUser } from '@/db/user';

export default {
  providers: [
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
