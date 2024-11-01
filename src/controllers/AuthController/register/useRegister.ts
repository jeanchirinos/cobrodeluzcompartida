'use client'

import { useMutation } from '@tanstack/react-query'
import { register } from './register'

export function useRegister() {
  return useMutation({
    mutationFn: register,
    // onError(error) {
    //   // TODO: Function to get the error message
    //   // @ts-expect-error : This is a TODO
    //   const msg = error.response?.data?.msg

    //   const message = msg ?? 'Ocurrió un error al intentar iniciar sesión'

    //   toast.error(message)
    // },
  })
}
