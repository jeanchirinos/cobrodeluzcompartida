'use server'

import { API_ROUTE } from '@/constants/api-routes'
import { User } from '@/models/User'
import { getData } from '@/utilities/request/getData/getData'

export type ResponseGetSession = {
  auth: true
} & Pick<User, 'email' | 'image_url' | 'fullname'>

export async function getSession() {
  const data = await getData<ResponseGetSession>({
    url: API_ROUTE.AUTH.SESSION,
    authMode: 'auth-no-auth',
    mode: 'null',
  })

  return data
}
