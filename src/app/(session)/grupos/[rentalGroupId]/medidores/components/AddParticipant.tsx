'use client'

import { createParticipant } from '@/controllers/ParticipantController/createParticipant/createParticipant'
import { useSwrParticipantsConfig } from '@/controllers/ParticipantController/getParticipants/useGetParticipants'
import { IconAdd } from '@/icons'
import { handleResponse } from '@/utilities/handleResponse'
import { Button } from '@nextui-org/react'
import useSWRMutation from 'swr/mutation'

export function AddParticipant() {
  const { key, rentalGroupId } = useSwrParticipantsConfig()

  const { trigger, isMutating } = useSWRMutation(key, async () => {
    const res = await createParticipant({ rental_group_id: rentalGroupId })

    await handleResponse({
      res,
    })
  })

  return (
    <Button
      color='primary'
      className='w-fit self-end'
      endContent={<IconAdd />}
      isLoading={isMutating}
      onPress={() => trigger()}
    >
      Agregar medidor
    </Button>
  )
}
