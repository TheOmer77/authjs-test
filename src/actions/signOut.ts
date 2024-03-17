'use server';

import { signOut as authSignOut } from '@/lib/auth';

export const signOut = async () => await authSignOut();
