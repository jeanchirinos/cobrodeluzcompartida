'use client'

import { useParams } from 'next/navigation'
import useSWR from 'swr'
import { getParticipants } from './getParticipants'
import { RentalGroup } from '@/models/RentalGroup'

export const SWR_KEY_GET_PARTICIPANTS = (id: RentalGroup['id']) => `GET_PARTICIPANTS_${id}`

export function useGetParticipants() {
  const params = useParams()
  const { rentalGroupId } = params as { rentalGroupId: string }

  const fetcher = () => getParticipants({ rentalGroupId: Number(rentalGroupId) })

  return useSWR(SWR_KEY_GET_PARTICIPANTS(Number(rentalGroupId)), fetcher, {
    fallbackData: {
      participants: [],
    },
  })
}
