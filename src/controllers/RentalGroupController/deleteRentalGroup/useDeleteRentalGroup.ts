'use client'

import { useMutation } from '@tanstack/react-query'
import { deleteRentalGroup } from './deleteRentalGroup'

export function useDeleteRentalGroup() {
  return useMutation({ mutationFn: deleteRentalGroup })
}
