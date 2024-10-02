'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

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
    mutations: {
      onError(error) {
        if (error instanceof AxiosError) {
          const customMessage = error.response?.data.msg ?? 'Error en petición'

          toast.error(customMessage)
        }
      },
      onSettled(data, _, __, context) {
        if (data) {
          const { showSuccessToast = true } = (context as any) ?? {}
          if (showSuccessToast) {
            // @ts-expect-error
            toast.success(data.msg)
          }
        }
      },
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
