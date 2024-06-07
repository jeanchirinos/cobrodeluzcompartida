'use client'

import { updateRentalGroup } from '@/controllers/RentalGroupController/updateRentalGroup/updateRentalGroup'
import { schemaUpdateRentalGroup } from '@/controllers/RentalGroupController/updateRentalGroup/schema'
import { CustomInput } from '@/components/ReactForm/withHookForm'
import { HookFormButton } from '@/components/ReactForm/HookFormButton'
import { useReactHookForm } from '@/components/ReactForm/useReactHookForm'
import { useRentalGroupContext } from '../../../context/RentalGroupContext'

export function UpdateGroup() {
  // CONTEXT
  const { rentalGroup } = useRentalGroupContext()

  // HOOKS
  const { useFormHook, onSubmit } = useReactHookForm({
    schema: schemaUpdateRentalGroup.refine(data => data.name.trim() !== rentalGroup.name),
    defaultValues: {
      name: rentalGroup.name,
    },
    mode: 'onChange',
    action: data => updateRentalGroup({ body: data, id: rentalGroup.id }),
    actionProps: {
      showSuccessToast: true,
    },
  })

  const { register, clearErrors } = useFormHook

  // RENDER
  return (
    <div className='flex flex-col gap-y-6'>
      <div>
        <h3 className='text-lg font-bold'>Nombre de grupo</h3>
        <p>Identificador único entre tus grupos de consumo</p>
      </div>
      <form className='flex gap-4 max-sm:flex-col' onSubmit={onSubmit}>
        <CustomInput
          useFormHook={useFormHook}
          register={register('name', {
            setValueAs: (value: string) => value.trimStart(),
            onBlur() {
              clearErrors()
            },
          })}
        />
        <HookFormButton useFormHook={useFormHook}>Renombrar</HookFormButton>
      </form>
    </div>
  )
}
