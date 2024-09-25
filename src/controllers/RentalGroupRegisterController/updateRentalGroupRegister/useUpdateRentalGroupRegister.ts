'use client'

import { useSWRMutation } from '@/hooks/useSWRMutation'
import { SWR_KEY_GET_RENTAL_GROUP_REGISTER } from '../getRentalGroupRegister/useGetRentalRegister'
import { updateRentalGroupRegister } from './updateRentalGroupRegister'
import { useParams, useSearchParams } from 'next/navigation'

export function useUpdateRentalGroupRegister() {
  const { rentalGroupId } = useParams()
  const searchParams = useSearchParams()

  return useSWRMutation({
    key: SWR_KEY_GET_RENTAL_GROUP_REGISTER(Number(rentalGroupId), searchParams.toString()),
    fn: updateRentalGroupRegister,
  })
}
