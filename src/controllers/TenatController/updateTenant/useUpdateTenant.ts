'use client'

import { useSWRMutation } from '@/hooks/useSWRMutation'
import { updateTenant } from './updateTenant'
import { SWR_KEY_GET_TENANT } from '../getTenantById/useGetTenantById'

export function useUpdateTenant() {
  return useSWRMutation({ key: SWR_KEY_GET_TENANT(0), fn: updateTenant })
}
