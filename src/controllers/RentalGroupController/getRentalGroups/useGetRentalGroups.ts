'use client'

import useSWR from 'swr'
import { getRentalGroups } from './getRentalGroups'

export const SWR_KEY_GET_RENTAL_GROUPS = 'GET_RENTAL_GROUPS'

export function useGetRentalGroups() {
  const fetcher = getRentalGroups

  return useSWR(SWR_KEY_GET_RENTAL_GROUPS, fetcher, {
    fallbackData: {
      rentalGroups: [],
    },
  })
}
