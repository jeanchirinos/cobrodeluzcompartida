'use client'

import { SWRConfig } from 'swr'

export function SwrProvider(props: React.PropsWithChildren) {
  return (
    <SWRConfig
      {...props}
      value={{
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        shouldRetryOnError: false,
      }}
    />
  )
}
