'use client'

import { HookFormButton } from '@/components/ReactForm/HookFormButton'
import { useReactHookForm } from '@/components/ReactForm/useReactHookForm'
import { CustomInput } from '@/components/ReactForm/withHookForm'
import { useGetRentalGroupById } from '@/controllers/RentalGroupController/getRentalGroupById/useGetRentalGroupById'
import {
  SchemaUpdateRentalGroup,
  schemaUpdateRentalGroup,
} from '@/controllers/RentalGroupController/updateRentalGroup/updateRentalGroup.schema'
import { useUpdateRentalGroup } from '@/controllers/RentalGroupController/updateRentalGroup/useUpdateRentalGroup'
import { SubmitHandler } from 'react-hook-form'

export function UpdateGroup() {
  return (
    <section className='flex w-fit flex-col gap-y-6'>
      <div>
        <h3 className='text-lg font-bold'>Nombre de grupo</h3>
        <p>Identificador único entre tus grupos de consumo</p>
      </div>
      <UpdateNameForm />
    </section>
  )
}

function UpdateNameForm() {
  const { data: rentalGroup, dataUpdatedAt, isPending: queryIsPending } = useGetRentalGroupById()

  // HOOKS
  const useFormHook = useReactHookForm({
    schema: schemaUpdateRentalGroup,
    defaultValues: {
      name: rentalGroup?.name ?? '',
    },
    mode: 'onChange',
    defaultValuesDependency: dataUpdatedAt,
  })

  const { mutate, isPending } = useUpdateRentalGroup()

  const { handleSubmit } = useFormHook

  const onSubmit: SubmitHandler<SchemaUpdateRentalGroup> = data => {
    if (!rentalGroup) return

    mutate({ id: rentalGroup.id, ...data })
  }

  return (
    <form className='flex gap-4 max-sm:flex-col' onSubmit={handleSubmit(onSubmit)}>
      <CustomInput
        useFormHook={useFormHook}
        name='name'
        isLoading={queryIsPending}
        registerOptions={{
          onBlur() {
            useFormHook.clearErrors()
          },
        }}
      />
      <HookFormButton className='shrink-0' useFormHook={useFormHook} isPending={isPending}>
        Renombrar
      </HookFormButton>
    </form>
  )
}
