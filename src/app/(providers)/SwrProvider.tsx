'use client'

import { type PropsWithChildren } from 'react'
import { SWRConfig } from 'swr'

export function SwrProvider(props: PropsWithChildren) {
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
