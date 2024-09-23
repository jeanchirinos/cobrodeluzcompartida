'use server'

import { API_ROUTE } from '@/constants/api-routes'
import { User } from '@/models/User'
import { sendDataAxios } from '@/utilities/request/sendData/sendDataAxios'
import { createAuthToken } from '../utils/createAuthToken'
import { SchemaLogin, schemaLogin } from './login.schema'

type ResponseLogin = Pick<User, 'token'>

export async function login(args: SchemaLogin) {
  const res = await sendDataAxios<ResponseLogin, typeof schemaLogin>({
    url: API_ROUTE.AUTH.LOGIN,
    schema: schemaLogin,
    data: args,
  })

  if (res.ok) {
    await createAuthToken({ token: res.data.token })
  }

  return res
}
