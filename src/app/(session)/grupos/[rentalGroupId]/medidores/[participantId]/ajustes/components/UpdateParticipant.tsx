'use client'

import { ErrorUi } from '@/components/other/ComponentError'
import { useReactHookForm } from '@/hooks/useReactHookForm'
import { useGetParticipantById } from '@/controllers/ParticipantController/getParticipantById/useGetParticipantById'
import {
  SchemaUpdateParticipant,
  schemaUpdateParticipant,
} from '@/controllers/ParticipantController/updateParticipant/updateParticipant.schema'
import { useUpdateParticipant } from '@/controllers/ParticipantController/updateParticipant/useUpdateParticipant'
import { Button, Input } from '@nextui-org/react'
import { Controller, SubmitHandler } from 'react-hook-form'

export function UpdateParticipant() {
  const { data: participant, isPending: queryIsPending, isError } = useGetParticipantById()

  // HOOKS
  const {
    handleSubmit,
    control,
    formState: { isDirty, isValid },
    clearErrors,
  } = useReactHookForm({
    schema: schemaUpdateParticipant,
    values: {
      alias: participant?.alias ?? '',
    },
    mode: 'onChange',
  })

  const { mutate, isPending: mutationIsPending } = useUpdateParticipant()

  if (isError) return <ErrorUi />

  const onSubmit: SubmitHandler<SchemaUpdateParticipant> = data => {
    if (!participant) return

    mutate({ id: participant.id, ...data })
  }

  // RENDER
  return (
    <section className='flex w-fit flex-col gap-y-6'>
      <div>
        <h3 className='text-lg font-bold'>Nombre de medidor</h3>
        <p>Identificador único entre tus medidores</p>
      </div>
      <form className='flex gap-4 max-sm:flex-col' onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name='alias'
          control={control}
          render={({ field, fieldState }) => (
            <Input
              type='text'
              {...field}
              value={field.value ?? ''}
              errorMessage={fieldState.error?.message}
              isInvalid={fieldState.invalid}
              isDisabled={queryIsPending}
              onBlur={() => {
                field.onBlur()
                clearErrors()
              }}
            />
          )}
        />

        <Button
          color='primary'
          type='submit'
          isLoading={mutationIsPending}
          isDisabled={queryIsPending || !isDirty || !isValid}
          className='shrink-0'
        >
          Renombrar
        </Button>
      </form>
    </section>
  )
}
