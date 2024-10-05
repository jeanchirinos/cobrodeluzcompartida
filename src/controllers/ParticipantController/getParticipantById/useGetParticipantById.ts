'use client'

import { useParams } from 'next/navigation'
import { getParticipantById } from './getParticipantById'
import { Participant } from '@/models/Participant'
import { useQuery } from '@tanstack/react-query'

export const QUERY_KEY_GET_PARTICIPANT_BY_ID = (id: Participant['id']) => `GET_PARTICIPANT_ID_${id}`

export function useGetParticipantById() {
  const { participantId } = useParams()

  const fetcher = () => getParticipantById({ id: Number(participantId) })

  return useQuery({ queryKey: [QUERY_KEY_GET_PARTICIPANT_BY_ID(Number(participantId))], queryFn: fetcher })
}
