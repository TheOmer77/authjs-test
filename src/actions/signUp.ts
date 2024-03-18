'use server';

import bcrypt from 'bcryptjs';

import { signUpSchema, type SignUpValues } from '@/schemas/auth';
import { userExists } from '@/db/user';
import { db } from '@/lib/db';
import { generateVerificationToken } from '@/lib/tokens';

export const signUp = async (
  values: SignUpValues
): Promise<{ success: true } | { success: false; error: string }> => {
  const validatedValues = signUpSchema.safeParse(values);
  if (!validatedValues.success)
    return { success: false, error: validatedValues.error.message };

  const { email, name, password } = validatedValues.data;

  const existingUser = await userExists({ email });
  if (existingUser)
    return { success: false, error: 'A user with this email already exists.' };

  const hashedPassword = await bcrypt.hash(password, 10);
  await db.user.create({
    data: { email, name, password: hashedPassword },
  });

  const verificationToken = await generateVerificationToken(email);
  // TODO: Send verification email
  console.log(`Sending new verification token to ${email}`, verificationToken);

  return { success: true };
};
