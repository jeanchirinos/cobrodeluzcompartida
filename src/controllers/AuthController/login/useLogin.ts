'use client'

import { toast } from 'sonner'
import { QUERY_KEY_GET_SESSION } from '../getSession/useGetSession'
import { login } from './login'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useLogin() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: login,
    onSuccess() {
      void queryClient.invalidateQueries({ queryKey: [QUERY_KEY_GET_SESSION] })
    },
    onError(error) {
      // TODO: Function to get the error message
      // @ts-expect-error : This is a TODO
      const msg = error.response?.data?.msg

      const message = msg ?? 'Ocurrió un error al intentar iniciar sesión'

      toast.error(message)
    },
  })
}
