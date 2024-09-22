'use client'

import { useSWRMutation } from '@/hooks/useSWRMutation'
import { SWR_KEY_GET_TENANTS } from '../getTenants/useGetTenants'
import { useParams } from 'next/navigation'
import { createTenant } from './createTenant'

export function useCreateTenant() {
  const params = useParams()
  const { participantId } = params as { participantId: string }

  return useSWRMutation({ key: SWR_KEY_GET_TENANTS(Number(participantId)), fn: createTenant })
}
