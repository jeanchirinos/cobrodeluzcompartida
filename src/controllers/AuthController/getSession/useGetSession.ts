'use client'

import { getSession } from './getSession'
import { useQuery } from '@tanstack/react-query'

export const QUERY_KEY_GET_SESSION = 'GET_SESSION'

export function useGetSession() {
  return useQuery({
    queryKey: [QUERY_KEY_GET_SESSION],
    queryFn: getSession,
  })
}
