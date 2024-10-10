'use client'

import { useParams, useSearchParams } from 'next/navigation'
import { RentalGroup } from '@/models/RentalGroup'
import { getRentalGroupRegister } from './getRentalGroupRegister'
import { useQuery } from '@tanstack/react-query'

export const QUERY_KEY_GET_RENTAL_GROUP_REGISTER = (id: RentalGroup['id'], searchParams: string) =>
  `GET_RENTAL_REGISTER_${id}_${searchParams}`

export function useGetRentalGroupRegister() {
  const { rentalGroupId } = useParams()
  const searchParams = useSearchParams()

  const yearSearchParam = searchParams.get('year')
  const monthSearchParam = searchParams.get('month')

  const fetcher = () =>
    getRentalGroupRegister({
      rentalGroupId: Number(rentalGroupId),
      year: yearSearchParam ? Number(yearSearchParam) : undefined,
      month: monthSearchParam ? Number(monthSearchParam) : undefined,
    })

  return useQuery({
    queryKey: [QUERY_KEY_GET_RENTAL_GROUP_REGISTER(Number(rentalGroupId), searchParams.toString())],
    queryFn: fetcher,
  })
}
