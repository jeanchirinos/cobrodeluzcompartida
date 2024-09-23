'use client'

import { COOKIES_TOKEN_NAME } from '@/constants/cookies'
import { ROUTE } from '@/constants/routes'
import { useLogout } from '@/controllers/AuthController/logout/useLogout'
import { handleToast } from '@/utilities/handleToast'
import { Button } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { useSWRConfig } from 'swr'
import { removeCookie } from 'typescript-cookie'

export function Logout() {
  const { mutate } = useSWRConfig()
  const { replace } = useRouter()

  const { trigger, isMutating } = useLogout()

  async function handlePress() {
    const res = await trigger(undefined, {
      onSuccess: async () => {
        removeCookie(COOKIES_TOKEN_NAME)

        await mutate(
          key => true, // which cache keys are updated
          undefined, // update cache data to `undefined`
          { revalidate: false }, // do not revalidate
        )

        replace(ROUTE.HOME)
      },
    })

    handleToast({ res, showSuccessToast: false })
  }

  return (
    <Button
      variant='light'
      fullWidth
      radius='none'
      className='justify-start'
      onPress={handlePress}
      isLoading={isMutating}
    >
      Cerrar sesión
    </Button>
  )
}
