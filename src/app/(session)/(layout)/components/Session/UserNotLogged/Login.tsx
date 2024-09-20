'use client'

import { HookFormButton } from '@/components/ReactForm/HookFormButton'
import { CustomInput } from '@/components/ReactForm/withHookForm'
import { ROUTE } from '@/constants/routes'
import { ArgsLoginFn, schemaLogin } from '@/controllers/AuthController/login/login.schema'
import { useLogin } from '@/controllers/AuthController/login/useLogin'
import { useCreateGroupWithSessionCookie } from '@/controllers/RentalGroupController/utils/useCreateRentalGroupWithSessionCookie'
import { handleToast } from '@/utilities/handleToast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'

export function Login() {
  // HOOKS
  const { push } = useRouter()
  const { execute } = useCreateGroupWithSessionCookie()

  const { trigger } = useLogin()

  const useFormHook = useForm<ArgsLoginFn>({
    mode: 'onTouched',
    resolver: zodResolver(schemaLogin),
  })

  const { handleSubmit } = useFormHook

  // FUNCTIONS
  const onSubmit: SubmitHandler<ArgsLoginFn> = async data => {
    const res = await trigger(data, {
      onSuccess: async () => {
        const wasRedirected = await execute()
        if (!wasRedirected) {
          push(ROUTE.GROUPS.INDEX)
        }
      },
    })

    handleToast({ res, showSuccessToast: false })
  }

  // RENDER
  return (
    <form className='flex max-w-xs flex-col gap-y-4' onSubmit={handleSubmit(onSubmit)}>
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
