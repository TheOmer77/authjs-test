'use server';

import bcrypt from 'bcrypt';

import { signUpSchema, type SignUpValues } from '@/schemas/auth';
import { db } from '@/lib/db';

export const signUp = async (
  values: SignUpValues
): Promise<{ success: true } | { success: false; error: string }> => {
  const validatedValues = signUpSchema.safeParse(values);
  if (!validatedValues.success)
    return { success: false, error: validatedValues.error.message };

  const { email, name, password } = validatedValues.data;

  const existingUser = (await db.user.count({ where: { email } })) > 0;
  if (existingUser)
    return { success: false, error: 'A user with this email already exists.' };

  const hashedPassword = await bcrypt.hash(password, 10);
  await db.user.create({
    data: { email, name, password: hashedPassword },
  });

  // TODO: Send verification token email

  return { success: true };
};
