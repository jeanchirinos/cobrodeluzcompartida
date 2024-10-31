'use client'

import { useReactHookForm } from '@/hooks/useReactHookForm'
import { ROUTE } from '@/constants/routes'
import { SSTORAGE_TEMPORAL_FORM_DATA } from '@/constants/session-storage'
import { SchemaLogin, schemaLogin } from '@/controllers/AuthController/login/login.schema'
import { useLogin } from '@/controllers/AuthController/login/useLogin'
import { useCreateRentalGroupWithRegister } from '@/controllers/RentalGroupRegisterController/createRentalGroupWithRegister/useCreateRentalGroupWithRegister'
import { Button, Input } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { Controller, SubmitHandler } from 'react-hook-form'
import { toast } from 'sonner'
import { AxiosError } from 'axios'

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
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message)
      }

      toast.error('Error al iniciar sesión, intente nuevamente')
    }

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
        render={({ field, fieldState }) => (
          <Input
            type='email'
            label='Correo'
            autoFocus
            placeholder='example@gmail.com'
            {...field}
            value={field.value ?? ''}
            errorMessage={fieldState.error?.message}
            isInvalid={fieldState.invalid}
            labelPlacement='outside'
          />
        )}
      />

      <Controller
        name='password'
        control={control}
        render={({ field, fieldState }) => (
          <Input
            type='password'
            label='Contraseña'
            {...field}
            value={field.value ?? ''}
            errorMessage={fieldState.error?.message}
            isInvalid={fieldState.invalid}
            labelPlacement='outside'
            placeholder=' '
          />
        )}
      />

      <Button type='submit' isLoading={isPending} isDisabled={!isValid} color='primary'>
        Ingresar
      </Button>
    </form>
  )
}
