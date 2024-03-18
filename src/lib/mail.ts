import { Resend } from 'resend';

const resend = new Resend(process.env.MAIL_RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  // TODO: Get dynamic base URL
  const baseUrl = 'http://localhost:3000';
  const confirmLink = `${baseUrl}/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: process.env.MAIL_SENDER_ADDRESS!,
    to: email,
    subject: 'Confirm your email',
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm your email</p>`,
  });
};
