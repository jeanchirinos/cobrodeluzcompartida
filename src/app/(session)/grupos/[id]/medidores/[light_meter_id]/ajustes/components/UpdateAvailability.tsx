'use client'

import { Spinner, Switch } from '@nextui-org/react'
import { useParticipantContext } from '../../context/ParticipantContext'
import { useState } from 'react'
import { updateParticipant } from '@/controllers/ParticipantController/updateParticipant/updateParticipant'
import { handleResponse } from '@/utilities/handleResponse'

export function UpdateAvailability() {
  const { participant } = useParticipantContext()

  const [isPending, setIsPending] = useState(false)

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setIsPending(true)

    const res = await updateParticipant({
      id: participant.id,
      active: e.target.checked,
      rentalGroupId: participant.rental_group_id,
    })

    await handleResponse({ res })

    setIsPending(false)
  }

  return (
    <section className='flex gap-x-6'>
      <Switch
        classNames={{
          base: 'flex-row-reverse gap-x-6',
        }}
        isDisabled={isPending}
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
