'use client'

import { SWR_KEY_GET_PARTICIPANTS } from '../getParticipants/useGetParticipants'
import { createParticipant } from './createParticipant'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useCreateParticipant() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createParticipant,
    onSuccess(data) {
      void queryClient.invalidateQueries({ queryKey: [SWR_KEY_GET_PARTICIPANTS(data.data.rental_group_id)] })
    },
  })
}
