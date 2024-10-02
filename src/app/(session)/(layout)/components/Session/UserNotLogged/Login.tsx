'use client'

import { HookFormButton } from '@/components/ReactForm/HookFormButton'
import { useReactHookForm } from '@/components/ReactForm/useReactHookForm'
import { CustomInput } from '@/components/ReactForm/withHookForm'
import { ROUTE } from '@/constants/routes'
import { SchemaLogin, schemaLogin } from '@/controllers/AuthController/login/login.schema'
import { useLogin } from '@/controllers/AuthController/login/useLogin'
import { useCreateGroupAndRegisterWithSavedData } from '@/controllers/RentalGroupController/utils/useCreateRentalGroupWithSessionCookie'
import { useRouter } from 'next/navigation'
import { SubmitHandler } from 'react-hook-form'

export function Login() {
  // HOOKS
  const { push } = useRouter()
  const { createGroupAndRegister } = useCreateGroupAndRegisterWithSavedData()

  const { mutate, isPending } = useLogin()

  const useFormHook = useReactHookForm({ schema: schemaLogin })
  const { handleSubmit } = useFormHook

  // FUNCTIONS
  const onSubmit: SubmitHandler<SchemaLogin> = async data => {
    mutate(data, {
      onSuccess: async () => {
        const wasRedirected = await createGroupAndRegister()
        if (!wasRedirected) {
          push(ROUTE.GROUPS.INDEX)
        }
      },
    })
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
      <HookFormButton useFormHook={useFormHook} isPending={isPending}>
        Ingresar
      </HookFormButton>
    </form>
  )
}
