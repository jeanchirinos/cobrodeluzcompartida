'use client'

import { login } from '@/controllers/AuthController/login'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { handleResponse } from '@/utilities/handleResponse'
import { schemaLogin } from '@/controllers/AuthController/login/schema'
import { Input } from '@/components/Input'
import { Button } from '@nextui-org/react'

type FormInputsLogin = z.infer<typeof schemaLogin>

export function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<FormInputsLogin>({
    resolver: zodResolver(schemaLogin),
  })

  const onSubmit: SubmitHandler<FormInputsLogin> = async data => {
    const res = await login(data)

    handleResponse(res)
  }

  // RENDER
  return (
    <form className='flex max-w-xs flex-col gap-y-4' onSubmit={handleSubmit(onSubmit)}>
      <Input
        type='email'
        label='Correo'
        autoFocus
        {...register('email')}
        errorMessage={errors.email?.message}
        isInvalid={errors.email}
      />

      <Input
        type='password'
        label='Contraseña'
        {...register('password')}
        errorMessage={errors.password?.message}
        isInvalid={errors.password}
      />

      <Button type='submit' isDisabled={!isValid} isLoading={isSubmitting} color='primary'>
        Ingresar
      </Button>
    </form>
  )
}
