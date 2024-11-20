import { initTRPC, TRPCError } from '@trpc/server'
import { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch'
import { PrismaClient } from '@prisma/client'
import superjson from 'superjson'
import { ZodError } from 'zod'
import { createTrpcContext } from '~/core/authentication/server/context'
import { Context as AuthContext } from '~/core/authentication/server'
import { ConfigurationServer } from '@/core/configuration/server'

const trpcInstance = initTRPC.context<typeof createContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    }
  },
})

const middlewareAuthenticated = trpcInstance.middleware(({ ctx, next }) => {
  if (!ctx.session.user) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'You must be authenticated',
    })
  }
  return next()
})

const middlewareAdmin = trpcInstance.middleware(({ ctx, next }) => {
  if (!ctx.session.user) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'You must be authenticated',
    })
  }
  return next()
})

const procedurePublic = trpcInstance.procedure
const procedure = procedurePublic.use(middlewareAuthenticated)

const createContext = async (options: FetchCreateContextFnOptions): Promise<Context> => {
  return await createTrpcContext(options)
}

type Context = AuthContext & {
  database: PrismaClient
  databaseUnprotected: PrismaClient
  prisma: PrismaClient  
  masterPrisma: PrismaClient
  request?: Request
  responseHeaders?: Headers
}

export type RouterType = ReturnType<typeof trpcInstance.router>;

export const Trpc = {
  createRouter: trpcInstance.router,
  mergeRouters: trpcInstance.mergeRouters,
  procedurePublic,
  procedure,
  createContext,
  trpcInstance,
  configuration: ConfigurationServer.trpcRouter
};
