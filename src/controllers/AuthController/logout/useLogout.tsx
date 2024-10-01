'use client'

import { COOKIES_TOKEN_NAME } from '@/constants/cookies'
import { ROUTE } from '@/constants/routes'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { removeCookie } from 'typescript-cookie'
import { logout } from './logout'

export function useLogout() {
  const queryClient = useQueryClient()

  const { push } = useRouter()

  return useMutation({
    mutationFn: logout,
    onSuccess: async () => {
      removeCookie(COOKIES_TOKEN_NAME)
      await queryClient.resetQueries()
      queryClient.removeQueries()

      push(ROUTE.HOME)
    },
  })
}
