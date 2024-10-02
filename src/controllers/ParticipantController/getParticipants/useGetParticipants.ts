'use client'

import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { getParticipants } from './getParticipants'
import { RentalGroup } from '@/models/RentalGroup'

export const SWR_KEY_GET_PARTICIPANTS = (id: RentalGroup['id']) => `GET_PARTICIPANTS_${id}`

export function useGetParticipants() {
  const params = useParams()
  const { rentalGroupId } = params as { rentalGroupId: string }

  const queryFn = () => getParticipants({ rentalGroupId: Number(rentalGroupId) })

  return useQuery({
    queryKey: [SWR_KEY_GET_PARTICIPANTS(Number(rentalGroupId))],
    queryFn,
  })
}
