import { Resend } from 'resend';

const resend = new Resend(process.env.MAIL_RESEND_API_KEY);

const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

export const sendVerificationEmail = async (email: string, token: string) => {
  const link = `${baseUrl}/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: process.env.MAIL_SENDER_ADDRESS!,
    to: email,
    subject: 'Confirm your email',
    html: `<p>Click <a href="${link}">here</a> to confirm your email.</p>`,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
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
