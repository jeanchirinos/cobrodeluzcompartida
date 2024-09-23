'use client'

import { SWR_KEY_GET_SESSION } from '../getSession/useGetSession'
import { useSWRMutation } from '@/hooks/useSWRMutation'
import { logout } from './logout'

export function useLogout() {
  return useSWRMutation({ key: SWR_KEY_GET_SESSION, fn: logout })
}
