'use server'

import { API_ROUTE } from '@/constants/api-routes'
import { z } from 'zod'
import { schemaCreateRentalGroup } from './createRentalGroup.schema'
import { RentalGroup } from '@/models/RentalGroup'
import { sendData } from '@/utilities/request/sendData/sendData'
import { Tenant } from '@/models/Tenant'

type ArgsCreateRentalGroupFn = z.infer<typeof schemaCreateRentalGroup>

type ResponseCreateRentalGroup = {
  rental_group_id: RentalGroup['id']
  tenants_ids: Array<Tenant['id']>
}

export async function createRentalGroup(args?: ArgsCreateRentalGroupFn) {
  return await sendData<typeof schemaCreateRentalGroup, ResponseCreateRentalGroup>({
    url: API_ROUTE.RENTAL_GROUP.STORE,
    config: {
      body: args,
    },
    options: {
      schema: schemaCreateRentalGroup,
      revalidateTagParams: API_ROUTE.RENTAL_GROUP.INDEX,
    },
  })

  // const data: { ok: true; data: ResponseCreateRentalGroup; msg: string } = {
  //   ok: true,
  //   data: {
  //     rental_group_id: 1,
  //     tenant_ids: [1, 2],
  //   },
  //   msg: 'Rental group created',
  // }
}
