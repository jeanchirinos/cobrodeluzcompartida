'use client'

import { useSWRMutation } from '@/hooks/useSWRMutation'
import { SWR_KEY_GET_PARTICIPANTS } from '../getParticipants/useGetParticipants'
import { deleteParticipant } from './deleteParticipant'
import { useParams } from 'next/navigation'

export function useDeleteParticipant() {
  const { rentalGroupId } = useParams()

  return useSWRMutation({ key: SWR_KEY_GET_PARTICIPANTS(Number(rentalGroupId)), fn: deleteParticipant })
}
