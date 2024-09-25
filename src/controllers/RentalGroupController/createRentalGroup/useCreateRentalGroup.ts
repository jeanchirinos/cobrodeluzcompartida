'use client'

import { useSWRMutation } from '@/hooks/useSWRMutation'
import { SWR_KEY_GET_RENTAL_GROUPS } from '../getRentalGroups/useGetRentalGroups'
import { createRentalGroup } from './createRentalGroup'

export function useCreateRentalGroup() {
  return useSWRMutation({ key: SWR_KEY_GET_RENTAL_GROUPS, fn: createRentalGroup })
}
