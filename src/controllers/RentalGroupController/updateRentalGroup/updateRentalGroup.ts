'use server'

import { API_ROUTE } from '@/constants/api-routes'
import { RentalGroup } from '@/models/RentalGroup'
import { sendData } from '@/utilities/actionRequest'
import { z } from 'zod'
import { schemaUpdateRentalGroup } from './schema'

type ArgsUpdateRentalGroup = {
  body: z.infer<typeof schemaUpdateRentalGroup>
  id: RentalGroup['id']
}

export async function updateRentalGroup(args: ArgsUpdateRentalGroup) {
  const { id, body } = args

  return sendData({
    url: API_ROUTE.RENTAL_GROUP.UPDATE(id),
    schema: schemaUpdateRentalGroup,
    body,
    revalidateTagParams: [API_ROUTE.RENTAL_GROUP.SHOW(id)],
    method: 'PUT',
  })
}
