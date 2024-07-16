'use server'
import { User } from '@/models/User'
import { createAuthToken } from '../AuthController/utils/createAuthToken'

export async function udpdateGoogleSession(args: Pick<User, 'token'>) {
  await createAuthToken({ token: args.token })
}
