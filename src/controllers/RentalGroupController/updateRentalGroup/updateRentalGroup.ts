'use server'

import { API_ROUTE } from '@/constants/api-routes'
import { RentalGroup } from '@/models/RentalGroup'
import { z } from 'zod'
import { schemaUpdateRentalGroup } from './updateRentalGroup.schema'
import { sendData } from '@/utilities/request/sendData/sendData'

type ArgsUpdateRentalGroupFn = z.infer<typeof schemaUpdateRentalGroup> & Pick<RentalGroup, 'id'>

export async function updateRentalGroup(args: ArgsUpdateRentalGroupFn) {
  const { id, ...restArgs } = args

  return await sendData({
    url: API_ROUTE.RENTAL_GROUP.UPDATE({ id }),
    config: {
      body: restArgs,
      method: 'PUT',
    },
    options: {
      schema: schemaUpdateRentalGroup,
      revalidateTagParams: '',
    },
  })
}
