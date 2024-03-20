import type { TwoFactorToken } from '@prisma/client';

import { db } from '@/lib/db';

export const getTwoFactorToken = async ({
  email,
  token,
}: Partial<Pick<TwoFactorToken, 'email' | 'token'>>) => {
  try {
    if (typeof email === 'string' && typeof token !== 'string')
      return await db.twoFactorToken.findFirst({ where: { email } });
    return await db.twoFactorToken.findUnique({ where: { email, token } });
  } catch (error) {
    return null;
  }
};
