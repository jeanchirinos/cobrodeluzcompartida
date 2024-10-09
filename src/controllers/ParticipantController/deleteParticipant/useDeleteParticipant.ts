'use client'

import { toast } from 'sonner'
import { deleteParticipant } from './deleteParticipant'
import { useMutation } from '@tanstack/react-query'

export function useDeleteParticipant() {
  return useMutation({
    mutationFn: deleteParticipant,
    onSuccess(data) {
      toast.success(data.msg)
    },
  })
}
