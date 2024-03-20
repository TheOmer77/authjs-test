'use server';

import { AuthError } from 'next-auth';

import { getUser } from '@/db/user';
import { getVerificationToken } from '@/db/verificationToken';
import { getTwoFactorToken } from '@/db/twoFactorToken';
import { getTwoFactorConfirmation } from '@/db/twoFactorConfirmation';
import { signIn as authSignIn } from '@/lib/auth';
import { sendTwoFactorEmail, sendVerificationEmail } from '@/lib/mail';
import {
  generateTwoFactorToken,
  generateVerificationToken,
} from '@/lib/tokens';
import { db } from '@/lib/db';
import { signInSchema, type SignInValues } from '@/schemas/auth';
import { DEFAULT_SIGNIN_REDIRECT } from '@/config/routes';

export const signIn = async (
  values: SignInValues
): Promise<
  { success: true; twoFactor?: true } | { success: false; error: string }
> => {
  const validatedValues = signInSchema.safeParse(values);
  if (!validatedValues.success)
    return { success: false, error: validatedValues.error.message };

  const { email, password, twoFactorCode } = validatedValues.data;

  const existingUser = await getUser({ email });
  if (!existingUser || !existingUser.email || !existingUser.password)
    return { success: false, error: 'Incorrect email or password.' };
  if (!existingUser.email_verified) {
    const existingVerificationToken = await getVerificationToken({ email });
    // Only create new token if current one is missing or expired
    if (
      !existingVerificationToken ||
      existingVerificationToken.expires_at.valueOf() < new Date().valueOf()
    ) {
      const newVerificationToken = await generateVerificationToken(
        existingUser.email
      );
      await sendVerificationEmail(
        newVerificationToken.email,
        newVerificationToken.token
      );
      return {
        success: false,
        error:
          'Your last verification token has expired - check your email for a new one.',
      };
    }

    return {
      success: false,
      error: 'Email not verified - check your email for a verification link.',
    };
  }

  if (existingUser.twofactor_enabled && existingUser.email) {
    if (!twoFactorCode) {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);
      await sendTwoFactorEmail(twoFactorToken.email, twoFactorToken.token);
      return { success: true, twoFactor: true };
    }
    const twoFactorToken = await getTwoFactorToken({
      email: existingUser.email,
    });
    if (!twoFactorToken || twoFactorToken.token !== twoFactorCode)
      return { success: false, error: 'Incorrect code.' };
    if (twoFactorToken.expires_at.valueOf() < new Date().valueOf())
      return { success: false, error: 'Code expired.' };

    await db.twoFactorToken.delete({ where: { id: twoFactorToken.id } });
    const existingConfirmation = await getTwoFactorConfirmation({
      user_id: existingUser.id,
    });
    if (existingConfirmation)
      await db.twoFactorConfirmation.delete({
        where: { id: existingConfirmation.id },
      });
    await db.twoFactorConfirmation.create({
      data: { user_id: existingUser.id },
    });
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
