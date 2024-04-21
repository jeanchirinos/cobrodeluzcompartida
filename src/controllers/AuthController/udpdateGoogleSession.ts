'use server'
import { createAuthToken } from '../AuthController/utils/createAuthToken'

export async function udpdateGoogleSession(token: string) {
  createAuthToken(token)
}
