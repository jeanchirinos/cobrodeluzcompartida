'use client'

import { toast } from 'sonner'
import { SWRConfig } from 'swr'

export function SwrProvider(props: React.PropsWithChildren) {
  return (
    <SWRConfig
      {...props}
      value={{
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        shouldRetryOnError: false,
        onError(error) {
          if (process.env.NODE_ENV === 'development') {
            toast.error(error.message)
          } else {
            toast.error('Ha ocurrido un error')
          }
        },
      }}
    />
  )
}
