'use server'
import { ROUTE } from '@/routes'
import { sendData } from '@/utilities/actionRequest'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function logout() {
  return sendData({
    url: 'logout',
    onSuccess() {
      cookies().delete('jwt')
      redirect(ROUTE.HOME)
    },
  })
}
