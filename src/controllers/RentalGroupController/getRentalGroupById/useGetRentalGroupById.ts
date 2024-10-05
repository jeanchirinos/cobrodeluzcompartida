'use client'

import { useParams } from 'next/navigation'
import { getRentalGroupById } from './getRentalGroupById'
import { RentalGroup } from '@/models/RentalGroup'
import { useQuery } from '@tanstack/react-query'

export const QUERY_KEY_GET_RENTAL_GROUP_BY_ID = (id: RentalGroup['id']) => `GET_RENTAL_GROUP_BY_ID_${id}`

export function useGetRentalGroupById() {
  const { rentalGroupId } = useParams()

  const fetcher = () => getRentalGroupById({ id: Number(rentalGroupId) })

  return useQuery({ queryKey: [QUERY_KEY_GET_RENTAL_GROUP_BY_ID(Number(rentalGroupId))], queryFn: fetcher })
}
