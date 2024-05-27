'use server'

import { sendData } from '@/utilities/actionRequest'
import { z } from 'zod'
import { createAuthToken } from './utils/createAuthToken'
import { createGroupWithSessionCookie } from '../RentalGroupController/utils/createRentalGroupWithSessionCookie'
import { API_ROUTE } from '@/constants/api-routes'

type Response = { token: string }

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

type Args = z.infer<typeof schema>

// export async function login(args: Args) {
export async function login(prevState: any, formData: FormData) {
  async function onSuccess(data: Response) {
    await createAuthToken(data.token)
    await createGroupWithSessionCookie()
  }

  return sendData({
    url: API_ROUTE.AUTH.LOGIN,
    schema,
    body: formData,
    onSuccess,
    auth: false,
  })
}
