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
import { SubmitHandler } from 'react-hook-form'

export function UpdateParticipant() {
  const { data: participant, isPending, dataUpdatedAt } = useGetParticipantById()

  // HOOKS
  const useFormHook = useReactHookForm({
    schema: schemaUpdateParticipant,
    defaultValues: {
      alias: participant?.alias ?? '',
      is_main: participant?.is_main ?? false,
    },
    mode: 'onChange',
    defaultValuesDependency: dataUpdatedAt,
  })

  const { mutateAsync } = useUpdateParticipant()

  const { handleSubmit } = useFormHook

  const onSubmit: SubmitHandler<SchemaUpdateParticipant> = async data => {
    if (!participant) return

    try {
      await mutateAsync({ id: participant.id, ...data })
    } catch (error) {}
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
          isLoading={isPending}
        />
        <HookFormButton className='shrink-0' useFormHook={useFormHook}>
          Renombrar
        </HookFormButton>
      </form>
    </section>
  )
}
