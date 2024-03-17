import type { User } from '@prisma/client';

import { db } from '@/lib/db';

export const getUser = async ({
  id,
  email,
}: Partial<Pick<User, 'id' | 'email'>>) => {
  try {
    return await db.user.findUnique({
      where: { id, email: email || undefined },
    });
  } catch (error) {
    return null;
  }
};

export const userExists = async ({
  id,
  email,
}: Partial<Pick<User, 'id' | 'email'>>) =>
  (await db.user.count({ where: { id, email } })) > 0;
