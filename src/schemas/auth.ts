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

export const signUpSchema = z.object({
  email,
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long.' }),
  name: z.string().min(1, { message: 'Name is required.' }),
});
export type SignUpValues = z.infer<typeof signUpSchema>;
