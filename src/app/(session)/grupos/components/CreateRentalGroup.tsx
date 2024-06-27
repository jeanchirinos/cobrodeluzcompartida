'use client'

import { ButtonAction } from '@/components/Button/ButtonAction'
import { ROUTE } from '@/constants/routes'
import { createRentalGroup } from '@/controllers/RentalGroupController/createRentalGroup/createRentalGroup'
import { IconAdd } from '@/icons'
import { useRouter } from 'next/navigation'

export async function CreateRentalGroup() {
  const { push } = useRouter()

  return (
    <ButtonAction
      color='primary'
      action={createRentalGroup}
      actionProps={{
        onSuccess(data) {
          push(ROUTE.GROUPS.REGISTERS({ id: data.rental_group_id }))
        },
      }}
      endContent={<IconAdd />}
    >
      Crear grupo
    </ButtonAction>
  )
}
