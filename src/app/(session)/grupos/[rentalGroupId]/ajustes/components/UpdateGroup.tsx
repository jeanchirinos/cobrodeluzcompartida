'use client'

import { updateRentalGroup } from '@/controllers/RentalGroupController/updateRentalGroup/updateRentalGroup'
import { CustomInput } from '@/components/ReactForm/withHookForm'
import { HookFormButton } from '@/components/ReactForm/HookFormButton'
import { useReactHookForm } from '@/components/ReactForm/useReactHookForm'
import { schemaUpdateRentalGroup } from '@/controllers/RentalGroupController/updateRentalGroup/updateRentalGroup.schema'
// import { useGetRentalGroupById } from '@/controllers/RentalGroupController/getRentalGroupById/useGetRentalGroupById'
import { Suspense } from 'react'
import useSWR from 'swr'
import { getRentalGroupById } from '@/controllers/RentalGroupController/getRentalGroupById'

function UpdateNameForm() {
  // const {
  //   data: { rentalGroup },
  // } = useGetRentalGroupById()

  const fetcher = () => getRentalGroupById({ id: Number('126') })

  const {
    data: { rentalGroup },
  } = useSWR('A', fetcher, {
    suspense: true,
    fallbackData: {
      rentalGroup: {
        id: 126,
        name: 'Grupo de prueba',
      },
    },
    onSuccess(data) {
      useFormHook.reset(data.rentalGroup)
    },
  })

  // HOOKS
  const { useFormHook } = useReactHookForm({
    schema: schemaUpdateRentalGroup,
    defaultValues: rentalGroup,
    mode: 'onChange',
    submitActionFn: data => updateRentalGroup({ ...data, id: rentalGroup.id }),
  })

  return (
    <form className='flex gap-4 max-sm:flex-col' onSubmit={useFormHook.onSubmit}>
      <CustomInput
        useFormHook={useFormHook}
        name='name'
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

export function UpdateGroup() {
  return (
    <section className='flex w-fit flex-col gap-y-6'>
      <div>
        <h3 className='text-lg font-bold'>Nombre de grupo</h3>
        <p>Identificador único entre tus grupos de consumo</p>
      </div>
      <Suspense fallback={<h1>Hola</h1>}>
        <UpdateNameForm />
      </Suspense>
    </section>
  )
}
