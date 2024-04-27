import { z } from 'zod';
import { privateProcedure, router } from './trpc';
import { TRPCError } from '@trpc/server';

export const paymentRouter = router({
  createSession: privateProcedure
    .input(z.object({ productIds: z.array(z.string()) }))
    .mutation(({ input, ctx }) => {}),
});
