'use client'

import { ErrorUi } from '@/components/other/ComponentError'
import { useReactHookForm } from '@/hooks/useReactHookForm'
import { useGetRentalGroupById } from '@/controllers/RentalGroupController/getRentalGroupById/useGetRentalGroupById'
import {
  SchemaUpdateRentalGroup,
  schemaUpdateRentalGroup,
} from '@/controllers/RentalGroupController/updateRentalGroup/updateRentalGroup.schema'
import { useUpdateRentalGroup } from '@/controllers/RentalGroupController/updateRentalGroup/useUpdateRentalGroup'
import { Button, Input } from '@nextui-org/react'
import { Controller, SubmitHandler } from 'react-hook-form'

export function UpdateGroup() {
  return (
    <label className='flex w-fit flex-col gap-y-6'>
      <div>
        <h3 className='text-lg font-bold'>Nombre de grupo</h3>
        <p>Identificador único entre tus grupos de consumo</p>
      </div>
      <UpdateNameForm />
    </label>
  )
}

function UpdateNameForm() {
  const { data: rentalGroup, isPending: queryIsPending, isError } = useGetRentalGroupById()

  const {
    handleSubmit,
    control,
    formState: { isDirty, isValid },
  } = useReactHookForm({
    schema: schemaUpdateRentalGroup,
    values: {
      name: rentalGroup?.name ?? '',
    },
    mode: 'onChange',
  })

  const { mutate, isPending: mutationIsPending } = useUpdateRentalGroup()

  if (isError) return <ErrorUi />

  const onSubmit: SubmitHandler<SchemaUpdateRentalGroup> = data => {
    if (queryIsPending) return

    mutate({ id: rentalGroup.id, ...data })
  }

  return (
    <form className='flex gap-4 max-sm:flex-col' onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name='name'
        control={control}
        render={({ field, fieldState }) => (
          <Input
            type='text'
            {...field}
            value={field.value ?? ''}
            errorMessage={fieldState.error?.message}
            isInvalid={fieldState.invalid}
            isDisabled={queryIsPending}
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
  )
}
