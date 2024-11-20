import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink, TRPCClientError } from '@trpc/client'
import React, { ReactNode, useState } from 'react'
import superjson from 'superjson'
import { createTRPCReact } from '@trpc/react-query'
import { AnalyticsRouter } from '~/routes/api.analytics/route'
import type { AppRouter } from '@/server'
import { ConfigurationServer } from '@/core/configuration/server'
import { AuthenticationServer } from '@/core/authentication/server'

type MergedRouter = AppRouter & {
  configuration: typeof ConfigurationServer.trpcRouter,
  analytics: typeof AnalyticsRouter,
  authentication: typeof AuthenticationServer.trpcRouter
}

const trpc = createTRPCReact<MergedRouter>()

export const Api = trpc;

const errorHandler = (error: TRPCClientError<MergedRouter>) => {
  if (!navigator.onLine) {
    throw new Error('Network connection lost')
  }
  throw error
}

export const TrpcClient = {
  trpc,
  Provider: trpc.Provider,
  configuration: ConfigurationServer.trpcRouter,
  analytics: AnalyticsRouter,
  authentication: AuthenticationServer.trpcRouter,
  links: [
    httpBatchLink({
      url: '/api/trpc',
      onError: errorHandler
    })
  ]
}
