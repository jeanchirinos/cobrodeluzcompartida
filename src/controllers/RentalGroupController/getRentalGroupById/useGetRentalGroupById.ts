'use client'

import { useParams } from 'next/navigation'
import useSWR from 'swr'
import { getRentalGroupById } from '../getRentalGroupById'

const SWR_KEY_GET_RENTAL_GROUP_BY_ID = 'A'

export function useGetRentalGroupById() {
  const { rentalGroupId } = useParams()

  const fetcher = () => getRentalGroupById({ id: Number(rentalGroupId) })

  return useSWR(SWR_KEY_GET_RENTAL_GROUP_BY_ID, fetcher, { suspense: true })
}
