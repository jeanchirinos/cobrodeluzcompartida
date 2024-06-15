'use server'

import { z } from 'zod'
import { createAuthToken } from '../utils/createAuthToken'
import { createGroupWithSessionCookie } from '../../RentalGroupController/utils/createRentalGroupWithSessionCookie'
import { API_ROUTE } from '@/constants/api-routes'
import { schemaLogin } from './login.schema'
import { newSendData } from '@/utilities/request/sendData/sendData'

type ArgsLoginFn = z.infer<typeof schemaLogin>

type ResponseLogin = { token: string }

export async function login(args: ArgsLoginFn) {
  async function onSuccess(data: ResponseLogin) {
    await createAuthToken(data.token)
    await createGroupWithSessionCookie()
  }

  return newSendData<ResponseLogin>({
    url: API_ROUTE.AUTH.LOGIN,
    config: {
      body: args,
    },
    options: {
      schema: schemaLogin,
      onSuccess,
    },
    authMode: 'auth-no-auth',
  })
}
