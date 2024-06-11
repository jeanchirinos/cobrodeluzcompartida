'use server'

import { API_ROUTE } from '@/constants/api-routes'
import { RentalGroup } from '@/models/RentalGroup'
import { sendData } from '@/utilities/actionRequest'
import { z } from 'zod'
import { schemaUpdateRentalGroup } from './updateRentalGroup.schema'

type ArgsUpdateRentalGroup = z.infer<typeof schemaUpdateRentalGroup> & {
  id: RentalGroup['id']
}

export async function updateRentalGroup(args: ArgsUpdateRentalGroup) {
  const { id, ...restArgs } = args

  return sendData({
    url: API_ROUTE.RENTAL_GROUP.UPDATE(id),
    schema: schemaUpdateRentalGroup,
    body: restArgs,
    revalidateTagParams: [API_ROUTE.RENTAL_GROUP.SHOW(id)],
    method: 'PUT',
  })
}
