import { API_ROUTE } from '@/constants/api-routes'
import { User } from '@/models/User'
import { getData } from '@/utilities/request/getData/getData'

export type ResponseGetSession = {
  auth: true
} & Pick<User, 'email' | 'image_url' | 'fullname'>

export async function getSession() {
  return await getData<ResponseGetSession>({ url: API_ROUTE.AUTH.SESSION })
}
