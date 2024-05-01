'use server'
import { createAuthToken } from '../AuthController/utils/createAuthToken'
// import { createGroupWithSessionCookie } from '../GroupController/utils/createGroupWithSessionCookie'

export async function udpdateGoogleSession(token: string) {
  // await createAuthToken(token)
  createAuthToken(token)

  // createGroupWithSessionCookie()
}
