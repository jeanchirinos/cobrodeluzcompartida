'use client'

import { createRentalGroupRegister } from './createRentalGroupRegister'
import { useMutation } from '@tanstack/react-query'

export function useCreateRentalGroupRegister() {
  return useMutation({
    mutationFn: createRentalGroupRegister,
  })
}
