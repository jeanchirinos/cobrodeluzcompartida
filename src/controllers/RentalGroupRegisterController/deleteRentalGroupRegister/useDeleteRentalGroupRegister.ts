'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteRentalGroupRegister } from './deleteRentalGroupRegister'
import { QUERY_KEY_GET_RENTAL_GROUP_REGISTER } from '../getRentalGroupRegister/useGetRentalRegister'
import { useParams, useSearchParams } from 'next/navigation'

export function useDeleteRentalGroupRegister() {
  const queryClient = useQueryClient()

  const { rentalGroupId } = useParams()
  const searchParams = useSearchParams()

  return useMutation({
    mutationFn: deleteRentalGroupRegister,
    onSuccess() {
      void queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_GET_RENTAL_GROUP_REGISTER(Number(rentalGroupId), searchParams.toString())],
      })
    },
  })
}
