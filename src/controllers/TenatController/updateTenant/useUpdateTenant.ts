'use client'

import { updateTenant } from './updateTenant'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { QUERY_KEY_GET_TENANTS } from '../getTenants/useGetTenants'
import { useParams } from 'next/navigation'

export function useUpdateTenant() {
  const queryClient = useQueryClient()

  const { participantId } = useParams()

  return useMutation({
    mutationFn: updateTenant,
    onSuccess() {
      void queryClient.invalidateQueries({ queryKey: [QUERY_KEY_GET_TENANTS(Number(participantId))] })
    },
  })
}
