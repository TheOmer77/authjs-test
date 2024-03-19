'use server';

import bcrypt from 'bcryptjs';

import { getUser } from '@/db/user';
import { getPasswordResetToken } from '@/db/passwordResetToken';
import { newPasswordSchema, type NewPasswordValues } from '@/schemas/auth';
import { db } from '@/lib/db';

export const newPassword = async (
  values: NewPasswordValues,
  token: string | null
): Promise<{ success: true } | { success: false; error: string }> => {
  if (!token) return { success: false, error: 'Token is missing.' };
  const validatedValues = newPasswordSchema.safeParse(values);
  if (!validatedValues.success)
    return { success: false, error: validatedValues.error.message };

  const { password } = validatedValues.data;

  const existingToken = await getPasswordResetToken({ token });
  if (!existingToken) return { success: false, error: 'Token does not exist.' };

  const expired = existingToken.expires_at.valueOf() < new Date().valueOf();
  if (expired)
    return {
      success: false,
      error:
        'Your last password reset token has expired, please send a new one.',
    };

  const existingUser = await getUser({ email: existingToken.email });
  if (!existingUser)
    return {
      success: false,
      error: 'A user with this email does not exist.',
    };

  const hashedPassword = await bcrypt.hash(password, 10);
  await db.user.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword },
  });
  await db.passwordResetToken.delete({ where: { id: existingToken.id } });
  return { success: true };
};
