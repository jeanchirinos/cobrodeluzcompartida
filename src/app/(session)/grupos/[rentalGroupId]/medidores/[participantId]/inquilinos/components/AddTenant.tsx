'use client'

import { useCreateTenant } from '@/controllers/TenatController/createTenant/useCreateTenant'
import { IconAdd } from '@/icons'
import { Button } from '@nextui-org/react'
import { useParams } from 'next/navigation'

export function AddTenant() {
  const { participantId } = useParams()
  const { mutate, isPending } = useCreateTenant()

  return (
    <Button
      color='primary'
      className='w-fit self-end'
      endContent={<IconAdd />}
      onPress={() => mutate({ participant_id: Number(participantId) })}
      isLoading={isPending}
    >
      Agregar inquilino
    </Button>
  )
}
