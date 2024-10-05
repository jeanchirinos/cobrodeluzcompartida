'use client'

import { QUERY_KEY_GET_PARTICIPANTS } from '../getParticipants/useGetParticipants'
import { createParticipant } from './createParticipant'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useCreateParticipant() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createParticipant,
    onSuccess(data) {
      void queryClient.invalidateQueries({ queryKey: [QUERY_KEY_GET_PARTICIPANTS(data.data.rental_group_id)] })
    },
  })
}
