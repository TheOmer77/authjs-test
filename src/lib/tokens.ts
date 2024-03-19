import { v4 as uuidv4 } from 'uuid';

import { db } from './db';
import { getVerificationToken } from '@/db/verificationToken';
import { getPasswordResetToken } from '@/db/passwordResetToken';

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expiresAt = new Date(new Date().valueOf() + 900000); // 15 minutes

  const existingToken = await getVerificationToken({ email });
  if (existingToken)
    return await db.verificationToken.update({
      where: { id: existingToken.id },
      data: { token, expires_at: expiresAt },
    });

  return await db.verificationToken.create({
    data: { email, token, expires_at: expiresAt },
  });
};

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expiresAt = new Date(new Date().valueOf() + 900000); // 15 minutes

  const existingToken = await getPasswordResetToken({ email });
  if (existingToken)
    return await db.passwordResetToken.update({
      where: { id: existingToken.id },
      data: { token, expires_at: expiresAt },
    });

  return await db.passwordResetToken.create({
    data: { email, token, expires_at: expiresAt },
  });
};
