import { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch'
import { enhance } from '@zenstackhq/runtime'
import jwt from 'jsonwebtoken'
import { Database } from '../../database'
import { Cookies } from './cookies'

const getSession = async (options: { accessToken: string }) => {
  try {
    const token = options.accessToken

    if (!token) {
      throw new Error('No access token provided')
    }

    const { userId } = jwt.verify(
      token,
      process.env.SERVER_AUTHENTICATION_SECRET,
    ) as {
      userId: string
    }

    const user = await Database.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        globalRole: true,
        pictureUrl: true,
        tokenInvitation: true,
        stripeCustomerId: true,
        credits: true,
        password: true,
        createdAt: true,
        updatedAt: true,
      }
    })

    if (!user || !user.id || !user.email || !user.name || !user.globalRole) {
      throw new Error('Invalid user data')
    }

    return { user }
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      throw new Error('Invalid token')
    }
    throw error
  }
}

const getPrisma = (session: Awaited<ReturnType<typeof getSession>>) => {
  const databaseProtected = enhance(Database, { user: session.user })

  return {
    database: databaseProtected,
    databaseUnprotected: Database,
    prisma: databaseProtected,
    masterPrisma: Database,
  }
}

export const createTrpcContext = async (
  options: FetchCreateContextFnOptions,
) => {
  const accessToken = Cookies.get(options.req, 'MARBLISM_ACCESS_TOKEN')

  const session = await getSession({ accessToken })

  const { database, databaseUnprotected, prisma, masterPrisma } = getPrisma(session)

  return {
    session,
    request: options.req,
    responseHeaders: options.resHeaders,
    database,
    databaseUnprotected,
    prisma,
    masterPrisma
  }
}

export const createHttpContext = async (options: { request: Request }) => {
  const accessToken = Cookies.get(options.request, 'MARBLISM_ACCESS_TOKEN')

  const session = await getSession({ accessToken })

  const { database, databaseUnprotected, prisma, masterPrisma } = getPrisma(session)

  return {
    session,
    database,
    databaseUnprotected,
    prisma,
    masterPrisma
  }
}
