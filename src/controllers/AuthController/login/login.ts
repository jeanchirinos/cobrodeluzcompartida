'use server'

import { createAuthToken } from '../utils/createAuthToken'
import { API_ROUTE } from '@/constants/api-routes'
import { SchemaLogin, schemaLogin } from './login.schema'
import { User } from '@/models/User'
import { sendDataAxios } from '@/utilities/request/sendData/sendDataAxios'

type ResponseLogin = Pick<User, 'token'>

export async function login(args: SchemaLogin) {
  const res = await sendDataAxios<ResponseLogin>({ url: API_ROUTE.AUTH.LOGIN, data: args, schema: schemaLogin })

  if (res.ok) {
    await createAuthToken({ token: res.data.token })
  }

  return res
}
