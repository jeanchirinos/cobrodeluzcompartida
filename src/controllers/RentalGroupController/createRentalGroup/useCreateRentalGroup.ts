'use client'

import { createRentalGroup } from './createRentalGroup'
import { useMutation } from '@tanstack/react-query'

export function useCreateRentalGroup() {
  return useMutation({
    mutationFn: createRentalGroup,
  })
}
