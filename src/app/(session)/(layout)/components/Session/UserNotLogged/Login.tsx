'use client'

import { Input } from '@/components/Input'
import { ButtonFormSubmit } from '@/components/Button/ButtonFormSubmit'
import { login } from '@/controllers/AuthController/login'
import { useFormAction } from '@/hooks/useFormAction'
import { Form } from '@/components/Form'

export function Login() {
  const { formAction } = useFormAction(login, { showSuccessToast: false })

  // RENDER
  return (
    // <Form className='flex max-w-xs flex-col gap-y-4' action={() => login()}>
    <Form className='flex max-w-xs flex-col gap-y-4' action={formAction}>
      <Input type='email' name='email' label='Correo' autoFocus />
      <Input type='password' name='password' label='Contraseña' minLength={8} />
      <ButtonFormSubmit>Ingresar</ButtonFormSubmit>
    </Form>
  )
}
