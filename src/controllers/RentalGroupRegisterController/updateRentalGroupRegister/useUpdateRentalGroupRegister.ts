'use client'

import { useMutation } from '@tanstack/react-query'
import { updateRentalGroupRegister } from './updateRentalGroupRegister'

export function useUpdateRentalGroupRegister() {
  return useMutation({
    mutationFn: updateRentalGroupRegister,
  })
}
