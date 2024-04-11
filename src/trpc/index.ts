import { publicProcedure, router } from './trpc';

export const appRouter = router({
  anyApiRoute: publicProcedure.query(() => 'Hello World!'),
});

export type AppRouter = typeof appRouter;
