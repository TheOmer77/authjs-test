'use server';

import { getUser } from '@/db/user';
import { resetSchema, type ResetValues } from '@/schemas/auth';

export const reset = async (
  values: ResetValues
): Promise<{ success: true } | { success: false; error: string }> => {
  const validatedValues = resetSchema.safeParse(values);
  if (!validatedValues.success)
    return { success: false, error: validatedValues.error.message };

  const { email } = validatedValues.data;

  const existingUser = await getUser({ email });
  if (!existingUser)
    return { success: false, error: 'A user with this email does not exist.' };

  // TODO: Generate reset token & send email

  return { success: true };
};
