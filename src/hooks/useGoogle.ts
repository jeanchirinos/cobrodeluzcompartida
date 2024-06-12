'use client'

import { useEffect, useRef } from 'react'
import { API_ROUTE } from '@/constants/api-routes'
import { udpdateGoogleSession } from '@/controllers/AuthController/udpdateGoogleSession'
import { getApiUrl } from '@/utilities/request'

export function useGoogle() {
  // EFFECT
  useEffect(() => {
    async function handleMessageFromAuthPage(e: MessageEvent<{ token: string }>) {
      await udpdateGoogleSession(e.data.token)
      openedWindow.current?.close()
    }

    window.addEventListener('message', handleMessageFromAuthPage)

    return () => window.removeEventListener('message', handleMessageFromAuthPage)
  }, [])

  // FUNCTIONS
  function openGoogleWindow() {
    function popupWindow(args: { url: URL; width: number; height: number }) {
      const { url, width, height } = args

      if (!window.top) return

      const { screenX, screenY, outerWidth, outerHeight } = window.top

      const x = outerWidth / 2 + screenX - width / 2
      const y = outerHeight / 2 + screenY - height / 2

      openedWindow.current = window.open(
        url,
        '_blank',
        `width=${width}, height=${height}, top=${y}, left=${x}`,
      )
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
