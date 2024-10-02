'use client'

import { useQuery } from '@tanstack/react-query'
import { getRentalGroups } from './getRentalGroups'

export const SWR_KEY_GET_RENTAL_GROUPS = 'GET_RENTAL_GROUPS'

export function useGetRentalGroups() {
  const initialDataValue = {
    rentalGroups: [],
  }

  return useQuery({
    queryKey: [SWR_KEY_GET_RENTAL_GROUPS],
    queryFn: getRentalGroups,
    initialData: initialDataValue,
  })
}
