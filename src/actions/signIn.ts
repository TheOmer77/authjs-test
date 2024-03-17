'use server';

import { signInSchema, type SignInValues } from '@/schemas/auth';

export const signIn = async (
  values: SignInValues
): Promise<{ success: true } | { success: false; error: string }> => {
  const validatedValues = signInSchema.safeParse(values);
  if (!validatedValues.success)
    return { success: false, error: validatedValues.error.message };

  return { success: true };
};
