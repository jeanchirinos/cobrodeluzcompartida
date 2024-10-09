'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toggleActiveParticipant } from './toggleActiveParticipant'
import { QUERY_KEY_GET_PARTICIPANT_BY_ID } from '../getParticipantById/useGetParticipantById'
import { useParams } from 'next/navigation'
import { ResponseGetParticipantById } from '../getParticipantById/getParticipantById'

export function useToggleActiveParticipant() {
  const { participantId } = useParams()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: toggleActiveParticipant,
    onSuccess(data) {
      void queryClient.setQueryData(
        [QUERY_KEY_GET_PARTICIPANT_BY_ID(Number(participantId))],
        data.data satisfies ResponseGetParticipantById,
      )
    },
  })
}
