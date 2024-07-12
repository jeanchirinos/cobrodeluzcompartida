'use server'

import { API_ROUTE } from '@/constants/api-routes'
import { sendData } from '@/utilities/request/sendData/sendData'

export async function logout() {
  return await sendData({
    url: API_ROUTE.AUTH.LOGOUT,
  })
}
