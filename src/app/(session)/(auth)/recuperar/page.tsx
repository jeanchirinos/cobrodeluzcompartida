'use client'
import { ButtonBack } from '@/components/Button/ButtonBack'
import { ButtonLink } from '@/components/Button/ButtonLink'
import { Input } from '@/components/Input'
import { ROUTE } from '@/constants/routes'
import {
  schemaRecoverPassword,
  SchemaRecoverPassword,
} from '@/controllers/AuthController/recoverPassword/recoverPassword.schema'
import { useRecoverPassword } from '@/controllers/AuthController/recoverPassword/useRecoverPassword'
import { useReactHookForm } from '@/hooks/useReactHookForm'
import { Button } from '@heroui/react'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { Controller, SubmitHandler } from 'react-hook-form'

export default function Page() {
  return (
    <Suspense>
      <Content />
    </Suspense>
  )
}

function Content() {
  const initialEmail = useSearchParams().get('email')

  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = useReactHookForm({
    schema: schemaRecoverPassword,
    values: {
      email: initialEmail ?? '',
    },
    mode: 'onSubmit',
  })

  const { mutate, isSuccess, isPending } = useRecoverPassword()

  const onSubmit: SubmitHandler<SchemaRecoverPassword> = async data => {
    mutate(data)
  }

  // RENDER
  return (
    <main className='grow pb-[3.75rem] flex-center'>
      {isSuccess ? (
        <div className='flex flex-col items-center gap-y-6 text-center'>
          <section className='space-y-1.5'>
            <p className='text-lg font-bold'>Correo enviado</p>
            <p className='text-foreground-600'>Revisa tu correo para restablecer tu contraseña</p>
          </section>

          <ButtonLink href={ROUTE.HOME} color='primary'>
            Ir al inicio
          </ButtonLink>
        </div>
      ) : (
        <div className='flex w-96 max-w-full flex-col'>
          <section className='mb-5 flex items-center gap-x-2'>
            <ButtonBack href={ROUTE.HOME} />
            <h2 className='font-bold'>Recuperar contraseña</h2>
          </section>
          <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-4'>
            <Controller
              name='email'
              control={control}
              render={({ field }) => (
                <Input
                  type='email'
                  label='Ingresa el correo de la contraseña a recuperar'
                  autoFocus
                  placeholder='example@gmail.com'
                  {...field}
                  value={field.value ?? ''}
                />
              )}
            />

            <Button type='submit' isLoading={isPending} color='primary' isDisabled={!isValid}>
              Enviar correo
            </Button>
          </form>
        </div>
      )}
    </main>
  )
}
