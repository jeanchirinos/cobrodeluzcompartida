'use client'

import { useSWRMutation } from '@/hooks/useSWRMutation'
import { useParams } from 'next/navigation'
import { SWR_KEY_GET_PARTICIPANTS } from '../getParticipants/useGetParticipants'
import { createParticipant } from './createParticipant'

export function useCreateParticipant() {
  const { rentalGroupId } = useParams()

  return useSWRMutation({ key: SWR_KEY_GET_PARTICIPANTS(Number(rentalGroupId)), fn: createParticipant })
}
