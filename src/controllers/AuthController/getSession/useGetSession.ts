'use client'

import { getSession } from './getSession'
import { useQuery } from '@tanstack/react-query'

export const SWR_KEY_GET_SESSION = 'GET_SESSION'

export function useGetSession() {
  return useQuery({
    queryKey: [SWR_KEY_GET_SESSION],
    queryFn: getSession,
  })
}
