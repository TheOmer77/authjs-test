import { z } from 'zod';

const email = z
  .string()
  .min(1, { message: 'Email is required.' })
  .email({ message: 'Invalid email.' });

export const signInSchema = z.object({
  email,
  password: z.string().min(1, { message: 'Password is required.' }),
});
export type SignInValues = z.infer<typeof signInSchema>;
