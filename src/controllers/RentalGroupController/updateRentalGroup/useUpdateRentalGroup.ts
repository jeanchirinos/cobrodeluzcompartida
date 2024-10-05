'use client'

import { useParams } from 'next/navigation'
import { QUERY_KEY_GET_RENTAL_GROUP_BY_ID } from '../getRentalGroupById/useGetRentalGroupById'
import { updateRentalGroup } from './updateRentalGroup'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useUpdateRentalGroup() {
  const { rentalGroupId } = useParams()

  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateRentalGroup,
    onSuccess(data) {
      void queryClient.setQueryData([QUERY_KEY_GET_RENTAL_GROUP_BY_ID(Number(rentalGroupId))], data.data)
    },
  })
}
