'use client'

import useSWR from 'swr'
import { getSession } from '../getSession'

export const SWR_KEY_GET_SESSION = `GET_SESSION`

export function useGetSession() {
  return useSWR(SWR_KEY_GET_SESSION, getSession, {
    fallbackData: { session: null },
  })
}
