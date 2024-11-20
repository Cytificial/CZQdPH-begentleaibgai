import { z } from 'zod'
import { Trpc } from '~/core/trpc/base'

export const SubscriptionRouter = Trpc.createRouter({
  create: Trpc.procedure
    .input(
      z.object({
        planId: z.string(),
        userId: z.string(),
        status: z.string(),
        startDate: z.string(),
        endDate: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.database.subscription.create({
        data: input,
      })
    }),

  findFirst: Trpc.procedurePublic
    .input(
      z.object({
        where: z.record(z.any()).optional(),
        include: z.record(z.boolean()).optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      return ctx.database.subscription.findFirst({
        where: input.where,
        include: input.include,
      })
    }),

  findMany: Trpc.procedurePublic
    .input(
      z.object({
        where: z.record(z.any()).optional(),
        include: z.record(z.boolean()).optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      return ctx.database.subscription.findMany({
        where: input.where,
        include: input.include,
      })
    }),
})
