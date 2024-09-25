'use client'

import { HookFormButton } from '@/components/ReactForm/HookFormButton'
import { useReactHookForm } from '@/components/ReactForm/useReactHookForm copy'
import { CustomInput } from '@/components/ReactForm/withHookForm'
import { useGetRentalGroupById } from '@/controllers/RentalGroupController/getRentalGroupById/useGetRentalGroupById'
import {
  SchemaUpdateRentalGroup,
  schemaUpdateRentalGroup,
} from '@/controllers/RentalGroupController/updateRentalGroup/updateRentalGroup.schema'
import { useUpdateRentalGroup } from '@/controllers/RentalGroupController/updateRentalGroup/useUpdateRentalGroup'
import { handleToast } from '@/utilities/handleToast'
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
  const { data: rentalGroup, isLoading, isValidating } = useGetRentalGroupById()

  // HOOKS
  const useFormHook = useReactHookForm({
    schema: schemaUpdateRentalGroup,
    defaultValues: rentalGroup,
    mode: 'onChange',
    defaultValuesDependency: isValidating,
  })

  const { trigger } = useUpdateRentalGroup()

  const { handleSubmit } = useFormHook

  const onSubmit: SubmitHandler<SchemaUpdateRentalGroup> = async data => {
    const res = await trigger({ id: rentalGroup.id, ...data })

    handleToast({ res })
  }

  return (
    <form className='flex gap-4 max-sm:flex-col' onSubmit={handleSubmit(onSubmit)}>
      <CustomInput
        useFormHook={useFormHook}
        name='name'
        isLoading={isLoading}
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
  )
}
