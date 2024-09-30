'use client'

// import { SWR_KEY_GET_SESSION } from '../getSession/useGetSession'
import { login } from './login'
import { useMutation } from '@tanstack/react-query'

export function useLogin() {
  // const queryClient = useQueryClient()

  return useMutation({
    mutationFn: login,
    // onSuccess: async (data, variables, context) => {
    //   await queryClient.invalidateQueries({ queryKey: [SWR_KEY_GET_SESSION] })
    // },
  })
}
