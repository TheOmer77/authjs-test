'use server';

import { getCurrentUser } from '@/lib/auth';

export const admin = async (): Promise<
  { success: true } | { success: false; error: string }
> => {
  const currentUser = await getCurrentUser();
  if (currentUser?.role !== 'ADMIN')
    return { success: false, error: "You're not allowed to access this." };

  return { success: true };
};
