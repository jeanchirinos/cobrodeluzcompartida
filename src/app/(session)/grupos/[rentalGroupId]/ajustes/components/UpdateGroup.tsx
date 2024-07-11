'use client'

import { updateRentalGroup } from '@/controllers/RentalGroupController/updateRentalGroup/updateRentalGroup'
import { CustomInput } from '@/components/ReactForm/withHookForm'
import { HookFormButton } from '@/components/ReactForm/HookFormButton'
import { useReactHookForm } from '@/components/ReactForm/useReactHookForm'
import { schemaUpdateRentalGroup } from '@/controllers/RentalGroupController/updateRentalGroup/updateRentalGroup.schema'
import { useGetRentalGroupById } from '@/controllers/RentalGroupController/getRentalGroupById/useGetRentalGroupById'

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
  const {
    data: { rentalGroup },
    isLoading,
    isValidating,
  } = useGetRentalGroupById()

  // HOOKS
  const { useFormHook } = useReactHookForm({
    schema: schemaUpdateRentalGroup,
    defaultValues: rentalGroup,
    mode: 'onChange',
    submitActionFn: data => updateRentalGroup({ ...data, id: rentalGroup.id }),
    defaultValuesDependency: isValidating,
  })

  return (
    <form className='flex gap-4 max-sm:flex-col' onSubmit={useFormHook.onSubmit}>
      <CustomInput
        useFormHook={useFormHook}
        name='name'
        isDisabled={isLoading}
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
