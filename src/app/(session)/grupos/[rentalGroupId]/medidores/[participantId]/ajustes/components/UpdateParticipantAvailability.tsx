'use client'

import { Spinner, Switch } from '@nextui-org/react'
import { useState } from 'react'
import { handleResponse } from '@/utilities/handleResponse'
import { toggleActiveParticipant } from '@/controllers/ParticipantController/toggleActiveParticipant'
import { useGetParticipantById } from '@/controllers/ParticipantController/getParticipantById/useGetParticipantById'

export function UpdateParticipantAvailability() {
  const {
    data: { participant },
    isLoading,
  } = useGetParticipantById()

  const [isPending, setIsPending] = useState(false)

  async function handleChange() {
    setIsPending(true)

    const res = await toggleActiveParticipant({
      participantId: participant.id,
    })

    await handleResponse({ res })

    setIsPending(false)
  }

  return (
    <section className='flex gap-x-6'>
      <Switch
        key={String(participant.active)}
        classNames={{
          base: 'flex-row-reverse gap-x-6',
        }}
        isDisabled={isPending || isLoading}
        onChange={handleChange}
        defaultSelected={participant.active}
      >
        <div className='flex flex-col gap-y-1'>
          <h3 className='text-lg font-bold'>Disponibilidad</h3>
          <p>Si está activo, el medidor será considerado en el cálculo.</p>
        </div>
      </Switch>
      {isPending && <Spinner />}
    </section>
  )
}
