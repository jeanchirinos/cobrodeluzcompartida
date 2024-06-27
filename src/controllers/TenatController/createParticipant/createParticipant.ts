'use server'

import { API_ROUTE } from '@/constants/api-routes'
import { z } from 'zod'
import { schemaCreateTenant } from './createParticipant.schema'
import { sendData } from '@/utilities/request/sendData/sendData'

type ArgsCreateRentalGroupFn = z.infer<typeof schemaCreateTenant>

export async function createParticipant(args: ArgsCreateRentalGroupFn) {
  return await sendData({
    url: API_ROUTE.TENANT.STORE,
    config: {
      body: args,
    },
    options: {
      schema: schemaCreateTenant,
      revalidateTagParams: [API_ROUTE.TENANT.INDEX({ lightMeterId: args.light_meter_id })],
    },
  })
}
