'use server';

import { signUpSchema, type SignUpValues } from '@/schemas/auth';

export const signUp = async (
  values: SignUpValues
): Promise<{ success: true } | { success: false; error: string }> => {
  const validatedValues = signUpSchema.safeParse(values);
  if (!validatedValues.success)
    return { success: false, error: validatedValues.error.message };

  return { success: true };
};
