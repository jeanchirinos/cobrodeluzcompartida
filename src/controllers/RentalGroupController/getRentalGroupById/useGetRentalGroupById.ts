'use client'

import { useParams } from 'next/navigation'
import useSWR, { SWRConfiguration } from 'swr'
import { getRentalGroupById, ReturnGetRentalGroupById } from '../getRentalGroupById'

const SWR_KEY_GET_RENTAL_GROUP_BY_ID = (id: any) => 'A' + (id as string)

// props?: SWRConfiguration<ReturnGetRentalGroupById>

export function useGetRentalGroupById(props?: SWRConfiguration<ReturnGetRentalGroupById>) {
  const { rentalGroupId } = useParams()

  const fetcher = () => getRentalGroupById({ id: Number(rentalGroupId) })

  return useSWR(SWR_KEY_GET_RENTAL_GROUP_BY_ID(rentalGroupId), fetcher, {
    fallbackData: {
      rentalGroup: {
        id: 0,
        name: 'Grupo de renta',
      },
    },
    // suspense: true,
    ...props,
  })
}
