'use server';

import { AuthError } from 'next-auth';

import { signInSchema, type SignInValues } from '@/schemas/auth';
import { signIn as authSignIn } from '@/lib/auth';
import { DEFAULT_SIGNIN_REDIRECT } from '@/config/routes';

export const signIn = async (
  values: SignInValues
): Promise<{ success: true } | { success: false; error: string }> => {
  const validatedValues = signInSchema.safeParse(values);
  if (!validatedValues.success)
    return { success: false, error: validatedValues.error.message };

  const { email, password } = validatedValues.data;
  try {
    await authSignIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_SIGNIN_REDIRECT,
    });
    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { success: false, error: 'Incorrect email or password.' };
        default:
          return { success: false, error: 'Failed to sign you in.' };
      }
    }
    throw error;
  }
};
