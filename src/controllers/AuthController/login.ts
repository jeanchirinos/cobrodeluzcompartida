'use server'

import { sendData } from '@/utilities/actionRequest'
import { z } from 'zod'
import { createAuthToken } from './utils/createAuthToken'
import { createGroupWithSessionCookie } from '../RentalGroupController/utils/createRentalGroupWithSessionCookie'

type Response = { token: string }

export async function login(prevState: any, formData: FormData) {
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  })

  async function onSuccess(data: Response) {
    await createAuthToken(data.token)
    await createGroupWithSessionCookie()
  }

  return sendData({
    url: 'login',
    schema,
    body: formData,
    onSuccess,
    auth: false,
  })
}
