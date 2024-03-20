import type { TwoFactorConfirmation } from '@prisma/client';

import { db } from '@/lib/db';

export const getTwoFactorConfirmation = async ({
  user_id,
}: Pick<TwoFactorConfirmation, 'user_id'>) => {
  try {
    return await db.twoFactorConfirmation.findUnique({ where: { user_id } });
  } catch (error) {
    return null;
  }
};
