'use server'

import { API_ROUTE } from '@/constants/api-routes'
import { RentalGroup } from '@/models/RentalGroup'
import { z } from 'zod'
import { schemaUpdateRentalGroup } from './updateRentalGroup.schema'
import { newSendData } from '@/utilities/request/sendData/sendData'

type ArgsUpdateRentalGroup = z.infer<typeof schemaUpdateRentalGroup> & Pick<RentalGroup, 'id'>

export async function updateRentalGroup(args: ArgsUpdateRentalGroup) {
  const { id, ...restArgs } = args

  return newSendData({
    url: API_ROUTE.RENTAL_GROUP.UPDATE({ id }),
    config: {
      body: restArgs,
      method: 'PUT',
    },
    options: {
      schema: schemaUpdateRentalGroup,
      revalidateTagParams: [API_ROUTE.RENTAL_GROUP.SHOW({ id })],
    },
  })
}
