'use server'

import { API_ROUTE } from '@/constants/api-routes'
import { z } from 'zod'
import { schemaRentalGroupRegister } from './updateRentalGroupRegister.schema'
import { sendData } from '@/utilities/request/sendData/sendData'
import { BillData } from '@/models/BillData'

type ArgsUpdateRentalGroupFn = z.infer<typeof schemaRentalGroupRegister> & Pick<BillData, 'id'>

export async function updateRentalGroupRegister(args: ArgsUpdateRentalGroupFn) {
  const { id, ...restArgs } = args

  return await sendData({
    url: API_ROUTE.RENTAL_GROUP_REGISTER.UPDATE({ id }),
    config: {
      body: restArgs,
      method: 'PUT',
    },
    options: {
      schema: schemaRentalGroupRegister,
      revalidateTagParams: API_ROUTE.PARTICIPANT.SHOW({ id }),
    },
  })
}
