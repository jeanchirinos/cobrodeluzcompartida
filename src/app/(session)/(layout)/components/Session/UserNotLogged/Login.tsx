'use client'

import { CustomInput } from '@/components/ReactForm/withHookForm'
import { HookFormButton } from '@/components/ReactForm/HookFormButton'
import { useReactHookForm } from '@/components/ReactForm/useReactHookForm'
import { schemaLogin } from '@/controllers/AuthController/login/login.schema'
import { login } from '@/controllers/AuthController/login/login'

export function Login() {
  const { useFormHook } = useReactHookForm({
    schema: schemaLogin,
    action: login,
    actionProps: {
      showSuccessToast: false,
    },
  })

  // RENDER
  return (
    <form className='flex max-w-xs flex-col gap-y-4' onSubmit={useFormHook.onSubmit}>
      <CustomInput
        useFormHook={useFormHook}
        name='email'
        type='email'
        label='Correo'
        autoFocus
        placeholder='example@gmail.com'
      />
      <CustomInput useFormHook={useFormHook} name='password' type='password' label='Contraseña' />
      <HookFormButton useFormHook={useFormHook}>Ingresar</HookFormButton>
    </form>
  )
}
