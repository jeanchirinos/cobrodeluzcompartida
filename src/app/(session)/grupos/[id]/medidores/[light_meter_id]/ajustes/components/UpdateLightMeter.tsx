'use client'

import { CustomInput } from '@/components/ReactForm/withHookForm'
import { HookFormButton } from '@/components/ReactForm/HookFormButton'
import { useReactHookForm } from '@/components/ReactForm/useReactHookForm'
import { schemaUpdateParticipant } from '@/controllers/ParticipantController/updateParticipant/updateParticipant.schema'
import { updateParticipant } from '@/controllers/ParticipantController/updateParticipant/updateParticipant'
import { useParticipantContext } from '../../context/ParticipantContext'
import { useRentalGroupContext } from '../../../../context/RentalGroupContext'

export function UpdateLightMeter() {
  // CONTEXT
  const { participant } = useParticipantContext()
  const { rentalGroup } = useRentalGroupContext()

  // HOOKS
  const { useFormHook } = useReactHookForm({
    schema: schemaUpdateParticipant,
    defaultValues: participant,
    mode: 'onChange',
    submitActionFn: data => updateParticipant({ ...data, id: participant.id, rentalGroupId: rentalGroup.id }),
  })

  // RENDER
  return (
    <section className='flex w-fit flex-col gap-y-6'>
      <div>
        <h3 className='text-lg font-bold'>Nombre de medidor</h3>
        <p>Identificador único entre tus medidores</p>
      </div>
      <form className='flex gap-4 max-sm:flex-col' onSubmit={useFormHook.onSubmit}>
        <CustomInput
          useFormHook={useFormHook}
          name='alias'
          registerOptions={{
            onBlur() {
              useFormHook.clearErrors()
            },
          }}
        />
        <HookFormButton className='shrink-0' useFormHook={useFormHook}>
          Renombrar
        </HookFormButton>
      </form>
    </section>
  )
}