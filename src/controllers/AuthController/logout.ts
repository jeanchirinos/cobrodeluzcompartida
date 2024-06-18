'use server'
import { API_ROUTE } from '@/constants/api-routes'
import { COOKIES_TOKEN_NAME } from '@/constants/cookies'
import { ROUTE } from '@/constants/routes'
import { newSendData } from '@/utilities/request/sendData/sendData'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function logout() {
  return newSendData({
    url: API_ROUTE.AUTH.LOGOUT,
    options: {
      onSuccess() {
        cookies().delete(COOKIES_TOKEN_NAME)
        redirect(ROUTE.HOME)
      },
    },
  })
}
