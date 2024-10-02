'use client'

import { useParams } from 'next/navigation'
import { deleteTenant } from './deleteTenant'
import { SWR_KEY_GET_TENANTS } from '../getTenants/useGetTenants'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useDeleteTenant() {
  const params = useParams()
  const { participantId } = params as { participantId: string }

  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteTenant,
    onSuccess() {
      void queryClient.invalidateQueries({ queryKey: [SWR_KEY_GET_TENANTS(Number(participantId))] })
    },
  })
}
