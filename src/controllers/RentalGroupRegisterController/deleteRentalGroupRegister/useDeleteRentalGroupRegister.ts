'use client'

import { useMutation } from '@tanstack/react-query'
import { deleteRentalGroupRegister } from './deleteRentalGroupRegister'

export function useDeleteRentalGroupRegister() {
  return useMutation({
    mutationFn: deleteRentalGroupRegister,
  })
}
