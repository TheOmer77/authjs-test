'use server';

import { AuthError } from 'next-auth';

import { getUser } from '@/db/user';
import { getVerificationToken } from '@/db/verificationToken';
import { signIn as authSignIn } from '@/lib/auth';
import { generateVerificationToken } from '@/lib/tokens';
import { signInSchema, type SignInValues } from '@/schemas/auth';
import { DEFAULT_SIGNIN_REDIRECT } from '@/config/routes';

export const signIn = async (
  values: SignInValues
): Promise<{ success: true } | { success: false; error: string }> => {
  const validatedValues = signInSchema.safeParse(values);
  if (!validatedValues.success)
    return { success: false, error: validatedValues.error.message };

  const { email, password } = validatedValues.data;

  const existingUser = await getUser({ email });
  if (!existingUser || !existingUser.email || !existingUser.password)
    return { success: false, error: 'Incorrect email or password.' };
  if (!existingUser.emailVerified) {
    const existingVerificationToken = await getVerificationToken({ email });
    // Only send new token if current one is missing or expired
    if (
      !existingVerificationToken ||
      existingVerificationToken.expires_at.valueOf() < new Date().valueOf()
    ) {
      const newVerificationToken = await generateVerificationToken(
        existingUser.email
      );
      // TODO: Send verification email
      console.log(
        `Sending new verification token to ${email}`,
        newVerificationToken
      );
    }

    return {
      success: false,
      error: 'Email not verified - check your email for a verification link.',
    };
  }

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
