'use client'

import { useSWRMutation } from '@/hooks/useSWRMutation'
import { deleteRentalGroupRegister } from './deleteRentalGroupRegister'

export function useDeleteRentalGroupRegister() {
  return useSWRMutation({
    key: '',
    fn: deleteRentalGroupRegister,
  })
}
