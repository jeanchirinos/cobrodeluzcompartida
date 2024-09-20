'use client'

import { login } from './login'
import { SWR_KEY_GET_SESSION } from '../getSession/useGetSession'
import { useSWRMutation } from '@/hooks/useSWRMutation'

export function useLogin() {
  return useSWRMutation({ key: SWR_KEY_GET_SESSION, fn: login })
}
