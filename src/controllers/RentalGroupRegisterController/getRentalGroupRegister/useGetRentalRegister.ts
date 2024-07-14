'use client'

import { useParams, useSearchParams } from 'next/navigation'
import useSWR from 'swr'
import { RentalGroup } from '@/models/RentalGroup'
import { getRentalGroupRegister } from './getRentalGroupRegister'

export const SWR_KEY_GET_RENTAL_GROUP_REGISTER = (id: RentalGroup['id'], searchParams: string) =>
  `GET_RENTAL_REGISTER_${id}_${searchParams}`

export function useGetRentalGroupRegister() {
  const { rentalGroupId } = useParams()
  const searchParams = useSearchParams()

  const fetcher = () =>
    getRentalGroupRegister({
      params: { rentalGroupId: Number(rentalGroupId) },
      searchParams: Object.fromEntries(searchParams.entries()),
    })

  return useSWR(SWR_KEY_GET_RENTAL_GROUP_REGISTER(Number(rentalGroupId), searchParams.toString()), fetcher, {
    fallbackData: {
      rentalGroupRegister: null,
    },
  })
}
