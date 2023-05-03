import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

const getExercises = publicProcedure.query(async ({ ctx }) => {
  const exercises = await ctx.prisma.exercise.findMany({
    where: {
      userId: ctx.session?.user.id,
    },
  });
  return exercises;
});

const createExercise = publicProcedure
  .input(
    z.object({
      day: z.string().min(5).max(9),
      nameEx: z.string().min(3).max(25),
      reps: z.number().min(1).max(40),
      weight: z.number().min(2).max(180),
      sets: z.number().min(1).max(8),
    })
  )
  .mutation(async ({ input, ctx }) => {
    const result = await ctx.prisma.exercise.create({
      data: {
        day: input.day,
        nameEx: input.nameEx,
        reps: input.reps,
        sets: input.sets,
        weight: input.weight,
        user: {
          connect: {
            id: ctx.session?.user.id,
          },
        },
      },
    });
    return result;
  });

export const exerciseRouter = createTRPCRouter({
  getAll: getExercises,
  create: createExercise,
});
