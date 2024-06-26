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

export const QUERY_FALLBACK = {
  limit: 4,
  sort: 'asc',
};

export const TRANSACTION_FEE = 20;

export const DUMMY_CREDIT_CARD = '4000 0035 6000 0008';
