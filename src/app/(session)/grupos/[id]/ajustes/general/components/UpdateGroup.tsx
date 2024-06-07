'use client'

import { type SubmitHandler } from 'react-hook-form'
import { updateRentalGroup } from '@/controllers/RentalGroupController/updateRentalGroup/updateRentalGroup'
import { schemaUpdateRentalGroup } from '@/controllers/RentalGroupController/updateRentalGroup/schema'
import { Form } from '@/components/Form'
import { CustomInput } from '@/components/ReactForm/withHookForm'
import { HookFormButton } from '@/components/ReactForm/HookFormButton'
import { useReactHookForm } from '@/components/ReactForm/useReactHookForm'
import { useRentalGroupContext } from '../../../context/RentalGroupContext'
import { handleResponse } from '@/utilities/handleResponse'
// import { useRef } from 'react'

export function UpdateGroup() {
  const { rentalGroup } = useRentalGroupContext()

  // const defaultValues = {
  //   name: rentalGroup.name,
  // }

  const { useFormHook } = useReactHookForm({
    schema: schemaUpdateRentalGroup.refine(data => data.name.trim() !== rentalGroup.name, {
      // message: 'Ingresa un nombre diferente al actual',
      // path: ['name'],
    }),
    // .transform(data => ({ name: data.name.trim() }))
    defaultValues: {
      name: rentalGroup.name,
    },
    mode: 'onChange',
  })

  const {
    register,
    clearErrors,
    // setValue,
  } = useFormHook

  // const isSubmittingRef = useRef(false)

  const onSubmit: SubmitHandler<typeof schemaUpdateRentalGroup._type> = async data => {
    // isSubmittingRef.current = true
    const res = await updateRentalGroup({ body: data, id: rentalGroup.id })

    handleResponse(res, {
      showSuccessToast: true,
    })

    // isSubmittingRef.current = false
  }

  // RENDER
  return (
    <div className='flex flex-col gap-y-6'>
      <div>
        <h3 className='text-lg font-bold'>Nombre de grupo</h3>
        <p>Identificador único entre tus grupos de consumo</p>
      </div>
      <Form className='flex gap-4 max-sm:flex-col' onSubmit={onSubmit} useFormHook={useFormHook}>
        <CustomInput
          useFormHook={useFormHook}
          register={register('name', {
            setValueAs: (value: string) => value.trimStart(),
            onBlur() {
              // setTimeout(() => {
              clearErrors()
              // }, 0)
            },
          })}
        />
        <HookFormButton useFormHook={useFormHook}>Renombrar</HookFormButton>
      </Form>
    </div>
  )
}
