'use server';

import { getUser } from '@/db/user';
import { getVerificationToken } from '@/db/verificationToken';
import { db } from '@/lib/db';

export const newVerification = async (
  token: string
): Promise<{ success: true } | { success: false; error: string }> => {
  const existingToken = await getVerificationToken({ token });
  if (!existingToken) return { success: false, error: 'Token does not exist.' };

  const expired = existingToken.expires_at.valueOf() < new Date().valueOf();
  if (expired)
    return {
      success: false,
      error:
        'Your last verification token has expired. A new one will be sent to you the next time you try to sign in.',
    };

  const existingUser = await getUser({ email: existingToken.email });
  if (!existingUser)
    return {
      success: false,
      error: 'A user with this email does not exist.',
    };

  await db.user.update({
    where: { id: existingUser.id },
    data: { email_verified: new Date(), email: existingToken.email },
  });
  await db.verificationToken.delete({ where: { id: existingToken.id } });
  return { success: true };
};
