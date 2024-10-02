'use client'

import { useGetParticipantById } from '@/controllers/ParticipantController/getParticipantById/useGetParticipantById'
import { useToggleActiveParticipant } from '@/controllers/ParticipantController/toggleActiveParticipant/useToggleActiveParticipant'
import { Spinner, Switch } from '@nextui-org/react'

export function UpdateParticipantAvailability() {
  const { data: participant, isPending: isPendingQuery } = useGetParticipantById()

  const { mutate, isPending } = useToggleActiveParticipant()

  async function handleChange() {
    if (!participant) return

    mutate({ id: participant.id })
  }

  if (!participant) return <></>

  return (
    <section className='flex gap-x-6'>
      <Switch
        key={String(participant.active)}
        classNames={{
          base: 'flex-row-reverse gap-x-6',
        }}
        isDisabled={isPendingQuery || isPending}
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
