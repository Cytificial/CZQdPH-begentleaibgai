import { UserStatus } from '@prisma/client'

export { AuthenticationServer } from './server/index'

type Context = {
  session: {
    user: {
      id: string
      email: string
      name: string
      globalRole: string
      pictureUrl: string
      tokenInvitation: string
      stripeCustomerId: string
      credits: number
      effectiveCredits: number
      status: UserStatus
      password: string
      createdAt: Date
      updatedAt: Date
    }
  }
}

export type { Context }
