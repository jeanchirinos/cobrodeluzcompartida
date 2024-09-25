'use client'

import { useSWRMutation } from '@/hooks/useSWRMutation'
import { useParams } from 'next/navigation'
import { SWR_KEY_GET_RENTAL_GROUP_BY_ID } from '../getRentalGroupById/useGetRentalGroupById'
import { updateRentalGroup } from './updateRentalGroup'

export function useUpdateRentalGroup() {
  const { rentalGroupId } = useParams()

  return useSWRMutation({
    key: SWR_KEY_GET_RENTAL_GROUP_BY_ID(Number(rentalGroupId)),
    fn: updateRentalGroup,
  })
}
