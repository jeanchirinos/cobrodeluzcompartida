import { API_ROUTE } from '@/constants/api-routes'
import { User } from '@/models/User'
import { getDataAxios } from '@/utilities/request/getData/getDataAxios'

export type ResponseGetSession = {
  auth: true
} & Pick<User, 'email' | 'image_url' | 'fullname'>

export async function getSession() {
  return await getDataAxios<ResponseGetSession | null>({ url: API_ROUTE.AUTH.SESSION })
}
