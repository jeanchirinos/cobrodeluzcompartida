'use server'

import { sendData } from '@/utilities/actionRequest'
import { z } from 'zod'
import { createAuthToken } from '../utils/createAuthToken'
import { createGroupWithSessionCookie } from '../../RentalGroupController/utils/createRentalGroupWithSessionCookie'
import { API_ROUTE } from '@/constants/api-routes'
import { schemaLogin } from './login.schema'

type ArgsLoginFn = z.infer<typeof schemaLogin>

type BodyLogin = z.infer<typeof schemaLogin>
type ResponseLogin = { token: string }

export async function login(args: ArgsLoginFn) {
  async function onSuccess(data: ResponseLogin) {
    await createAuthToken(data.token)
    await createGroupWithSessionCookie()
  }

  return sendData<BodyLogin, ResponseLogin>({
    url: API_ROUTE.AUTH.LOGIN,
    schema: schemaLogin,
    body: args,
    onSuccess,
    auth: false,
  })
}
