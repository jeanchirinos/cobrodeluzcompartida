'use client'

import { useCreateParticipant } from '@/controllers/ParticipantController/createParticipant/useCreateParticipant'
import { IconAdd } from '@/icons'
import { handleToast } from '@/utilities/handleToast'
import { Button } from '@nextui-org/react'
import { useParams } from 'next/navigation'

export function AddParticipant() {
  const { rentalGroupId } = useParams()
  const { trigger, isMutating } = useCreateParticipant()

  async function handlePress() {
    const res = await trigger({ rental_group_id: Number(rentalGroupId) })

    handleToast({ res })
  }

  return (
    <Button
      color='primary'
      className='w-fit self-end'
      endContent={<IconAdd />}
      isLoading={isMutating}
      onPress={handlePress}
    >
      Agregar medidor
    </Button>
  )
}
