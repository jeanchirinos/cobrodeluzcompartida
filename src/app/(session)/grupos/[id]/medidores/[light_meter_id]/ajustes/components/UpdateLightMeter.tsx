'use client'

import { CustomInput } from '@/components/ReactForm/withHookForm'
import { HookFormButton } from '@/components/ReactForm/HookFormButton'
import { useReactHookForm } from '@/components/ReactForm/useReactHookForm'
import { schemaUpdateParticipant } from '@/controllers/ParticipantController/updateParticipant/updateParticipant.schema'
import { updateParticipant } from '@/controllers/ParticipantController/updateParticipant/updateParticipant'
// import { useRentalGroupContext } from '../../context/RentalGroupContext'

const lightMeter = { id: 1, alias: 'Medidor 1', key: '212313124124', avatar_url: 'https://asasa.com' }

export function UpdateLightMeter() {
  // CONTEXT
  // const { rentalGroup } = useRentalGroupContext()

  // HOOKS
  const { useFormHook } = useReactHookForm({
    schema: schemaUpdateParticipant,
    defaultValues: lightMeter,
    mode: 'onChange',
    submitActionFn: data => updateParticipant({ ...data, id: lightMeter.id, rentalGroupId: 70 }),
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
