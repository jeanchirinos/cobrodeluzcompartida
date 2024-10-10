'use client'

import { COOKIES_TOKEN_NAME } from '@/constants/cookies'
import { ROUTE } from '@/constants/routes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { AxiosError, HttpStatusCode } from 'axios'
import { removeCookie } from 'typescript-cookie'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry(_, error) {
        if (error instanceof AxiosError) {
          if (error.config?.url !== 'session') {
            if (error.status === HttpStatusCode.Unauthorized) {
              removeCookie(COOKIES_TOKEN_NAME)
              window.location.replace(ROUTE.HOME)
            }
          }
        }

        return false
      },
      refetchOnWindowFocus: false,
      staleTime: 2000,
    },
  },
})

export function TanStackQueryProvider(props: Required<React.PropsWithChildren>) {
  return (
    <QueryClientProvider client={queryClient}>
      {props.children}
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  )
}
