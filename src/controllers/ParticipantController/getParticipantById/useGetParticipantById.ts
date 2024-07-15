'use client'

import { useParams } from 'next/navigation'
import useSWR from 'swr'
import { getParticipantById } from './getParticipantById'
import { Participant } from '@/models/Participant'

export const SWR_KEY_GET_PARTICIPANT_BY_ID = (id: Participant['id']) => `GET_PARTICIPANT_ID_${id}`

export function useGetParticipantById() {
  const { participantId } = useParams()

  const fetcher = () => getParticipantById({ id: Number(participantId) })

  return useSWR(SWR_KEY_GET_PARTICIPANT_BY_ID(Number(participantId)), fetcher, {
    fallbackData: {
      participant: {
        id: 0,
        active: false,
        alias: '',
        is_main: false,
        rental_group_id: 0,
      },
    },
  })
}
