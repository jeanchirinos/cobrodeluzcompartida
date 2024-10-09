'use client'

import { ROUTE } from '@/constants/routes'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { createRentalGroupWithRegister } from './createRentalGroupWithRegister'

export function useCreateRentalGroupWithRegister() {
  const { push } = useRouter()

  return useMutation({
    mutationFn: createRentalGroupWithRegister,
    onMutate() {
      toast.loading('Creando grupo y registro', {
        id: 'createRentalGroupWithRegister',
        dismissible: false,
        position: 'top-right',
        style: {
          backgroundColor: 'var(--info-bg)',
          borderColor: 'var(--info-border)',
          color: 'var(--info-text)',
        },
      })
    },
    onSuccess(data) {
      const { rental_group_id } = data.data

      push(ROUTE.GROUPS.REGISTERS.INDEX({ rentalGroupId: rental_group_id }))
    },

    onError(error) {
      toast.warning(error.message)
      push(ROUTE.GROUPS.INDEX)
    },
    onSettled() {
      toast.dismiss('createRentalGroupWithRegister')
    },
  })
}
