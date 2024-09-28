'use client'

import { HookFormButton } from '@/components/ReactForm/HookFormButton'
import { useReactHookForm } from '@/components/ReactForm/useReactHookForm'
import { CustomInput } from '@/components/ReactForm/withHookForm'
import { useGetParticipantById } from '@/controllers/ParticipantController/getParticipantById/useGetParticipantById'
import {
  SchemaUpdateParticipant,
  schemaUpdateParticipant,
} from '@/controllers/ParticipantController/updateParticipant/updateParticipant.schema'
import { useUpdateParticipant } from '@/controllers/ParticipantController/updateParticipant/useUpdateParticipant'
import { handleToast } from '@/utilities/handleToast'
import { SubmitHandler } from 'react-hook-form'

export function UpdateParticipant() {
  const {
    data: { participant },
    isLoading,
    isValidating,
  } = useGetParticipantById()

  // HOOKS
  const useFormHook = useReactHookForm({
    schema: schemaUpdateParticipant,
    defaultValues: participant,
    mode: 'onChange',
    defaultValuesDependency: isValidating,
  })

  const { trigger } = useUpdateParticipant()

  const { handleSubmit } = useFormHook

  const onSubmit: SubmitHandler<SchemaUpdateParticipant> = async data => {
    const res = await trigger({ id: participant.id, ...data })

    handleToast({ res })
  }

  // RENDER
  return (
    <section className='flex w-fit flex-col gap-y-6'>
      <div>
        <h3 className='text-lg font-bold'>Nombre de medidor</h3>
        <p>Identificador único entre tus medidores</p>
      </div>
      <form className='flex gap-4 max-sm:flex-col' onSubmit={handleSubmit(onSubmit)}>
        <CustomInput
          useFormHook={useFormHook}
          name='alias'
          registerOptions={{
            onBlur() {
              useFormHook.clearErrors()
            },
          }}
          isLoading={isLoading}
        />
        <HookFormButton className='shrink-0' useFormHook={useFormHook}>
          Renombrar
        </HookFormButton>
      </form>
    </section>
  )
}
