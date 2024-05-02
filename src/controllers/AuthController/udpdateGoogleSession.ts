'use server'
import { createAuthToken } from '../AuthController/utils/createAuthToken'
import { createGroupWithSessionCookie } from '../RentalGroupController/utils/createRentalGroupWithSessionCookie'

export async function udpdateGoogleSession(token: string) {
  await createAuthToken(token)
  await createGroupWithSessionCookie()
}
