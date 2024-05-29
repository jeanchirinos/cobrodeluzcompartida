'use server'

import { getData } from '@/utilities/actionRequest'

export type SessionLogged = {
  auth: true
  image_url: string
  fullname: string
  email: string
}

export async function getSession() {
  const data = await getData<SessionLogged>('session', {
    redirectIfUnauthorized: false,
    nullable: true,
  })

  return data
}
