'use client'

import { useCreateTenant } from '@/controllers/TenatController/createTenant/useCreateTenant'
import { IconAdd } from '@/icons'
import { handleToast } from '@/utilities/handleToast'
import { Button } from '@nextui-org/react'
import { useParams } from 'next/navigation'

export function AddTenant() {
  const { participantId } = useParams()

  const { trigger, isMutating } = useCreateTenant()

  async function handlePress() {
    const res = await trigger({ participant_id: Number(participantId as string) })

    handleToast({ res })
  }

  return (
    <Button
      color='primary'
      className='w-fit self-end'
      endContent={<IconAdd />}
      onPress={handlePress}
      isLoading={isMutating}
    >
      Agregar inquilino
    </Button>
  )
}
