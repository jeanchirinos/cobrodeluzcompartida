'use client'

import { updateRentalGroup } from '@/controllers/RentalGroupController/updateRentalGroup/updateRentalGroup'

import { CustomInput } from '@/components/ReactForm/withHookForm'
import { HookFormButton } from '@/components/ReactForm/HookFormButton'
import { useReactHookForm } from '@/components/ReactForm/useReactHookForm'
import { useRentalGroupContext } from '../../../context/RentalGroupContext'
import { schemaUpdateRentalGroupWithRefine } from '@/controllers/RentalGroupController/updateRentalGroup/updateRentalGroup.schema'

export function UpdateGroup() {
  // CONTEXT
  const { rentalGroup } = useRentalGroupContext()

  // HOOKS
  const { useFormHook, onSubmit } = useReactHookForm({
    schema: schemaUpdateRentalGroupWithRefine({ currentGroupName: rentalGroup.name }),
    defaultValues: {
      name: rentalGroup.name,
    },
    mode: 'onChange',
    action: data => updateRentalGroup({ body: data, id: rentalGroup.id }),
  })

  // RENDER
  return (
    <section className='flex flex-col gap-y-6' key={rentalGroup.name}>
      <div>
        <h3 className='text-lg font-bold'>Nombre de grupo</h3>
        <p>Identificador único entre tus grupos de consumo</p>
      </div>
      <form className='flex gap-4 max-sm:flex-col' onSubmit={onSubmit}>
        <CustomInput
          useFormHook={useFormHook}
          name='name'
          registerOptions={{
            setValueAs: (value: string) => value.trimStart(),
            onBlur() {
              useFormHook.clearErrors()
            },
          }}
        />
        <HookFormButton useFormHook={useFormHook}>Renombrar</HookFormButton>
      </form>
    </section>
  )
}
