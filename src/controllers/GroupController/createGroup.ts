'use server'

import { ROUTE } from '@/routes'
import { sendData } from '@/utilities/actionRequest'
import { redirect } from 'next/navigation'
import { z } from 'zod'

export async function createGroup(prevState: any, formData: FormData) {
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  })

  type Response = { groupId: string }

  async function onSuccess(data: Response) {
    if (prevState !== null) {
      redirect(ROUTE.GROUPS.ID(data.groupId))
    }
  }

  return sendData({
    url: 'group-store',
    schema,
    body: formData,
    onSuccess,
    auth: false,
  })
}
