'use client'

import { useLogout } from '@/controllers/AuthController/logout/useLogout'
import { Button } from '@nextui-org/react'

export function Logout() {
  const { mutate, isPending } = useLogout()

  return (
    <Button
      variant='light'
      fullWidth
      radius='none'
      className='justify-start'
      onPress={() => mutate()}
      isLoading={isPending}
    >
      Cerrar sesión
    </Button>
  )
}
