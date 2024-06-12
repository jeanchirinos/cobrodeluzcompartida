'use server'

import { API_ROUTE } from '@/constants/api-routes'
import { newGetData } from '@/utilities/getData/getData'

export type ResponseGetSession = {
  auth: true
  image_url: string
  fullname: string
  email: string
}

export async function getSession() {
  const data = await newGetData<ResponseGetSession>({
    url: API_ROUTE.AUTH.SESSION,
    authMode: 'auth-no-auth',
    mode: 'null',
  })

  return data
}
