'use client'

import { useParams } from 'next/navigation'
import useSWR from 'swr'
import { getRentalGroupById } from './getRentalGroupById'
import { RentalGroup } from '@/models/RentalGroup'

export const SWR_KEY_GET_RENTAL_GROUP_BY_ID = (id: RentalGroup['id']) => `GET_RENTAL_GROUP_BY_ID_${id}`

export function useGetRentalGroupById() {
  const { rentalGroupId } = useParams()

  const fetcher = () => getRentalGroupById({ id: Number(rentalGroupId) })

  return useSWR(SWR_KEY_GET_RENTAL_GROUP_BY_ID(Number(rentalGroupId)), fetcher, {
    fallbackData: {
      id: 0,
      name: '',
    },
  })
}
