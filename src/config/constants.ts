import dotenv from 'dotenv';
dotenv.config();

export const NODEMAILER_CONFIG = {
  host: 'smtp.resend.com',
  port: 465,
  secure: true,
  auth: {
    user: 'resend',
    pass: process.env.RESEND_API_KEY,
  },
};

export const EMAIL_PAYLOAD_CONFIG = {
  fromAddress: 'onboarding@resend.dev',
  fromName: 'EdVault Team',
};
