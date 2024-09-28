'use client'

import { COOKIES_TOKEN_NAME } from '@/constants/cookies'
import { ROUTE } from '@/constants/routes'
import { useRouter } from 'next/navigation'
import { SWRConfig } from 'swr'
import { removeCookie } from 'typescript-cookie'

export function SwrProvider(props: React.PropsWithChildren) {
  const { push } = useRouter()

  return (
    <SWRConfig
      {...props}
      value={{
        revalidateOnFocus: false,
        shouldRetryOnError: false,
        onError(error) {
          if (error.status === 401) {
            removeCookie(COOKIES_TOKEN_NAME)
            // push(ROUTE.HOME)
          }
        },
        onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
          // Never retry on different from 500.
          if (error.status !== 500) return

          // Only retry up to 10 times.
          if (retryCount >= 3) return

          // Retry after 5 seconds.
          setTimeout(() => revalidate({ retryCount }), 5000)
        },
      }}
    />
  )
}
