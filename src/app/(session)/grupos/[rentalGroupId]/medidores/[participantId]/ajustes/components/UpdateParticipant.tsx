'use client'

import { CustomInput } from '@/components/ReactForm/withHookForm'
import { HookFormButton } from '@/components/ReactForm/HookFormButton'
import { useReactHookForm } from '@/components/ReactForm/useReactHookForm'
import { schemaUpdateParticipant } from '@/controllers/ParticipantController/updateParticipant/updateParticipant.schema'
import { updateParticipant } from '@/controllers/ParticipantController/updateParticipant/updateParticipant'
import { useGetParticipantById } from '@/controllers/ParticipantController/getParticipantById/useGetParticipantById'

export function UpdateParticipant() {
  // CONTEXT
  const {
    data: { participant },
    isLoading,
    isValidating,
    mutate,
  } = useGetParticipantById()

  // HOOKS
  const { useFormHook } = useReactHookForm({
    schema: schemaUpdateParticipant,
    defaultValues: participant,
    mode: 'onChange',
    // submitActionFn: data => updateParticipant({ ...data, id: participant.id }),
    submitActionFn: async data => {
      const res = await updateParticipant({ ...data, id: participant.id })

      // await mutate(
      //   {
      //     participant: {
      //       id: 0,
      //     },
      //   },
      //   {
      //     revalidate: false,
      //   },
      // )

      await mutate()

      return res
    },
    defaultValuesDependency: isValidating,
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
          isLoading={isLoading}
        />
        <HookFormButton className='shrink-0' useFormHook={useFormHook}>
          Renombrar
        </HookFormButton>
      </form>
    </section>
  )
}
