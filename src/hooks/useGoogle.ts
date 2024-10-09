'use client'

import { API_ROUTE } from '@/constants/api-routes'
import { ROUTE } from '@/constants/routes'
import { SSTORAGE_TEMPORAL_FORM_DATA } from '@/constants/session-storage'
import { QUERY_KEY_GET_SESSION } from '@/controllers/AuthController/getSession/useGetSession'
import { createAuthToken } from '@/controllers/AuthController/utils/createAuthToken'
import { useCreateRentalGroupWithRegister } from '@/controllers/RentalGroupRegisterController/createRentalGroupWithRegister/useCreateRentalGroupWithRegister'
import { User } from '@/models/User'
import { getApiUrl } from '@/utilities/utilities'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'

export function useGoogle() {
  const queryClient = useQueryClient()

  const { push } = useRouter()

  const { mutate: mutateCreateRentalGroupWithRegister } = useCreateRentalGroupWithRegister()

  // EFFECT
  useEffect(() => {
    async function handleMessageFromAuthPage(e: MessageEvent<Pick<User, 'token'>>) {
      const { token } = e.data

      if (!token) return

      await createAuthToken({ token })

      void queryClient.invalidateQueries({ queryKey: [QUERY_KEY_GET_SESSION] })

      const temporalFormData = sessionStorage.getItem(SSTORAGE_TEMPORAL_FORM_DATA)

      if (temporalFormData) {
        mutateCreateRentalGroupWithRegister(JSON.parse(temporalFormData))
      } else {
        push(ROUTE.GROUPS.INDEX)
      }

      openedWindow.current?.close()
    }

    window.addEventListener('message', handleMessageFromAuthPage)

    return () => window.removeEventListener('message', handleMessageFromAuthPage)
  }, [queryClient, push, mutateCreateRentalGroupWithRegister])

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
