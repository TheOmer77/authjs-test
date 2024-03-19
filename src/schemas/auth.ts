import { z } from 'zod';

const email = z
  .string()
  .min(1, { message: 'Email is required.' })
  .email({ message: 'Invalid email.' });
const password = z
  .string()
  .min(8, { message: 'Password must be at least 8 characters long.' });

export const signInSchema = z.object({
  email,
  password: z.string().min(1, { message: 'Password is required.' }),
});
export type SignInValues = z.infer<typeof signInSchema>;

export const signUpSchema = z.object({
  email,
  password,
  name: z.string().min(1, { message: 'Name is required.' }),
});
export type SignUpValues = z.infer<typeof signUpSchema>;

export const resetSchema = z.object({ email });
export type ResetValues = z.infer<typeof resetSchema>;

export const newPasswordSchema = z.object({ password });
export type NewPasswordValues = z.infer<typeof newPasswordSchema>;
