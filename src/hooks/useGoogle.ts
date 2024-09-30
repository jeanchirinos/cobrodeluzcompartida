'use client'

import { API_ROUTE } from '@/constants/api-routes'
import { COOKIES_TOKEN_NAME } from '@/constants/cookies'
import { ROUTE } from '@/constants/routes'
import { SWR_KEY_GET_SESSION } from '@/controllers/AuthController/getSession/useGetSession'
// import { createAuthToken } from '@/controllers/AuthController/utils/createAuthToken'
import { useCreateGroupAndRegisterWithSavedData } from '@/controllers/RentalGroupController/utils/useCreateRentalGroupWithSessionCookie'
import { User } from '@/models/User'
import { getApiUrl } from '@/utilities/request/env-variables/get'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { setCookie } from 'typescript-cookie'

export function useGoogle() {
  // const { mutate } = useSWRConfig()
  // const { resetQueries } = useQueryClient()
  const { invalidateQueries } = useQueryClient()

  const { push } = useRouter()

  const { createGroupAndRegister } = useCreateGroupAndRegisterWithSavedData()

  // EFFECT
  useEffect(() => {
    async function handleMessageFromAuthPage(e: MessageEvent<Pick<User, 'token'>>) {
      if (!e.data.token) return

      // await createAuthToken({ token: e.data.token })

      setCookie(COOKIES_TOKEN_NAME, e.data.token)

      await invalidateQueries({ queryKey: [SWR_KEY_GET_SESSION] })
      // await resetQueries({ queryKey: [SWR_KEY_GET_SESSION] })

      // const wasRedirected = await createGroupAndRegister()

      // if (!wasRedirected) {
      //   push(ROUTE.GROUPS.INDEX)
      // }

      console.log('wasRedirected')
      push(ROUTE.GROUPS.INDEX)

      // openedWindow.current?.close()
    }

    window.addEventListener('message', handleMessageFromAuthPage)

    return () => window.removeEventListener('message', handleMessageFromAuthPage)
  }, [invalidateQueries, push, createGroupAndRegister])

  // FUNCTIONS
  function openGoogleWindow() {
    function popupWindow(args: { url: URL; width: number; height: number }) {
      const { url, width, height } = args

      if (!window.top) return

      const { screenX, screenY, outerWidth, outerHeight } = window.top

      const x = outerWidth / 2 + screenX - width / 2
      const y = outerHeight / 2 + screenY - height / 2

      openedWindow.current = window.open(url, '_blank', `width=${width}, height=${height}, top=${y}, left=${x}`)
    }

    popupWindow({
      url: getApiUrl(API_ROUTE.AUTH.GOOGLE_REDIRECT),
      width: 450,
      height: 550,
    })
  }

  // VALUES
  const openedWindow = useRef<null | Window>(null)

  // RETURN
  return { openGoogleWindow }
}
