import { Resend } from 'resend';

const resend = new Resend(process.env.MAIL_RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  // TODO: Get dynamic base URL
  const baseUrl = 'http://localhost:3000';
  const link = `${baseUrl}/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: process.env.MAIL_SENDER_ADDRESS!,
    to: email,
    subject: 'Confirm your email',
    html: `<p>Click <a href="${link}">here</a> to confirm your email.</p>`,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  // TODO: Get dynamic base URL
  const baseUrl = 'http://localhost:3000';
  const link = `${baseUrl}/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: process.env.MAIL_SENDER_ADDRESS!,
    to: email,
    subject: 'Reset your password',
    html: `<p>Click <a href="${link}">here</a> to reset your password.</p>`,
  });
};

export const sendTwoFactorEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: process.env.MAIL_SENDER_ADDRESS!,
    to: email,
    subject: '2FA code',
    html: `<p>Your 2FA code is <b>${token}</b>.</p>`,
  });
};
