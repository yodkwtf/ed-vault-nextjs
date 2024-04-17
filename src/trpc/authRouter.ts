import { AuthSchema } from '../lib/validators/account-credentials-validator';
import { publicProcedure, router } from './trpc';
import { getPayloadClient } from '../get-payload';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

export const authRouter = router({
  createPayloadUser: publicProcedure
    .input(AuthSchema)
    .mutation(async ({ input }) => {
      const { email, password } = input;
      const payload = await getPayloadClient();

      // check if user already exists
      const { docs: users } = await payload.find({
        collection: 'users',
        where: {
          email: {
            equals: email,
          },
        },
      });

      if (users.length) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'User already exists',
        });
      }

      // create user
      await payload.create({
        collection: 'users',
        data: {
          email,
          password,
          role: 'user',
        },
      });

      return {
        success: true,
        sentToEmail: email,
      };
    }),

  verifyEmail: publicProcedure
    .input(z.object({ token: z.string() }))
    .query(async ({ input }) => {
      const { token } = input;
      const payload = await getPayloadClient();

      const isVerified = await payload.verifyEmail({
        collection: 'users',
        token,
      });

      if (!isVerified) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Invalid token',
        });
      }

      return {
        success: true,
      };
    }),

  signIn: publicProcedure.input(AuthSchema).mutation(async ({ input, ctx }) => {
    const { email, password } = input;
    const payload = await getPayloadClient();
    const { res } = ctx;

    try {
      await payload.login({
        collection: 'users',
        data: {
          email,
          password,
        },
        res,
      });
      return {
        success: true,
        sentToEmail: email,
      };
    } catch (error) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }
  }),
});
