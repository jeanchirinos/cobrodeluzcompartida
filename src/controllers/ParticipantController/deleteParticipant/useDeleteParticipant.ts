'use client'

import { deleteParticipant } from './deleteParticipant'
import { useMutation } from '@tanstack/react-query'

export function useDeleteParticipant() {
  return useMutation({ mutationFn: deleteParticipant })
}
