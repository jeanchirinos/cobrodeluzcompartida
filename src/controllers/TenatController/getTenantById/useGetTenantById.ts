'use client'

import { Tenant } from '@/models/Tenant'
import { useParams } from 'next/navigation'
import useSWR from 'swr'
import { getTenantById } from './getTenantById'

export const SWR_KEY_GET_TENANT = (id: Tenant['id']) => `GET_TENANT_${id}`

export function useGetTenant() {
  const params = useParams()
  const { tenantId } = params as { tenantId: string }

  const fetcher = () => getTenantById({ id: Number(tenantId) })

  return useSWR(SWR_KEY_GET_TENANT(Number(tenantId)), fetcher)
}
