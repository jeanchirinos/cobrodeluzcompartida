'use client'

import { useSWRMutation } from '@/hooks/useSWRMutation'
import { useParams } from 'next/navigation'
import { SWR_KEY_GET_PARTICIPANT_BY_ID } from '../getParticipantById/useGetParticipantById'
import { updateParticipant } from './updateParticipant'

export function useUpdateParticipant() {
  const { participantId } = useParams()

  return useSWRMutation({
    key: SWR_KEY_GET_PARTICIPANT_BY_ID(Number(participantId)),
    fn: updateParticipant,
  })
}
