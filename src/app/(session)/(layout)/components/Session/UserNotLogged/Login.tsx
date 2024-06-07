'use client'

import { login } from '@/controllers/AuthController/login'
import { schemaLogin } from '@/controllers/AuthController/login/schema'
import { CustomInput } from '@/components/ReactForm/withHookForm'
import { HookFormButton } from '@/components/ReactForm/HookFormButton'
import { useReactHookForm } from '@/components/ReactForm/useReactHookForm'

export function Login() {
  const { useFormHook, onSubmit } = useReactHookForm({
    schema: schemaLogin,
    action: login,
  })

  const { register } = useFormHook

  // RENDER
  return (
    <form className='flex max-w-xs flex-col gap-y-4' onSubmit={onSubmit}>
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
    </form>
  )
}
