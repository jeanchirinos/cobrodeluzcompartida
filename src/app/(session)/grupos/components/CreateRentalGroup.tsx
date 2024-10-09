'use client'

import { ROUTE } from '@/constants/routes'
import { useCreateRentalGroup } from '@/controllers/RentalGroupController/createRentalGroup/useCreateRentalGroup'
import { IconAdd } from '@/icons'
import { Button } from '@nextui-org/react'
import { useRouter } from 'next/navigation'

export function CreateRentalGroup() {
  const { push } = useRouter()

  const { mutate, isPending } = useCreateRentalGroup()

  function handlePress() {
    mutate(undefined, {
      onSuccess(data) {
        push(ROUTE.GROUPS.REGISTERS.INDEX({ rentalGroupId: data.data.rental_group_id }))
      },
    })
  }

  return (
    <Button color='primary' onPress={handlePress} endContent={<IconAdd />} isLoading={isPending}>
      Crear grupo
    </Button>
  )
}
