'use client'

import { QUERY_KEY_GET_TENANTS } from '../getTenants/useGetTenants'
import { useParams } from 'next/navigation'
import { createTenant } from './createTenant'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useCreateTenant() {
  const params = useParams()
  const { participantId } = params as { participantId: string }

  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createTenant,
    onSuccess() {
      void queryClient.invalidateQueries({ queryKey: [QUERY_KEY_GET_TENANTS(Number(participantId))] })
    },
  })
}
