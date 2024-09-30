'use client'

import { HookFormButton } from '@/components/ReactForm/HookFormButton'
import { useReactHookForm } from '@/components/ReactForm/useReactHookForm'
import { CustomInput } from '@/components/ReactForm/withHookForm'
import { ROUTE } from '@/constants/routes'
import { SWR_KEY_GET_SESSION } from '@/controllers/AuthController/getSession/useGetSession'
import { SchemaLogin, schemaLogin } from '@/controllers/AuthController/login/login.schema'
import { useLogin } from '@/controllers/AuthController/login/useLogin'
import { useCreateGroupAndRegisterWithSavedData } from '@/controllers/RentalGroupController/utils/useCreateRentalGroupWithSessionCookie'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { SubmitHandler } from 'react-hook-form'
import { toast } from 'sonner'

export function Login() {
  // HOOKS
  const { push } = useRouter()
  const { createGroupAndRegister } = useCreateGroupAndRegisterWithSavedData()

  const { mutateAsync } = useLogin()

  const useFormHook = useReactHookForm({ schema: schemaLogin })
  const { handleSubmit } = useFormHook

  const queryClient = useQueryClient()

  // FUNCTIONS
  const onSubmit: SubmitHandler<SchemaLogin> = async data => {
    try {
      await mutateAsync(data, {
        onSuccess: async () => {
          await queryClient.invalidateQueries({ queryKey: [SWR_KEY_GET_SESSION] })

          const wasRedirected = await createGroupAndRegister()
          if (!wasRedirected) {
            push(ROUTE.GROUPS.INDEX)
          }
        },
        onError(error, variables, context) {
          // @ts-expect-error
          toast.error(error.response.data.msg)
        },
        // onSettled(data, error, variables, context) {
        //   console.log({ data, error, variables, context })
        //   // handleToast({ res, showSuccessToast: false })
        // },
      })
    } catch (err) {}

    // handleToast({ res, showSuccessToast: false })
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
