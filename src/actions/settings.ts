'use server';

import bcrypt from 'bcryptjs';

import { settingsSchema, type SettingsValues } from '@/schemas/settings';
import { getUser } from '@/db/user';
import { getCurrentUser, update } from '@/lib/auth';
import { db } from '@/lib/db';
import { generateVerificationToken } from '@/lib/tokens';
import { sendVerificationEmail } from '@/lib/mail';

export const settings = async (
  values: SettingsValues
): Promise<
  { success: true; verificationSent?: true } | { success: false; error: string }
> => {
  const currentUser = await getCurrentUser();
  if (!currentUser) return { success: false, error: 'Unauthorized' };
  const dbUser = await getUser({ id: currentUser.id });
  if (!dbUser) return { success: false, error: 'Unauthorized' };

  if (currentUser.oauth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.twoFactorEnabled = undefined;
  }

  const validatedValues = settingsSchema.safeParse(values);
  if (!validatedValues.success)
    return { success: false, error: validatedValues.error.message };

  const { email, password, newPassword } = validatedValues.data;

  if (email && email !== currentUser.email) {
    const existingUser = await getUser({
      email: email,
    });
    if (existingUser && existingUser.id !== currentUser.id)
      return {
        success: false,
        error: 'A user with this email already exists.',
      };

    const verificationToken = await generateVerificationToken(email);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return { success: true, verificationSent: true };
  }

  if (password && newPassword && dbUser.password) {
    const currPasswordsMatch = await bcrypt.compare(password, dbUser.password);
    if (!currPasswordsMatch)
      return { success: false, error: 'Current password is incorrect.' };
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    validatedValues.data.password = hashedPassword;
    validatedValues.data.newPassword = undefined;
  }

  const updatedUser = await db.user.update({
    where: { id: dbUser.id },
    data: validatedValues.data,
  });
  await update({
    user: {
      email: updatedUser.email,
      name: updatedUser.name,
      role: updatedUser.role,
      twoFactorEnabled: updatedUser.twoFactorEnabled,
    },
  });
  return { success: true };
};
