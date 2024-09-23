'use server'

import { API_ROUTE } from '@/constants/api-routes'
import { sendDataAxios } from '@/utilities/request/sendData/sendDataAxios'

export async function logout() {
  return await sendDataAxios({
    url: API_ROUTE.AUTH.LOGOUT,
  })
}
