'use server'

import { API_ROUTE } from '@/constants/api-routes'
import { RentalGroup } from '@/models/RentalGroup'
import { sendData } from '@/utilities/actionRequest'
import { z } from 'zod'

const schema = z.object({
  name: z.string(),
})

type ArgsUpdateRentalGroup = { body: Partial<z.infer<typeof schema>>; id: RentalGroup['id'] }

export async function updateRentalGroup(args: ArgsUpdateRentalGroup) {
  const { id, body } = args

  return sendData({
    url: API_ROUTE.RENTAL_GROUP.UPDATE(id),
    schema,
    body,
    revalidateTagParams: [API_ROUTE.RENTAL_GROUP.SHOW(id)],
  })
}
