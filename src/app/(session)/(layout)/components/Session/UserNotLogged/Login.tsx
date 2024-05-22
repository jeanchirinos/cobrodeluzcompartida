'use client'

import { Input } from '@/components/Input'
import { SubmitButton } from '@/components/SubmitButton'
import { login } from '@/controllers/AuthController/login'
import { useFormAction } from '@/hooks/useFormAction'

export function Login() {
  const { formAction } = useFormAction(login, { showSuccessToast: false })

  // RENDER
  return (
    <form className='flex max-w-xs flex-col gap-y-4' action={formAction}>
      <Input type='email' name='email' label='Correo' autoFocus />
      <Input type='password' name='password' label='Contraseña' minLength={8} />
      <SubmitButton>Ingresar</SubmitButton>
    </form>
  )
}
