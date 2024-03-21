import { db } from '@/lib/db';
import type { Account } from '@prisma/client';

export const getAccount = async ({ userId }: Pick<Account, 'userId'>) => {
  try {
    return await db.account.findFirst({ where: { userId } });
  } catch {
    return null;
  }
};
