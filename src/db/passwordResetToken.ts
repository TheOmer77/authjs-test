import type { PasswordResetToken } from '@prisma/client';

import { db } from '@/lib/db';

export const getPasswordResetToken = async ({
  email,
  token,
}: Partial<Pick<PasswordResetToken, 'email' | 'token'>>) => {
  try {
    if (typeof email === 'string' && typeof token !== 'string')
      return await db.passwordResetToken.findFirst({ where: { email } });
    return await db.passwordResetToken.findUnique({ where: { email, token } });
  } catch (error) {
    return null;
  }
};
