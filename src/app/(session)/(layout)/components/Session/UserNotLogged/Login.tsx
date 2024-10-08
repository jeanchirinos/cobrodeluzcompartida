'use client'

import { useReactHookForm } from '@/components/ReactForm/useReactHookForm'
import { ROUTE } from '@/constants/routes'
import { SSTORAGE_TEMPORAL_FORM_DATA } from '@/constants/session-storage'
import { SchemaLogin, schemaLogin } from '@/controllers/AuthController/login/login.schema'
import { useLogin } from '@/controllers/AuthController/login/useLogin'
import { useCreateRentalGroupWithRegister } from '@/controllers/RentalGroupRegisterController/createRentalGroupWithRegister/useCreateRentalGroupWithRegister'
import { Button, Input } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { Controller, SubmitHandler } from 'react-hook-form'

export function Login() {
  // HOOKS
  const { push } = useRouter()

  const { mutate: mutateCreateRentalGroupWithRegister } = useCreateRentalGroupWithRegister()
  const { mutateAsync: mutateAsyncLogin, isPending } = useLogin()

  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = useReactHookForm({ schema: schemaLogin })

  // FUNCTIONS
  const onSubmit: SubmitHandler<SchemaLogin> = async data => {
    try {
      await mutateAsyncLogin(data)
    } catch (error) {}

    const temporalFormData = sessionStorage.getItem(SSTORAGE_TEMPORAL_FORM_DATA)

    if (temporalFormData) {
      mutateCreateRentalGroupWithRegister(JSON.parse(temporalFormData))
    } else {
      push(ROUTE.GROUPS.INDEX)
    }
  }

  // RENDER
  return (
    <form className='flex max-w-xs flex-col gap-y-4' onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name='email'
        control={control}
        render={({ field, fieldState, formState }) => (
          <Input
            type='email'
            label='Correo'
            autoComplete='username'
            autoFocus
            placeholder='example@gmail.com'
            {...field}
            value={field.value ?? ''}
            errorMessage={fieldState.error?.message}
            isInvalid={fieldState.invalid}
            isDisabled={formState.isSubmitting}
            labelPlacement='outside'
          />
        )}
      />

      <Controller
        name='password'
        control={control}
        render={({ field, fieldState, formState }) => (
          <Input
            type='password'
            label='Contraseña'
            autoComplete='current-password'
            {...field}
            value={field.value ?? ''}
            errorMessage={fieldState.error?.message}
            isInvalid={fieldState.invalid}
            isDisabled={formState.isSubmitting}
            labelPlacement='outside'
          />
        )}
      />

      <Button type='submit' isLoading={isPending} isDisabled={!isValid} color='primary'>
        Ingresar
      </Button>
    </form>
  )
}
