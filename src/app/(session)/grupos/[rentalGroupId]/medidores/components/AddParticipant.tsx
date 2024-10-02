'use client'

import { useCreateParticipant } from '@/controllers/ParticipantController/createParticipant/useCreateParticipant'
import { IconAdd } from '@/icons'
import { Button } from '@nextui-org/react'
import { useParams } from 'next/navigation'

export function AddParticipant() {
  const { rentalGroupId } = useParams()
  const { mutate, isPending } = useCreateParticipant()

  return (
    <Button
      color='primary'
      className='w-fit self-end'
      endContent={<IconAdd />}
      isLoading={isPending}
      onPress={() => mutate({ rental_group_id: Number(rentalGroupId) })}
    >
      Agregar medidor
    </Button>
  )
}
