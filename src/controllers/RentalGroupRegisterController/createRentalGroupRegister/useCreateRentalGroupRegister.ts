'use client'

import { useSWRMutation } from '@/hooks/useSWRMutation'
import { createRentalGroupRegister } from './createRentalGroupRegister'

export function useCreateRentalGroupRegister() {
  return useSWRMutation({
    key: '_',
    fn: createRentalGroupRegister,
  })
}
