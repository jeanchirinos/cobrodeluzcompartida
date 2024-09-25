'use client'

import { useSWRMutation } from '@/hooks/useSWRMutation'
import { SWR_KEY_GET_RENTAL_GROUPS } from '../getRentalGroups/useGetRentalGroups'
import { deleteRentalGroup } from './deleteRentalGroup'

export function useDeleteRentalGroup() {
  return useSWRMutation({ key: SWR_KEY_GET_RENTAL_GROUPS, fn: deleteRentalGroup })
}
