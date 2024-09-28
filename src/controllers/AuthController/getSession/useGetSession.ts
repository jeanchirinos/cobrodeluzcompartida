'use client'

import useSWR from 'swr'
import { getSession } from './getSession'

export const SWR_KEY_GET_SESSION = `GET_SESSION`

const fetcher = getSession

export function useGetSession() {
  const useSWRHook = useSWR(SWR_KEY_GET_SESSION, fetcher, {
    onError: async error => {
      if (error.status === 401) {
        await mutate(null, { revalidate: false })
      }
    },
  })

  const { mutate } = useSWRHook

  return useSWRHook
}
