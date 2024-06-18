import { COOKIES_TOKEN_NAME } from '@/constants/cookies'
import { User } from '@/models/User'
import { cookies } from 'next/headers'

export async function createAuthToken(args: Pick<User, 'token'>) {
  const expires = new Date()
  expires.setDate(expires.getDate() + 7)

  cookies().set(COOKIES_TOKEN_NAME, args.token, { expires })
}
