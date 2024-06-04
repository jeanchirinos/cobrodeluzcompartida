'use client'

import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { handleResponse } from '@/utilities/handleResponse'
import { Input } from '@/components/Input'
import { updateRentalGroup } from '@/controllers/RentalGroupController/updateRentalGroup'
import { useRentalGroupContext } from '../../../context/RentalGroupContext'
import { schemaUpdateRentalGroup } from '@/controllers/RentalGroupController/updateRentalGroup/schema'
import { Button } from '@nextui-org/react'

type FormInputsUpdateGroup = z.infer<typeof schemaUpdateRentalGroup>

export function UpdateGroup() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    reset,
  } = useForm<FormInputsUpdateGroup>({
    resolver: zodResolver(schemaUpdateRentalGroup),
  })

  const { rentalGroup } = useRentalGroupContext()

  const onSubmit: SubmitHandler<FormInputsUpdateGroup> = async data => {
    const res = await updateRentalGroup({ body: data, id: rentalGroup.id })

    handleResponse(res, {
      onSuccess() {
        reset()
      },
      showSuccessToast: true,
    })
  }

  // RENDER
  return (
    <div className='flex flex-col gap-y-6'>
      <div>
        <h3 className='text-lg font-bold'>Nombre de grupo</h3>
        <p>Identificador único entre tus grupos de consumo</p>
      </div>

      <form className='flex gap-4 max-sm:flex-col' onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register('name')}
          errorMessage={errors.name?.message}
          isInvalid={errors.name}
          placeholder={rentalGroup?.name}
        />

        <Button type='submit' isDisabled={!isValid} isLoading={isSubmitting} color='primary'>
          Guardar
        </Button>
      </form>
    </div>
  )
}
