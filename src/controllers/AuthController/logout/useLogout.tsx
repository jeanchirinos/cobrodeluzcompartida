'use client'

import { COOKIES_TOKEN_NAME } from '@/constants/cookies'
import { ROUTE } from '@/constants/routes'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { removeCookie } from 'typescript-cookie'
import { logout } from './logout'
import { QUERY_KEY_GET_SESSION } from '../getSession/useGetSession'

export function useLogout() {
  const queryClient = useQueryClient()

  const { push } = useRouter()

  return useMutation({
    mutationFn: logout,
    onSuccess() {
      removeCookie(COOKIES_TOKEN_NAME)

      void queryClient.resetQueries({ queryKey: [QUERY_KEY_GET_SESSION] })
      queryClient.removeQueries()

      push(ROUTE.HOME)
    },
  })
}
