'use server';

import { settingsSchema, type SettingsValues } from '@/schemas/settings';
import { getUser } from '@/db/user';
import { getCurrentUser } from '@/lib/auth';
import { db } from '@/lib/db';

export const settings = async (
  values: SettingsValues
): Promise<{ success: true } | { success: false; error: string }> => {
  const currentUser = await getCurrentUser();
  if (!currentUser) return { success: false, error: 'Unauthorized' };
  const dbUser = await getUser({ id: currentUser.id });
  if (!dbUser) return { success: false, error: 'Unauthorized' };

  const validatedValues = settingsSchema.safeParse(values);
  if (!validatedValues.success)
    return { success: false, error: validatedValues.error.message };

  await db.user.update({
    where: { id: dbUser.id },
    data: validatedValues.data,
  });
  return { success: true };
};
