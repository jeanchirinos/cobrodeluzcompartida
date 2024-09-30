'use client'

import { useLogout } from '@/controllers/AuthController/logout/useLogout'
import { handleToast } from '@/utilities/handleToast'
import { Button } from '@nextui-org/react'

export function Logout() {
  const { mutateAsync, isPending } = useLogout()

  async function handlePress() {
    // const res = await mutateAsync()
    await mutateAsync()

    // handleToast({ res, showSuccessToast: false })
  }

  return (
    <Button
      variant='light'
      fullWidth
      radius='none'
      className='justify-start'
      onPress={handlePress}
      isLoading={isPending}
    >
      Cerrar sesión
    </Button>
  )
}
