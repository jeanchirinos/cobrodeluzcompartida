'use client'

import { ButtonFormSubmit } from '@/components/Button/ButtonFormSubmit'
import { login } from '@/controllers/AuthController/login'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { handleResponse } from '@/utilities/handleResponse'
import { schemaLogin } from '@/controllers/AuthController/login/schema'
import { Input } from '@/components/Input'
// import { Button } from '@nextui-org/react'
// import { waitFor } from '@/utilities/utilities'
// import { useState } from 'react'

type FormInputsLogin = z.infer<typeof schemaLogin>

export function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputsLogin>({
    resolver: zodResolver(schemaLogin),
  })

  // const [isPending, setIsPending] = useState(false)

  const onSubmit: SubmitHandler<FormInputsLogin> = async data => {
    // setIsPending(true)

    const res = await login(data)
    // await waitFor(3)

    handleResponse(res)
    // setIsPending(false)
  }

  // RENDER
  return (
    // <form className='flex max-w-xs flex-col gap-y-4' onSubmit={handleSubmit(onSubmit)}>
    //@ts-ignore
    <form className='flex max-w-xs flex-col gap-y-4' action={handleSubmit(onSubmit)}>
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

      <ButtonFormSubmit>Ingresar</ButtonFormSubmit>
      {/* <Button type='submit' isLoading={isPending} color='primary' onPress={}>
        Guardar
      </Button> */}
    </form>
  )
}
