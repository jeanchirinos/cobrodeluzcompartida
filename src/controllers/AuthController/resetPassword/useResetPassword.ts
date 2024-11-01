'use client'

import { useMutation } from '@tanstack/react-query'
import { resetPassword } from './resetPassword'

export function useResetPassword() {
  return useMutation({
    mutationFn: resetPassword,
  })
}
