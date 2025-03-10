'use client'

import { ErrorUi } from '@/components/other/ComponentError'
import { useGetParticipantById } from '@/controllers/ParticipantController/getParticipantById/useGetParticipantById'
import { useToggleActiveParticipant } from '@/controllers/ParticipantController/toggleActiveParticipant/useToggleActiveParticipant'
import { Spinner, Switch } from '@heroui/react'

export function UpdateParticipantAvailability() {
  const { data: participant, isPending: isPendingQuery, isError } = useGetParticipantById()

  const { mutate, isPending: isMutating } = useToggleActiveParticipant()

  if (isError) return <ErrorUi />

  async function handleChange() {
    if (!participant) return

    mutate({ id: participant.id })
  }

  const { active = false } = participant ?? {}

  return (
    <section className='flex gap-x-6'>
      <Switch
        classNames={{
          base: 'flex-row-reverse gap-x-6',
        }}
        isDisabled={isPendingQuery || isMutating}
        onChange={handleChange}
        defaultSelected={active}
      >
        <div className='flex flex-col gap-y-1'>
          <h3 className='text-lg font-bold'>Disponibilidad</h3>
          <p>Si está activo, el medidor será considerado en el cálculo.</p>
        </div>
      </Switch>
      {isMutating && <Spinner />}
    </section>
  )
}
