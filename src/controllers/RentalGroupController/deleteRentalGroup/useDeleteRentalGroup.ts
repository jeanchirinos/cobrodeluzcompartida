'use client'

import { useMutation } from '@tanstack/react-query'
import { deleteRentalGroup } from './deleteRentalGroup'
import { toast } from 'sonner'

export function useDeleteRentalGroup() {
  return useMutation({
    mutationFn: deleteRentalGroup,
    onSuccess: data => {
      toast.success(data.msg)
    },
  })
}
