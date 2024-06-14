'use server'
import { API_ROUTE } from '@/constants/api-routes'
import { ROUTE } from '@/routes'
import { newSendData } from '@/utilities/request/sendData/sendData'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function logout() {
  return newSendData({
    url: API_ROUTE.AUTH.LOGOUT,
    options: {
      onSuccess() {
        cookies().delete('jwt')
        redirect(ROUTE.HOME)
      },
    },
  })
}
