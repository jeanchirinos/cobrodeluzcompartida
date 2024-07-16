'use client'

import { ButtonAction } from '@/components/Button/ButtonAction'
import { COOKIES_TOKEN_NAME } from '@/constants/cookies'
import { ROUTE } from '@/constants/routes'
import { logout } from '@/controllers/AuthController/logout'
import { useRouter } from 'next/navigation'
import { useSWRConfig } from 'swr'
import { removeCookie } from 'typescript-cookie'

export function Logout() {
  const { mutate } = useSWRConfig()
  const { replace, refresh } = useRouter()

  async function onSuccess() {
    await mutate(
      key => true, // which cache keys are updated
      undefined, // update cache data to `undefined`
      { revalidate: false }, // do not revalidate
    )

    removeCookie(COOKIES_TOKEN_NAME)
    replace(ROUTE.HOME)

    setTimeout(() => {
      refresh()
    }, 0)
  }

  return (
    <ButtonAction
      action={logout}
      variant='light'
      fullWidth
      radius='none'
      className='justify-start'
      actionProps={{
        onSuccess,
        showSuccessToast: false,
      }}
    >
      Cerrar sesión
    </ButtonAction>
  )
}
