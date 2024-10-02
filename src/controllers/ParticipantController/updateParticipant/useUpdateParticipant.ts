'use client'

import { useParams } from 'next/navigation'
import { SWR_KEY_GET_PARTICIPANT_BY_ID } from '../getParticipantById/useGetParticipantById'
import { updateParticipant } from './updateParticipant'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ResponseGetParticipantById } from '../getParticipantById/getParticipantById'

export function useUpdateParticipant() {
  const { participantId } = useParams()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateParticipant,
    onSuccess(data) {
      void queryClient.setQueryData(
        [SWR_KEY_GET_PARTICIPANT_BY_ID(Number(participantId))],
        data.data satisfies ResponseGetParticipantById,
      )
    },
  })
}
