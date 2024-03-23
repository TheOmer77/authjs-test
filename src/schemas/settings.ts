import { UserRole } from '@prisma/client';
import { z } from 'zod';

const password = z.optional(
  z.string().min(8, { message: 'Password must be at least 8 characters long.' })
);

export const settingsSchema = z
  .object({
    name: z.optional(z.string()),
    email: z.optional(z.string().email({ message: 'Invalid email.' })),
    role: z.optional(z.enum([UserRole.ADMIN, UserRole.USER])),
    twoFactorEnabled: z.optional(z.boolean()),

    password,
    newPassword: password,
  })
  .refine(
    ({ password, newPassword }) => {
      if (password && !newPassword) return false;
      return true;
    },
    { message: 'New password is required.', path: ['newPassword'] }
  )
  .refine(
    ({ password, newPassword }) => {
      if (newPassword && !password) return false;
      return true;
    },
    { message: 'Password is required.', path: ['password'] }
  );
export type SettingsValues = z.infer<typeof settingsSchema>;
