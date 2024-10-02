'use client'

import { useParams, useSearchParams } from 'next/navigation'
import { RentalGroup } from '@/models/RentalGroup'
import { getRentalGroupRegister } from './getRentalGroupRegister'
import { useQuery } from '@tanstack/react-query'

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

  return useQuery({
    queryKey: [SWR_KEY_GET_RENTAL_GROUP_REGISTER(Number(rentalGroupId), searchParams.toString())],
    queryFn: fetcher,
  })
}
