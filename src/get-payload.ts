import dotenv from 'dotenv';
import path from 'path';
import payload, { Payload } from 'payload';
import type { InitOptions } from 'payload/config';
import nodemailer from 'nodemailer';
import { EMAIL_PAYLOAD_CONFIG, NODEMAILER_CONFIG } from './config/constants';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const transporter = nodemailer.createTransport({
  host: NODEMAILER_CONFIG.host,
  port: NODEMAILER_CONFIG.port,
  secure: NODEMAILER_CONFIG.secure,
  auth: {
    user: NODEMAILER_CONFIG.auth.user,
    pass: NODEMAILER_CONFIG.auth.pass,
  },
});

// enable caching
let cached = (global as any).payload;
if (!cached) {
  cached = (global as any).payload = {
    client: null,
    promise: null,
  };
}

interface Args {
  initOptions?: Partial<InitOptions>;
}

export const getPayloadClient = async ({
  initOptions,
}: Args = {}): Promise<Payload> => {
  if (!process.env.PAYLOAD_SECRET) {
    throw new Error('PAYLOAD_SECRET is required');
  }

  if (cached.client) {
    return cached.client;
  }

  if (!cached.promise) {
    cached.promise = payload.init({
      email: {
        transport: transporter,
        fromAddress: EMAIL_PAYLOAD_CONFIG.fromAddress,
        fromName: EMAIL_PAYLOAD_CONFIG.fromName,
      },
      secret: process.env.PAYLOAD_SECRET,
      local: initOptions?.express ? false : true,
      ...(initOptions || {}),
    });
  }

  try {
    cached.client = await cached.promise;
  } catch (e: unknown) {
    cached.promise = null;
    throw e;
  }

  return cached.client;
};
