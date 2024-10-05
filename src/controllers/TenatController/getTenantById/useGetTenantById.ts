'use client'

import { Tenant } from '@/models/Tenant'
import { useParams } from 'next/navigation'
import { getTenantById } from './getTenantById'
import { useQuery } from '@tanstack/react-query'

export const QUERY_KEY_GET_TENANT = (id: Tenant['id']) => `GET_TENANT_${id}`

export function useGetTenant() {
  const params = useParams()
  const { tenantId } = params as { tenantId: string }

  const fetcher = () => getTenantById({ id: Number(tenantId) })

  return useQuery({ queryKey: [QUERY_KEY_GET_TENANT(Number(tenantId))], queryFn: fetcher })
}
