import { createTRPCRouter } from "~/server/api/trpc";
import { routineRouter } from "~/server/api/routers/routine";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  routine: routineRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
