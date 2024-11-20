import { Trpc } from '~/core/trpc/base'
import { z } from 'zod'
import { TRPCError } from '@trpc/server'
import { PaymentService } from '~/plugins/payment/server/payment.service'
import dayjs from 'dayjs'
import { Prisma } from '@prisma/client'

const middlewareAdmin = Trpc.trpcInstance.middleware(({ ctx, next }) => {
  if (ctx.session?.user?.globalRole !== 'ADMIN') {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Admin access required',
    })
  }
  return next()
})

export const AnalyticsRouter = Trpc.createRouter({
  getMetrics: Trpc.procedure
    .use(middlewareAdmin)
    .input(z.object({
      startDate: z.date().optional(),
      endDate: z.date().optional()
    }).strict())
    .query(async ({ ctx, input }) => {
      const today = dayjs()
      const yesterday = today.subtract(24, 'hours')

      // Get daily visitors (unique IPs in last 24h)
      const dailyVisitors = (await ctx.database.visitorLog.groupBy({
        by: ['ip'],
        where: {
          createdAt: {
            gte: yesterday.toDate(),
          },
        },
        _count: { _all: true }
      })).length

      // Get new users registered today
      const newUsers = await ctx.database.user.count({
        where: {
          createdAt: {
            gte: today.startOf('day').toDate(),
          },
        },
      })

      // Get revenue from payments today
      const payments = await PaymentService.findManyPayments(ctx.session.user)
      const revenue = payments
        .filter(payment => 
          dayjs(payment.date).isAfter(today.startOf('day'))
        )
        .reduce((sum, payment) => sum + payment.amount, 0)

      // Get support messages from today
      const supportMessages = await ctx.database.supportMessage.count({
        where: {
          createdAt: {
            gte: today.startOf('day').toDate(),
          },
        },
      })

      return {
        dailyVisitors,
        newUsers,
        revenue,
        supportMessages,
      }
    }),
}) satisfies Record<string, unknown>
