import { API_ROUTE } from '@/constants/api-routes'
import { User } from '@/models/User'
import { getData } from '@/utilities/request/getData/getData'
import { AxiosError } from 'axios'

export type ResponseGetSession = {
  auth: true
} & Pick<User, 'email' | 'image_url' | 'fullname'>

export async function getSession() {
  try {
    const data = await getData<ResponseGetSession>({ url: API_ROUTE.AUTH.SESSION })

    return data
  } catch (error) {
    if (error instanceof AxiosError && error.status === 401) {
      return null
    }

    throw error
  }
}
