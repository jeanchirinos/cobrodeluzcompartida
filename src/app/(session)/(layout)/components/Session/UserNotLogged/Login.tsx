'use client'

import { type SubmitHandler } from 'react-hook-form'
import { login } from '@/controllers/AuthController/login'
import { schemaLogin } from '@/controllers/AuthController/login/schema'
import { Form } from '@/components/Form'
import { CustomInput } from '@/components/ReactForm/withHookForm'
import { HookFormButton } from '@/components/ReactForm/HookFormButton'
import { useReactHookForm } from '@/components/ReactForm/useReactHookForm'
import { handleResponse } from '@/utilities/handleResponse'

export function Login() {
  const { useFormHook } = useReactHookForm({ schema: schemaLogin })
  const { register } = useFormHook

  const onSubmit: SubmitHandler<typeof schemaLogin._type> = async data => {
    const res = await login(data)

    handleResponse(res)
  }

  // RENDER
  return (
    <Form className='flex max-w-xs flex-col gap-y-4' onSubmit={onSubmit} useFormHook={useFormHook}>
      <CustomInput
        register={register('email')}
        useFormHook={useFormHook}
        type='email'
        label='Correo'
        autoFocus
        placeholder='example@gmail.com'
      />
      <CustomInput
        register={register('password')}
        useFormHook={useFormHook}
        type='password'
        label='Contraseña'
      />
      <HookFormButton useFormHook={useFormHook}>Ingresar</HookFormButton>
    </Form>
  )
}
