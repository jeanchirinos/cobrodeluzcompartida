'use client'

import { ButtonLink } from '@/components/Button/ButtonLink'
import { Input } from '@/components/Input'
import { ROUTE } from '@/constants/routes'
import {
  SchemaResetPasswordForm,
  schemaResetPasswordForm,
} from '@/controllers/AuthController/resetPassword/resetPassword.schema'
import { useResetPassword } from '@/controllers/AuthController/resetPassword/useResetPassword'
import { useReactHookForm } from '@/hooks/useReactHookForm'
import { Button } from '@nextui-org/react'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { Controller, SubmitHandler } from 'react-hook-form'

export default function Page() {
  // RENDER
  return (
    <Suspense>
      <Content />
    </Suspense>
  )
}

function Content() {
  const token = useSearchParams().get('token') ?? ''

  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = useReactHookForm({
    schema: schemaResetPasswordForm,
  })

  const { mutate, isSuccess, isPending } = useResetPassword()

  const onSubmit: SubmitHandler<SchemaResetPasswordForm> = async data => {
    mutate({ ...data, token })
  }

  // RENDER
  return (
    <main className='grow pb-[3.75rem] flex-center'>
      {isSuccess ? (
        <div className='flex flex-col items-center gap-y-6 text-center'>
          <section className='space-y-1.5'>
            <p className='text-lg font-bold'>Contraseña restablecida</p>
            <p className='text-foreground-600'>Ya puedes iniciar sesión con tu nueva contraseña</p>
          </section>

          <ButtonLink color='primary' replace href={ROUTE.HOME}>
            Ir a inicio
          </ButtonLink>
        </div>
      ) : (
        <div className='flex w-96 max-w-full flex-col gap-y-4'>
          <h2 className='font-bold'>Restablecer contraseña</h2>
          <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-4'>
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

            <Button type='submit' isLoading={isPending} color='primary' isDisabled={!isValid}>
              Restablecer
            </Button>
          </form>
        </div>
      )}
    </main>
  )
}
