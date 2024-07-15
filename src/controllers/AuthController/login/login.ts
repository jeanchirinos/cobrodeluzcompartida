'use server'

import { z } from 'zod'
import { createAuthToken } from '../utils/createAuthToken'
import { createGroupWithSessionCookie } from '../../RentalGroupController/utils/createRentalGroupWithSessionCookie'
import { API_ROUTE } from '@/constants/api-routes'
import { schemaLogin } from './login.schema'
import { sendData } from '@/utilities/request/sendData/sendData'
import { User } from '@/models/User'
import { redirect } from 'next/navigation'
import { ROUTE } from '@/constants/routes'

type ArgsLoginFn = z.infer<typeof schemaLogin>

type ResponseLogin = Pick<User, 'token'>

export async function login(args: ArgsLoginFn) {
  async function onSuccess(data: ResponseLogin) {
    await createAuthToken({ token: data.token })
    await createGroupWithSessionCookie()

    // redirect(ROUTE.GROUPS.INDEX)
  }

  return await sendData<typeof schemaLogin, ResponseLogin>({
    url: API_ROUTE.AUTH.LOGIN,
    config: {
      body: args,
    },
    options: {
      schema: schemaLogin,
      onSuccess,
    },
    authMode: 'auth-not-required',
  })
}
