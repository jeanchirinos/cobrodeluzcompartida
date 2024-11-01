'use client'

import { useMutation } from '@tanstack/react-query'
import { recoverPassword } from './recoverPassword'

export function useRecoverPassword() {
  return useMutation({
    mutationFn: recoverPassword,
  })
}
