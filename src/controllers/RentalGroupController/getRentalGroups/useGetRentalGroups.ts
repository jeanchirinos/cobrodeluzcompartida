'use client'

import { useQuery } from '@tanstack/react-query'
import { getRentalGroups } from './getRentalGroups'

export const QUERY_KEY_GET_RENTAL_GROUPS = 'GET_RENTAL_GROUPS'

export function useGetRentalGroups() {
  return useQuery({
    queryKey: [QUERY_KEY_GET_RENTAL_GROUPS],
    queryFn: getRentalGroups,
  })
}
