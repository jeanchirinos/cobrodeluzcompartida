'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry(failureCount, error) {
        // if (error.status === 404) return false
        // if (failureCount < 2) return true

        // if instance of error is token not found return false
        // if error instance of axios error and error is equal to 500 : return true up to 3 times ( this better )

        return false
      },
      refetchOnWindowFocus: false,
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
