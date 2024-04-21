'use server'

import { getData } from '@/utilities/actionRequest'

export type SessionLogged = {
  auth: true
  image: string
  fullname: string
  email: string
}

export async function getSession() {
  const data = await getData<SessionLogged>('session', {
    auth: true,
    redirectIfUnauthorized: false,
    nullable: true,
  })

  return data
}
