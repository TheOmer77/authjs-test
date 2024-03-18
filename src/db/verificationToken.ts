import type { VerificationToken } from '@prisma/client';

import { db } from '@/lib/db';

export const getVerificationToken = async ({
  email,
  token,
}: Partial<Pick<VerificationToken, 'email' | 'token'>>) => {
  try {
    if (typeof email === 'string' && typeof token !== 'string')
      return await db.verificationToken.findFirst({ where: { email } });
    return await db.verificationToken.findUnique({ where: { email, token } });
  } catch (error) {
    return null;
  }
};
