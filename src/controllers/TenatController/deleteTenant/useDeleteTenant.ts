'use client'

import { useSWRMutation } from '@/hooks/useSWRMutation'
import { useParams } from 'next/navigation'
import { deleteTenant } from './deleteTenant'
import { SWR_KEY_GET_TENANTS } from '../getTenants/useGetTenants'

export function useDeleteTenant() {
  const params = useParams()
  const { participantId } = params as { participantId: string }

  return useSWRMutation({ key: SWR_KEY_GET_TENANTS(Number(participantId)), fn: deleteTenant })
}
