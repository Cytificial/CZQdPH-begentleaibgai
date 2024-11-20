import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import React, { ReactNode, useState } from 'react'
import superjson from 'superjson'
import { createTRPCReact } from '../../.marblism/zenstack/client/react'
import { AnalyticsRouter } from '/app/routes/api.analytics/route'
export type { AppRouter } from '@/server'

type MergedRouter = AppRouter & {
  analytics: typeof AnalyticsRouter
}

export const Api = {
  trpc: createTRPCReact<MergedRouter>()
}

const Provider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  }))
  
  const [trpcClient] = useState(() => Api.trpc.createClient({
    transformer: superjson,
    links: [httpBatchLink({ url: '/api/trpc' })],
  }))
  
  return (
    <QueryClientProvider client={queryClient}>
      <Api.trpc.Provider client={trpcClient} queryClient={queryClient}>
        {children}
      </Api.trpc.Provider>
    </QueryClientProvider>
  )
}

export const TrpcClient = {
  Provider,
}
