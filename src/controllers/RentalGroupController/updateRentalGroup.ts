'use server'

import { API_ROUTE } from '@/constants/api-routes'
import { sendData } from '@/utilities/actionRequest'
import { z } from 'zod'

const schema = z.object({
  name: z.string(),
})

type Args = z.infer<typeof schema> & {
  id: string | number
}

export async function updateRentalGroup(args: Args) {
  const { id, ...formData } = args

  return sendData({
    url: API_ROUTE.RENTAL_GROUP.UPDATE(id),
    schema,
    body: formData,
    revalidateTagParams: [API_ROUTE.RENTAL_GROUP.SHOW(id)],
  })
}
