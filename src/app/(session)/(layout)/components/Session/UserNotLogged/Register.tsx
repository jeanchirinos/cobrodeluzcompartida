'use client'

import { Input } from '@/components/Input'
import { $BUTTON_LOGIN_ID } from '@/constants/elements'
import { SchemaRegister, schemaRegister } from '@/controllers/AuthController/register/register.schema'
import { useRegister } from '@/controllers/AuthController/register/useRegister'
import { useReactHookForm } from '@/hooks/useReactHookForm'
import { Button } from '@nextui-org/button'
import { Controller, SubmitHandler } from 'react-hook-form'

export function Register() {
  const {
    handleSubmit,
    control,
    watch,
    formState: { isValid },
  } = useReactHookForm({ schema: schemaRegister })

  const { email } = watch()

  const { mutate, isPending, isSuccess } = useRegister()

  // FUNCTIONS
  function handleBack() {
    document.getElementById($BUTTON_LOGIN_ID)?.click()
  }

  const onSubmit: SubmitHandler<SchemaRegister> = async data => {
    mutate(data)
  }

  // RENDER
  return (
    <>
      <form className='mt-4 flex max-w-xs flex-col gap-y-4' onSubmit={handleSubmit(onSubmit)}>
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
            />
          )}
        />

        <Controller
          name='passwordConfirm'
          control={control}
          render={({ field, fieldState }) => (
            <Input
              type='password'
              label='Confirmar contraseña'
              {...field}
              value={field.value ?? ''}
              errorMessage={fieldState.error?.message}
              isInvalid={fieldState.invalid}
            />
          )}
        />

        <Button type='submit' color='secondary' isLoading={isPending} isDisabled={!isValid}>
          Registrarse
        </Button>
      </form>

      {isSuccess && (
        <div className='absolute inset-0 z-20 flex-col gap-y-4 bg-content1 text-center flex-center'>
          <div className='space-y-2'>
            <p>Se envió un correo de confirmación a :</p>
            <b>{email}</b>
          </div>
          <Button onPress={handleBack}>Cerrar</Button>
        </div>
      )}
    </>
  )
}
